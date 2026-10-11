import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// Helper to ensure GEMINI_API_KEY and GEMINI_MODEL are detected from .env.local in dev
function ensureEnvLoaded() {
    if (!process.env.GEMINI_API_KEY) {
        const candidatePaths = [
            path.resolve(process.cwd(), '.env.local'),
            path.resolve(process.cwd(), 'natya-ai', '.env.local'),
            path.resolve('natya-ai', '.env.local'),
            path.resolve('.env.local')
        ];

        for (const p of candidatePaths) {
            try {
                if (fs.existsSync(p)) {
                    const content = fs.readFileSync(p, 'utf8');
                    for (const line of content.split('\n')) {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
                        const idx = trimmed.indexOf('=');
                        const key = trimmed.slice(0, idx).trim();
                        const val = trimmed.slice(idx + 1).trim();
                        if (key && val && !process.env[key]) {
                            process.env[key] = val;
                        }
                    }
                    if (process.env.GEMINI_API_KEY) break;
                }
            } catch (e) {
                // Ignore filesystem read errors in serverless environments
            }
        }
    }
}

// Vercel serverless function & local dev handler for /api/chat
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    console.log('[CHAT API] request received');
    ensureEnvLoaded();

    try {
        const { message, history } = req.body || {};

        if (!message) {
            console.warn('[CHAT API] message is missing in request body');
            return res.status(400).json({ error: 'Message is required' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const hasKey = !!apiKey && apiKey.trim().length > 0;
        console.log('[CHAT API] API key detected:', hasKey);

        if (!hasKey) {
            console.error('[CHAT API] GEMINI_API_KEY environment variable is not configured');
            return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
        }

        const primaryModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview";
        const candidateModels = [
            primaryModel,
            "gemini-3.1-flash-lite-preview",
            "gemini-2.5-flash",
            "gemini-2.5-pro"
        ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);
        const ai = new GoogleGenAI({ apiKey });

        const systemInstruction = `You are Natya, a warm and knowledgeable AI cultural guide for an Indian college exhibition about Natya Shastra, Indian classical dance, Navarasa, Mudras, and Abhinaya.

PERSONALITY:
- Warm, graceful, curious, educational, culturally respectful, conversational
- Answer directly and clearly — factual accuracy comes first, personality is secondary
- Suitable for a college exhibition audience

RESPONSE STYLE AND LENGTH:
- Default: 80–180 words maximum
- Simple factual questions: 30–80 words (e.g., "Which Rasa represents courage?")
- Educational questions: 100–180 words with short paragraphs or bullet lists
- Never write walls of text
- Use numbered or bullet lists when listing items (9 Rasas, Mudras, dance forms, etc.)

VARIETY — VERY IMPORTANT:
- NEVER begin every response with "Ah..." or "Ah, a wonderful question..." or "Namaste..." or "Of course..." or "That's a great question..."
- Vary your openings naturally. Sometimes start directly with the answer. Sometimes use a brief transition. Sometimes give an example first.
- Do NOT force a follow-up question at the end of every response — only do so occasionally and naturally
- Keep responses conversational but not formulaic

CORRECT EXAMPLE for "What are the 9 Rasas?":
"The nine Rasas are the emotional sentiments at the heart of Indian performance arts, described in Bharata Muni's Natya Shastra:
1. Shringara – Love / Beauty
2. Hasya – Laughter / Joy
3. Karuna – Compassion / Sorrow
4. Raudra – Fury / Anger
5. Veera – Heroism / Courage
6. Bhayanaka – Fear / Terror
7. Bibhatsa – Disgust / Aversion
8. Adbhuta – Wonder / Surprise
9. Shanta – Peace / Tranquility
Each Rasa evokes a distinct emotional experience in the audience."

CORRECT EXAMPLE for "Which Rasa represents courage?":
"Veera Rasa represents heroism, courage, and valor. It conveys bravery, confidence, and determination — often depicted through bold postures and decisive footwork in performance."

CONTENT EXPERTISE:
- Indian classical dance forms: Bharatanatyam, Kathak, Kathakali, Odissi, Kuchipudi, Manipuri, Mohiniyattam, Sattriya
- Indian folk dances: Bhangra, Garba, Lavani, Bihu, etc. (clearly distinguish from classical forms)
- Natya Shastra by Bharata Muni
- The 9 Rasas (Navarasa)
- Mudras (hand gestures) — Asamyuta and Samyuta
- Abhinaya — Angika, Vachika, Aharya, Sattvika
- Never pretend to be a human dancer or claim personal experiences`;

        // Format history for @google/genai chat
        const formattedHistory = (history || []).map(item => {
            const role = item.role === 'model' || item.role === 'assistant' ? 'model' : 'user';
            let text = '';
            if (typeof item.text === 'string') {
                text = item.text;
            } else if (item.parts && Array.isArray(item.parts)) {
                text = item.parts.map(p => p.text || '').join('');
            } else if (typeof item.content === 'string') {
                text = item.content;
            }
            return {
                role,
                parts: [{ text: text || '' }]
            };
        }).filter(item => item.parts[0].text.trim().length > 0);

        let responseText = '';

        for (const modelName of candidateModels) {
            try {
                console.log(`[CHAT API] Gemini request starting with model: ${modelName}`);
                const chat = ai.chats.create({
                    model: modelName,
                    config: {
                        systemInstruction,
                    },
                    history: formattedHistory,
                });

                const result = await chat.sendMessage({ message });
                responseText = result.text;
                console.log(`[CHAT API] Gemini response received from ${modelName} (${responseText.length} chars)`);
                break;
            } catch (modelErr) {
                console.warn(`[CHAT API] Model ${modelName} failed:`, modelErr.message || modelErr);
                if (modelName === candidateModels[candidateModels.length - 1]) {
                    throw modelErr;
                }
            }
        }

        return res.status(200).json({
            reply: responseText,
            text: responseText
        });
    } catch (error) {
        console.error("[CHAT API] Gemini API Error:", error.message || error);
        return res.status(500).json({ error: 'Failed to communicate with Natya AI.' });
    }
}
