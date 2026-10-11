import { motion } from 'framer-motion';
import { NatyaCharacter } from './NatyaCharacter';

export const Hero = () => {

    return (
        <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-natya-bg">
            <div className="w-full max-w-[1240px] mx-auto px-6 flex flex-col mt-8 lg:mt-0 lg:flex-row items-center gap-16 lg:gap-8">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 max-w-2xl text-center lg:text-left z-10"
                >
                    <span className="eyebrow">
                        AI-Powered Cultural Guide
                    </span>

                    <h1 className="heading-hero mb-8">
                        Discover the Art<br />
                        Behind the Expression.
                    </h1>

                    <p className="text-[15px] md:text-[17px] text-natya-text-muted leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                        Natya AI brings the wisdom of the Natya Shastra, Indian classical dance, expression, gesture and storytelling into one interactive cultural guide.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href="#ask-natya" className="btn-primary w-full sm:w-auto">
                            Ask Natya
                        </a>
                        <a href="#dance-forms" className="btn-secondary w-full sm:w-auto">
                            Explore Indian Dance
                        </a>
                    </div>
                </motion.div>

                {/* Right Content - Character Centerpiece */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="flex-1 relative w-full aspect-square max-w-[500px] lg:max-w-[600px] flex items-center justify-center bg-natya-cream rounded-[40px] border border-natya-border/50"
                >
                    {/* Subtle decorative cultural motif placeholder (e.g. tiny lotus or line art) in the corner */}
                    <div className="absolute top-8 right-8 opacity-20">
                        <div className="w-8 h-px bg-natya-burgundy"></div>
                        <div className="w-px h-8 bg-natya-burgundy absolute top-0 right-0"></div>
                    </div>
                    <div className="absolute bottom-8 left-8 opacity-20">
                        <div className="w-8 h-px bg-natya-burgundy absolute bottom-0 left-0"></div>
                        <div className="w-px h-8 bg-natya-burgundy absolute bottom-0 left-0"></div>
                    </div>

                    <div className="w-full max-w-[440px] flex items-center justify-center p-4">
                        <NatyaCharacter state="idle" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
