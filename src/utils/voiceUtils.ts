/**
 * Intelligent female voice selection for Natya's TTS.
 * Handles async voice loading in browsers that fire voiceschanged events.
 */

import { containsDevanagari } from './pronunciation';

const FEMALE_VOICE_KEYWORDS = [
    'female', 'woman', 'zira', 'aria', 'jenny', 'samantha',
    'google uk english female', 'google us english female',
    'hazel', 'susan', 'victoria', 'moira', 'veena', 'ava',
    'cortana', 'karen', 'kate', 'heather', 'fiona',
    'neerja', 'lekha', 'priya', 'swara', 'kalpana', 'geeta'
];

const PREFERRED_LANG_CODES = ['en-IN', 'en-GB', 'en-US', 'en-AU', 'en'];

function scoreVoice(voice: SpeechSynthesisVoice, isHindi: boolean): number {
    let score = 0;
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();

    // Female keyword match — high priority
    if (FEMALE_VOICE_KEYWORDS.some(kw => name.includes(kw))) score += 100;

    if (isHindi) {
        if (lang.startsWith('hi')) score += 150;
        if (lang === 'en-in') score += 50;
    } else {
        // Indian English bonus
        if (lang === 'en-in') score += 30;
        // British English
        if (lang === 'en-gb') score += 15;
        // US English
        if (lang === 'en-us') score += 10;
        // Any English
        if (lang.startsWith('en')) score += 5;
    }

    // Google voices quality bonus
    if (name.includes('google')) score += 8;
    // Microsoft voices quality bonus
    if (name.includes('microsoft')) score += 4;

    return score;
}

export function selectBestVoiceForText(text: string = ''): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    const isHindi = containsDevanagari(text);

    let candidates = voices;
    if (isHindi) {
        const hindiVoices = voices.filter(v => v.lang.toLowerCase().startsWith('hi'));
        if (hindiVoices.length > 0) candidates = hindiVoices;
    } else {
        const englishVoices = voices.filter(v =>
            PREFERRED_LANG_CODES.some(code => v.lang.toLowerCase().startsWith(code.toLowerCase()))
        );
        if (englishVoices.length > 0) candidates = englishVoices;
    }

    return candidates.reduce<SpeechSynthesisVoice | null>((best, v) => {
        if (!best) return v;
        return scoreVoice(v, isHindi) >= scoreVoice(best, isHindi) ? v : best;
    }, null);
}

export function selectBestFemaleVoice(): SpeechSynthesisVoice | null {
    return selectBestVoiceForText('');
}
