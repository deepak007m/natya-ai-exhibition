import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { mudras } from '../data/mudras';

export const MudraSection = () => {
    return (
        <section id="mudras" className="py-32 bg-[#F6F0E4] relative border-b border-natya-border/50">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-[#2B2020]">
                    <div className="max-w-2xl">
                        <span className="eyebrow text-[#8B2635]">Mudras</span>
                        <h2 className="heading-section">
                            Speak without words.
                        </h2>
                    </div>
                    <div>
                        <a
                            href="https://www.youtube.com/watch?v=__bOyh3NrKA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-[#641F29] hover:text-[#8B2635] bg-white border border-[#E6D9CC] px-4 py-2.5 rounded-full transition-all hover:border-[#641F29]/30 hover:shadow-sm"
                            aria-label="Watch Mudras masterclass on YouTube"
                        >
                            <span>Watch Masterclass</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mudras.map((mudra, i) => (
                        <motion.div
                            key={mudra.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover="hover"
                            className="bg-[#FCF8F1] border border-[#E6D9CC] rounded-[12px] shadow-[0_2px_10px_#2B202005] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_25px_#2B20200D] hover:-translate-y-1 hover:border-[#641F29]/20 flex flex-col"
                        >
                            {/* Authentic hand gesture photograph */}
                            <div className="h-48 w-full overflow-hidden border-b border-[#E6D9CC]/50 bg-[#F5ECE0] relative flex items-center justify-center">
                                <img
                                    src={mudra.image}
                                    alt={`Authentic ${mudra.name} mudra hand gesture (${mudra.meaning})`}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Mudra Details */}
                            <div className="p-6 text-center bg-[#FCF8F1] flex-1 flex flex-col items-center justify-center">
                                <h3 className="text-[17px] font-serif text-[#641F29] font-semibold mb-1">{mudra.name}</h3>
                                <div className="text-[#8B2635] text-[10px] font-bold uppercase tracking-widest mb-3">
                                    {mudra.meaning}
                                </div>
                                <p className="text-[13px] font-sans text-[#806F68] leading-relaxed">
                                    {mudra.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
