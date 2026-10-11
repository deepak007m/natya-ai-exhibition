import { useState, useEffect, useCallback, useRef } from 'react';

export const useSpeechRecognition = (onResult: (text: string) => void) => {
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [supported, setSupported] = useState(true);
    const [recognition, setRecognition] = useState<any>(null);
    const onResultRef = useRef(onResult);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setSupported(false);
            return;
        }

        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        rec.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onResultRef.current(transcript);
        };

        rec.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setError('Microphone access denied. Please allow microphone permissions.');
            } else {
                setError(`Speech recognition encountered an error: ${event.error}`);
            }
        };

        rec.onend = () => {
            setIsListening(false);
        };

        setRecognition(rec);
    }, []);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
            } catch (err) {
                // If already started, it throws
                console.error(err);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return { isListening, error, supported, startListening, stopListening };
};
