import { useState, useEffect, useCallback, useRef } from 'react';
import { cleanMarkdownForTTS } from '../utils/textUtils';
import { selectBestVoiceForText, selectBestFemaleVoice } from '../utils/voiceUtils';
import { applyPronunciation } from '../utils/pronunciation';

export const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(true);
    const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
    const onEndRef = useRef<(() => void) | undefined>(undefined);

    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setSupported(false);
            return;
        }

        // Voices load asynchronously in many browsers
        const loadVoice = () => {
            const voice = selectBestFemaleVoice();
            if (voice) voiceRef.current = voice;
        };

        loadVoice();
        window.speechSynthesis.addEventListener('voiceschanged', loadVoice);
        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoice);
        };
    }, []);

    const speak = useCallback((text: string, onEnd?: () => void) => {
        if (!supported) return;

        // Stop any currently active speech
        window.speechSynthesis.cancel();
        setIsSpeaking(false);

        // 1. Clean Markdown artifacts
        const cleaned = cleanMarkdownForTTS(text);
        if (!cleaned) return;

        // 2. Apply cultural pronunciation dictionary (phonetic substitutions for Sanskrit terms)
        const phoneticallyPronounced = applyPronunciation(cleaned);

        const utterance = new SpeechSynthesisUtterance(phoneticallyPronounced);

        // 3. Language & script-aware voice selection
        const voice = selectBestVoiceForText(text) || voiceRef.current || selectBestFemaleVoice();
        if (voice) utterance.voice = voice;

        utterance.rate = 0.93;  // Slightly measured tempo for clear exhibition presentation
        utterance.pitch = 1.04; // Natural warm pitch
        utterance.volume = 1;

        onEndRef.current = onEnd;

        utterance.onstart = () => setIsSpeaking(true);

        utterance.onend = () => {
            setIsSpeaking(false);
            onEndRef.current?.();
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
            onEndRef.current?.();
        };

        window.speechSynthesis.speak(utterance);
    }, [supported]);

    const stop = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [supported]);

    return { isSpeaking, supported, speak, stop };
};
