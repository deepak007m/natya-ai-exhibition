import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Explore', href: '#natya-shastra' },
        { name: 'Navarasa', href: '#navarasa' },
        { name: 'Mudras', href: '#mudras' },
        { name: 'Ask Natya', href: '#ask-natya' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-natya-cream/95 backdrop-blur-sm border-b border-natya-border py-4 shadow-sm'
                    : 'bg-transparent py-6 border-b border-transparent'
                    }`}
            >
                <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex flex-col cursor-pointer">
                        <span className="font-sans font-semibold tracking-[0.08em] text-[15px] text-natya-text-dark">
                            NATYA AI
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-natya-text-muted mt-0.5 font-medium">
                            AI • Indian Classical Arts
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-[13px] font-medium tracking-wide text-natya-text-dark hover:text-natya-burgundy transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <a
                            href="#ask-natya"
                            className="text-[13px] font-medium tracking-wide text-natya-burgundy hover:text-natya-accent transition-colors"
                        >
                            Start Experience
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-natya-text-dark p-2"
                        >
                            <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest">
                                {isOpen ? 'Close' : 'Menu'}
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[72px] bg-natya-cream border-b border-natya-border z-40 md:hidden overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <motion.a
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-serif text-3xl text-natya-burgundy border-b border-natya-border/50 pb-4"
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <a
                                href="#ask-natya"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 font-sans font-medium text-natya-cream bg-natya-burgundy py-4 rounded-full text-center uppercase tracking-widest text-xs"
                            >
                                Start Experience
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
