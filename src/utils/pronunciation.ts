/**
 * pronunciation.ts — Cultural Pronunciation Dictionary for Natya AI
 * 
 * Provides phonetic pronunciation approximations for Indian classical dance,
 * Natya Shastra, and Sanskrit terms when read by browser speech synthesis engines.
 * 
 * IMPORTANT:
 * This is applied ONLY to the hidden text passed to SpeechSynthesisUtterance.
 * It NEVER modifies the text displayed to the visitor on screen.
 */

interface PronunciationEntry {
    pattern: RegExp;
    replacement: string;
}

// Case-insensitive phonetic mapping for Indian classical dance terminology
const PRONUNCIATION_MAP: PronunciationEntry[] = [
    // Core treatises and concepts
    { pattern: /\bNatya\s+Shastra\b/gi, replacement: "Naat-yuh Shaas-tra" },
    { pattern: /\bNatyashastra\b/gi, replacement: "Naat-yuh Shaas-tra" },
    { pattern: /\bBharata\s+Muni\b/gi, replacement: "Bhuh-ruh-tuh Moo-nee" },
    { pattern: /\bNavarasa\b/gi, replacement: "Nuh-vuh-ruh-suh" },
    { pattern: /\bNavarasas\b/gi, replacement: "Nuh-vuh-ruh-suhs" },
    { pattern: /\bAbhinaya\b/gi, replacement: "Ubb-hee-nuh-yuh" },
    { pattern: /\bNritta\b/gi, replacement: "Nrit-tuh" },
    { pattern: /\bNritya\b/gi, replacement: "Nrit-yuh" },
    { pattern: /\bNatya\b/gi, replacement: "Naat-yuh" },
    { pattern: /\bMudra\b/gi, replacement: "Moo-draa" },
    { pattern: /\bMudras\b/gi, replacement: "Moo-draas" },
    { pattern: /\bHastha\b/gi, replacement: "Huss-thuh" },
    { pattern: /\bAsamyuta\b/gi, replacement: "Uh-sum-yoo-tuh" },
    { pattern: /\bSamyuta\b/gi, replacement: "Sum-yoo-tuh" },

    // The 9 Rasas
    { pattern: /\bShringara\b/gi, replacement: "Shring-aara" },
    { pattern: /\bHasya\b/gi, replacement: "Haa-syuh" },
    { pattern: /\bKaruna\b/gi, replacement: "Kuh-roo-naa" },
    { pattern: /\bRaudra\b/gi, replacement: "Row-druh" },
    { pattern: /\bVeera\b/gi, replacement: "Vee-ruh" },
    { pattern: /\bBhayanaka\b/gi, replacement: "Bhuh-yaa-nuh-kuh" },
    { pattern: /\bBibhatsa\b/gi, replacement: "Bee-bhut-suh" },
    { pattern: /\bAdbhuta\b/gi, replacement: "Udd-bhoo-tuh" },
    { pattern: /\bShanta\b/gi, replacement: "Shaan-tuh" },

    // 8 Classical Dance Forms
    { pattern: /\bBharatanatyam\b/gi, replacement: "Bhuh-ruh-tuh-naat-yum" },
    { pattern: /\bKathakali\b/gi, replacement: "Kuh-thuh-kuh-lee" },
    { pattern: /\bKuchipudi\b/gi, replacement: "Koo-chee-poo-dee" },
    { pattern: /\bMohiniyattam\b/gi, replacement: "Moh-hee-nee-yaat-tum" },
    { pattern: /\bSattriya\b/gi, replacement: "Sutt-ree-yuh" },
    { pattern: /\bOdissi\b/gi, replacement: "Oh-dee-see" },
    { pattern: /\bKathak\b/gi, replacement: "Kuh-thuck" },
    { pattern: /\bManipuri\b/gi, replacement: "Muh-nee-poo-ree" },

    // 4 Abhinaya Pillars
    { pattern: /\bAngika\b/gi, replacement: "Aan-gik-uh" },
    { pattern: /\bVachika\b/gi, replacement: "Vaa-chik-uh" },
    { pattern: /\bAharya\b/gi, replacement: "Aa-haar-yuh" },
    { pattern: /\bSattvika\b/gi, replacement: "Sutt-vik-uh" },

    // Folk Dance Forms
    { pattern: /\bBhangra\b/gi, replacement: "Bhaang-ra" },
    { pattern: /\bGarba\b/gi, replacement: "Gur-baa" },
    { pattern: /\bLavani\b/gi, replacement: "Laa-vuh-nee" },

    // Music & Dance terms
    { pattern: /\bAraimandi\b/gi, replacement: "Uh-rye-mun-dee" },
    { pattern: /\bTribhangi\b/gi, replacement: "Tri-bhung-gee" },
    { pattern: /\bTala\b/gi, replacement: "Taa-luh" },
    { pattern: /\bLaya\b/gi, replacement: "Luh-yuh" },
    { pattern: /\bRasa\b/gi, replacement: "Ruh-suh" },
    { pattern: /\bRasas\b/gi, replacement: "Ruh-suhs" },
    { pattern: /\bGhungroo\b/gi, replacement: "Ghoong-roo" },
    { pattern: /\bNamaste\b/gi, replacement: "Nuh-muh-stay" }
];

/**
 * Applies phonetic substitutions to text specifically for TTS pronunciation.
 * Does NOT alter the original text object or on-screen display.
 */
export function applyPronunciation(text: string): string {
    if (!text) return "";
    let processed = text;
    for (const { pattern, replacement } of PRONUNCIATION_MAP) {
        processed = processed.replace(pattern, replacement);
    }
    return processed;
}

/**
 * Checks if text contains Devanagari script characters.
 */
export function containsDevanagari(text: string): boolean {
    return /[\u0900-\u097F]/.test(text);
}
