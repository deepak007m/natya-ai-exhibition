import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';
import characterImg from '../assets/natya-ai-character.png';

export type CharacterState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface NatyaCharacterProps {
    state?: CharacterState;
    className?: string;
}

const easeInOut: Transition = { ease: 'easeInOut' };

/**
 * Animated pulse ring around the character for listening/speaking states.
 */
const PulseRing = ({ delay = 0, color = '#8B2635', size = 60 }: { delay?: number; color?: string; size?: number }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, border: `1.5px solid ${color}` }}
        initial={{ scale: 0.9, opacity: 0.55 }}
        animate={{ scale: 2.4, opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, delay, ease: 'easeOut' }}
    />
);

export const NatyaCharacter = ({ state = 'idle', className = "" }: NatyaCharacterProps) => {

    // Character motion per state — using animate arrays (keyframes)
    const charAnimate =
        state === 'idle'
            ? { y: [0, -6, 0] }
            : state === 'listening'
                ? { y: [0, -4, 0], scale: [1, 1.025, 1] }
                : state === 'thinking'
                    ? { y: [0, -5, 0] }
                    : { y: [0, -3, 0], scale: [1, 1.015, 1] }; // speaking

    const charTransition: Transition =
        state === 'idle'
            ? { duration: 6, repeat: Infinity, ...easeInOut }
            : state === 'listening'
                ? { duration: 2.2, repeat: Infinity, ...easeInOut }
                : state === 'thinking'
                    ? { duration: 3.5, repeat: Infinity, ...easeInOut }
                    : { duration: 1.4, repeat: Infinity, ...easeInOut }; // speaking

    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            <div className="relative flex items-center justify-center">

                {/* Listening rings — burgundy */}
                <AnimatePresence>
                    {state === 'listening' && (
                        <motion.div
                            key="listening-rings"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <PulseRing delay={0} color="#8B2635" size={60} />
                            <PulseRing delay={0.6} color="#8B2635" size={60} />
                            <PulseRing delay={1.2} color="#641F29" size={60} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Speaking rings — soft gold */}
                <AnimatePresence>
                    {state === 'speaking' && (
                        <motion.div
                            key="speaking-rings"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <PulseRing delay={0} color="#B88A44" size={60} />
                            <PulseRing delay={0.75} color="#B88A44" size={60} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Thinking glow */}
                <AnimatePresence>
                    {state === 'thinking' && (
                        <motion.div
                            key="thinking-glow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.15, 0.45, 0.15] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, #641F2918 0%, transparent 70%)' }}
                        />
                    )}
                </AnimatePresence>

                {/* Character artwork */}
                <motion.div
                    animate={charAnimate}
                    transition={charTransition}
                    className="relative z-10 w-full flex items-center justify-center"
                >
                    <img
                        src={characterImg}
                        alt="Natya AI — Bharatanatyam dancer character"
                        className="w-full h-auto max-w-full object-contain pointer-events-none select-none"
                        draggable={false}
                    />
                </motion.div>
            </div>
        </div>
    );
};
