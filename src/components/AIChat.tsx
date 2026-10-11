import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, Volume2 } from 'lucide-react';
import { NatyaCharacter } from './NatyaCharacter';
import type { CharacterState } from './NatyaCharacter';
import { MarkdownMessage } from './MarkdownMessage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { sendChatMessage } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatItem {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export const AIChat = () => {
    const [messages, setMessages] = useState<ChatItem[]>([
        { id: 'greeting', role: 'model', text: "Namaste. I'm Natya.\nWhat aspect of Indian classical performance would you like to discover today?" }
    ]);
    const [inputText, setInputText] = useState('');
    const [characterState, setCharacterState] = useState<CharacterState>('idle');
    const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
    const [errorStatus, setErrorStatus] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis();

    // Voice input handler — debounced auto-send after 1.2s of silence
    const handleVoiceInput = (text: string) => {
        setInputText(text);
        if (inputTimerRef.current) clearTimeout(inputTimerRef.current);
        inputTimerRef.current = setTimeout(() => {
            handleSend(text);
        }, 1200);
    };

    const { startListening, stopListening, isListening, supported: hasVoiceIn } = useSpeechRecognition(handleVoiceInput);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Reset active speaking id when speech ends
    useEffect(() => {
        if (!isSpeaking && activeSpeakingId) {
            setActiveSpeakingId(null);
        }
    }, [isSpeaking, activeSpeakingId]);

    // Character state driven by actual lifecycle
    useEffect(() => {
        if (isListening) {
            setCharacterState('listening');
        } else if (isSpeaking) {
            setCharacterState('speaking');
        } else if (characterState !== 'thinking') {
            setCharacterState('idle');
        }
    }, [isListening, isSpeaking]);

    const handleSend = async (messageText: string) => {
        const text = messageText.trim();
        if (!text) return;

        // Stop any ongoing voice/speech
        if (isListening) stopListening();
        if (isSpeaking) stopSpeaking();
        setActiveSpeakingId(null);
        if (inputTimerRef.current) clearTimeout(inputTimerRef.current);

        const userMsgId = `user-${Date.now()}`;
        setInputText('');
        setMessages(prev => [...prev, { id: userMsgId, role: 'user', text }]);
        setCharacterState('thinking');
        setErrorStatus('');

        try {
            // Pass conversation history (skip initial greeting)
            const historyPayload = messages.slice(1).map(m => ({
                role: m.role,
                text: m.text
            }));

            const reply = await sendChatMessage(text, historyPayload);
            const modelMsgId = `model-${Date.now()}`;
            setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: reply }]);

            // USER-CONTROLLED SPEECH: Never autoplay! Return character to idle.
            setCharacterState('idle');
        } catch (err: any) {
            console.error('Chat error:', err);
            setErrorStatus('Natya is temporarily unable to connect. Please try again.');
            setCharacterState('idle');
        }
    };

    const handleToggleListen = (id: string, text: string) => {
        if (activeSpeakingId === id && isSpeaking) {
            stopSpeaking();
            setActiveSpeakingId(null);
            setCharacterState('idle');
        } else {
            stopSpeaking();
            setActiveSpeakingId(id);
            setCharacterState('speaking');
            speak(text, () => {
                setActiveSpeakingId(null);
                setCharacterState('idle');
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(inputText);
        }
    };

    const handleMicToggle = () => {
        if (isListening || isSpeaking) {
            stopListening();
            stopSpeaking();
            setActiveSpeakingId(null);
            setCharacterState('idle');
        } else {
            startListening();
        }
    };

    const quickPrompts = [
        "What is Natya Shastra?",
        "Tell me about Bharatanatyam",
        "What are the 9 Rasas?",
        "What is Abhinaya?",
        "Teach me a Mudra"
    ];

    const isBusy = characterState === 'thinking';

    return (
        <section id="ask-natya" className="py-32 bg-[#FCF8F1] relative border-b border-[#E6D9CC]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-20 text-center">
                    <span className="eyebrow mx-auto">Meet Natya AI</span>
                    <h2 className="heading-section mb-6">Ask. Listen.<br />Discover.</h2>
                </div>

                {/* Immersive AI Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                    {/* Left: Character Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#FFFDF8] rounded-[24px] p-6 md:p-8 relative flex flex-col items-center justify-center min-h-[520px] border border-[#E6D9CC]"
                    >
                        <div className="w-full flex items-center justify-center pb-24">
                            <NatyaCharacter state={characterState} className="w-[280px] sm:w-[340px] md:w-[380px] mx-auto z-10" />
                        </div>

                        {/* Status Bar */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3">

                            {/* Mic / Stop button */}
                            <div className="relative flex items-center justify-center">
                                {hasVoiceIn && (
                                    <button
                                        onClick={handleMicToggle}
                                        disabled={isBusy}
                                        aria-label={isListening ? 'Stop listening' : isSpeaking ? 'Stop speaking' : 'Start speaking'}
                                        className={`relative w-16 h-16 shrink-0 rounded-full flex flex-col items-center justify-center transition-all shadow-[0_4px_15px_#641F291A]
                                        ${isListening || isSpeaking
                                                ? 'bg-[#8B2635] text-white hover:bg-[#641F29]'
                                                : 'bg-white border border-[#E6D9CC] text-[#641F29] hover:border-[#641F29]/30 hover:bg-[#F8F3EA]'}
                                        disabled:opacity-50 z-10`}
                                    >
                                        {isListening || isSpeaking ? <Square fill="currentColor" size={20} /> : <Mic size={24} />}
                                    </button>
                                )}
                            </div>

                            {/* State label */}
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#806F68]">
                                {characterState === 'idle' ? 'Talk to Natya'
                                    : characterState === 'listening' ? 'Listening...'
                                        : characterState === 'thinking' ? 'Natya is thinking...'
                                            : 'Natya is speaking...'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Elegant Chat Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col bg-[#FFFDF8] rounded-[24px] border border-[#E6D9CC] overflow-hidden h-[650px] shadow-[0_4px_20px_#2B202005]"
                    >
                        {/* Conversation Area */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6" role="log" aria-live="polite">
                            <AnimatePresence>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-end gap-3'}`}
                                    >
                                        {msg.role === 'model' && (
                                            <div className="w-6 h-6 rounded-full bg-[#FCF8F1] border border-[#E6D9CC] flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 bg-[#B88A44] rounded-full" />
                                            </div>
                                        )}

                                        <div className={`max-w-[82%] p-5 ${msg.role === 'user'
                                            ? 'bg-[#FCF8F1] text-[#2B2020] rounded-[20px] rounded-br-sm border border-[#E6D9CC]/50 text-[15px] leading-relaxed'
                                            : 'text-[#2B2020]'
                                            }`}>
                                            {msg.role === 'model' ? (
                                                <>
                                                    <MarkdownMessage text={msg.text} className="text-[#2B2020]" />
                                                    <div className="mt-3.5 pt-2.5 border-t border-[#E6D9CC]/40 flex items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleListen(msg.id, msg.text)}
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-sans font-medium transition-all duration-300 ${activeSpeakingId === msg.id && isSpeaking
                                                                    ? 'bg-[#641F29] text-white shadow-sm'
                                                                    : 'bg-[#FCF8F1] text-[#641F29] border border-[#E6D9CC] hover:bg-[#F8F3EA] hover:border-[#641F29]/30'
                                                                }`}
                                                            aria-label={activeSpeakingId === msg.id && isSpeaking ? "Stop speech" : "Listen to response"}
                                                        >
                                                            {activeSpeakingId === msg.id && isSpeaking ? (
                                                                <>
                                                                    <Square size={11} fill="currentColor" />
                                                                    <span>Stop</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Volume2 size={13} />
                                                                    <span>Listen</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <p>{msg.text}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Thinking dots */}
                                {characterState === 'thinking' && (
                                    <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#FCF8F1] border border-[#E6D9CC] flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 bg-[#B88A44] rounded-full" />
                                        </div>
                                        <div className="text-[#806F68] px-4 py-3 flex gap-1.5 items-center">
                                            {[0, 0.2, 0.4].map(d => (
                                                <span
                                                    key={d}
                                                    className="w-1.5 h-1.5 rounded-full bg-[#B88A44] animate-bounce"
                                                    style={{ animationDelay: `${d}s` }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-[#FCF8F1] border-t border-[#E6D9CC]">

                            {/* Quick Suggestion Chips — visible until conversation starts */}
                            {messages.length < 3 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {quickPrompts.map(prompt => (
                                        <button
                                            key={prompt}
                                            onClick={() => handleSend(prompt)}
                                            disabled={isBusy}
                                            className="text-[12px] font-medium bg-white hover:bg-[#641F29] border border-[#E6D9CC] text-[#806F68] hover:text-white hover:border-[#641F29] px-4 py-2 rounded-full transition-colors whitespace-nowrap disabled:opacity-40"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your question..."
                                    disabled={isListening || isBusy}
                                    className="flex-1 bg-white border border-[#E6D9CC] focus:border-[#641F29] rounded-[20px] px-6 py-4 text-[15px] text-[#2B2020] placeholder-[#806F68]/70 outline-none transition-colors disabled:opacity-50 shadow-[inset_0_2px_4px_#2B202005]"
                                />

                                <button
                                    onClick={() => handleSend(inputText)}
                                    disabled={!inputText.trim() || isBusy}
                                    className="w-12 h-12 shrink-0 bg-[#641F29] hover:bg-[#8B2635] text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:bg-[#E6D9CC] shadow-md"
                                    aria-label="Send message"
                                >
                                    <Send size={18} className="ml-0.5" />
                                </button>
                            </div>

                            {errorStatus && (
                                <p className="text-[#8B2635] text-xs text-center mt-3 font-medium">{errorStatus}</p>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
