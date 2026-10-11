import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import angikaImg from '../assets/cultural/abhinaya_angika.jpg';
import vachikaImg from '../assets/cultural/abhinaya_vachika.jpg';
import aharyaImg from '../assets/cultural/abhinaya_aharya.jpg';
import sattvikaImg from '../assets/cultural/abhinaya_sattvika.jpg';

export const AbhinayaSection = () => {

    const abhinayaTypes = [
        {
            title: "Angika",
            meaning: "Body & movement",
            desc: "Communication through physical movement, portraying gestures, walks, and stance.",
            image: angikaImg
        },
        {
            title: "Vachika",
            meaning: "Speech & sound",
            desc: "Expression through words, poetry, dialogue, and vocal cadence.",
            image: vachikaImg
        },
        {
            title: "Aharya",
            meaning: "Costume & appearance",
            desc: "Visual storytelling through meticulous attire, jewelry, and dramatic face paint.",
            image: aharyaImg
        },
        {
            title: "Sattvika",
            meaning: "Inner emotion",
            desc: "The deepest, involuntary physical manifestations of profound genuine emotion.",
            image: sattvikaImg
        }
    ];

    return (
        <section id="abhinaya" className="py-32 bg-[#FCF8F1] relative border-b border-[#E6D9CC]">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-center md:text-left">
                    <div>
                        <span className="eyebrow">Abhinaya</span>
                        <h2 className="heading-section">
                            Where movement<br />
                            becomes meaning.
                        </h2>
                    </div>
                    <div>
                        <a
                            href="https://www.youtube.com/watch?v=Gbaon1diwgA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-[#641F29] hover:text-[#8B2635] bg-white border border-[#E6D9CC] px-4 py-2.5 rounded-full transition-all hover:border-[#641F29]/30 hover:shadow-sm"
                            aria-label="Watch Abhinaya demonstration on YouTube"
                        >
                            <span>Watch Demonstration</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {abhinayaTypes.map((type, i) => (
                        <motion.div
                            key={type.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-[#FFFDF8] border border-[#E6D9CC] rounded-[16px] overflow-hidden group hover:-translate-y-1 hover:shadow-[0_8px_30px_#641F290A] hover:border-[#641F29]/20 transition-all duration-500 flex flex-col"
                        >
                            {/* Authentic Cultural Imagery */}
                            <div className="h-48 w-full overflow-hidden border-b border-[#E6D9CC]/50 bg-[#F5ECE0] relative">
                                <img
                                    src={type.image}
                                    alt={`Authentic portrayal of ${type.title} Abhinaya (${type.meaning})`}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            {/* Card Details */}
                            <div className="p-6 text-center flex-1 flex flex-col items-center">
                                <h3 className="text-[22px] font-serif text-[#641F29] font-medium mb-1">{type.title}</h3>
                                <h4 className="text-[11px] uppercase tracking-widest text-[#B88A44] font-semibold mb-3">{type.meaning}</h4>
                                <p className="text-[13px] text-[#806F68] font-sans leading-relaxed">{type.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

