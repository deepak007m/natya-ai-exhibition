import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { danceForms } from '../data/danceForms';

export const DanceFormsSection = () => {

    const classicalForms = danceForms.filter(d => d.category === 'Classical');
    const folkForms = danceForms.filter(d => d.category === 'Folk');

    const renderGallery = (forms: typeof danceForms) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forms.map((form, i) => (
                <motion.div
                    key={form.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                    className="group relative bg-[#FFFDF8] rounded-[16px] overflow-hidden border border-[#E6D9CC] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_#2B20200F] hover:border-[#641F29]/30 flex flex-col"
                >
                    {/* Authentic Cultural Image */}
                    <div className="h-[280px] w-full overflow-hidden border-b border-[#E6D9CC]/50 relative bg-[#F4EDE2]">
                        <img
                            src={form.image}
                            alt={`${form.name} classical performance`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Block */}
                    <div className="p-8 flex-1 flex flex-col justify-between relative z-10 bg-white">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-[22px] font-serif text-[#641F29] font-medium leading-tight">{form.name}</h3>
                            </div>
                            <span className="text-[11px] uppercase tracking-widest text-[#B88A44] font-semibold block mb-4">
                                {form.region}
                            </span>

                            <p className="text-[14px] text-[#806F68] leading-relaxed font-sans mb-6">
                                {form.description}
                            </p>
                        </div>

                        {/* Verified YouTube Performance Link */}
                        <div className="pt-4 border-t border-[#E6D9CC]/40 flex items-center justify-between">
                            <a
                                href={form.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[13px] font-sans font-medium text-[#641F29] hover:text-[#8B2635] group/link transition-colors"
                                aria-label={`Watch ${form.name} performance on YouTube`}
                            >
                                <span>Watch Performance</span>
                                <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <section id="dance-forms" className="py-32 bg-[#F8F3EA]">
            <div className="max-w-[1240px] mx-auto px-6">

                {/* Classical Traditions */}
                <div className="mb-32">
                    <div className="mb-16">
                        <span className="eyebrow">Indian Classical Dance</span>
                        <h2 className="heading-section">
                            Eight traditions.<br />
                            Centuries of expression.
                        </h2>
                    </div>
                    {renderGallery(classicalForms)}
                </div>

                {/* Folk Traditions */}
                <div>
                    <div className="mb-16 pt-32 border-t border-[#E6D9CC]">
                        <span className="eyebrow">Folk & Regional Traditions</span>
                        <h2 className="heading-section">
                            India dances<br />
                            in many voices.
                        </h2>
                    </div>
                    {renderGallery(folkForms)}
                </div>

            </div>
        </section>
    );
};
