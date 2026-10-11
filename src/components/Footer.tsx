export const Footer = () => {
    return (
        <footer className="bg-[#050A1A] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

                    {/* Brand Col */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-natya-ivory mb-4">
                            NATYA <span className="text-natya-gold">AI</span>
                        </h2>
                        <p className="text-gray-400 max-w-sm mb-6 text-sm">
                            "Ancient Wisdom. Interactive Learning."
                            <br /><br />
                            An AI-assisted educational exploration of Indian classical dance and Natya Shastra.
                        </p>
                    </div>

                    {/* Quick Links Col */}
                    <div className="md:text-right">
                        <h3 className="text-lg font-serif text-natya-gold mb-4">Explore</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#ask-natya" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Ask Natya</a>
                            </li>
                            <li>
                                <a href="#navarasa" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Navarasa</a>
                            </li>
                            <li>
                                <a href="#mudras" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Mudras</a>
                            </li>
                            <li>
                                <a href="#abhinaya" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Abhinaya</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Natya AI. Created as an educational college exhibition project.</p>
                    <p className="mt-4 md:mt-0 font-medium text-natya-gold/70 tracking-widest uppercase">Scan. Ask. Discover.</p>
                </div>
            </div>
        </footer>
    );
};
