import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { rasas } from '../data/rasas';

export const NavarasaSection = () => {
    return (
        <section id="navarasa" className="py-32 bg-natya-cream relative border-b border-natya-border/50">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-2xl">
                        <span className="eyebrow">Navarasa</span>
                        <h2 className="heading-section">
                            Nine emotions.<br />
                            One language of expression.
                        </h2>
                    </div>
                    <div>
                        <a
                            href="https://www.youtube.com/watch?v=hY-uWNFMMJA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-[#641F29] hover:text-[#8B2635] bg-white border border-[#E6D9CC] px-4 py-2.5 rounded-full transition-all hover:border-[#641F29]/30 hover:shadow-sm"
                            aria-label="Watch Navarasa demonstration on YouTube"
                        >
                            <span>Watch Demonstration</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rasas.map((rasa, i) => (
                        <motion.div
                            key={rasa.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover="hover"
                            className="bg-white border border-[#E6D9CC] rounded-[16px] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_#2B20200D] hover:border-[#641F29]/20 hover:-translate-y-1 relative group flex flex-col"
                        >
                            {/* Authentic facial expression image */}
                            <div className="h-[240px] w-full overflow-hidden border-b border-[#E6D9CC]/40 bg-[#F4EDE2] relative">
                                <img
                                    src={rasa.image}
                                    alt={`Classical dancer expressing ${rasa.name} (${rasa.meaning})`}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Card Content */}
                            <div className="p-8 flex-1 flex flex-col bg-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-[20px] font-serif text-[#641F29] font-medium">{rasa.name}</h3>
                                    <span className="text-[10px] uppercase tracking-widest text-[#B88A44] font-semibold">
                                        {rasa.meaning}
                                    </span>
                                </div>

                                <p className="text-[14px] text-[#806F68] font-sans leading-relaxed mt-2">
                                    {rasa.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
