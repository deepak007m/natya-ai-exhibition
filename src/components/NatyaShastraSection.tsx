import { motion } from 'framer-motion';

export const NatyaShastraSection = () => {

    const fundamentals = [
        { num: '01', title: 'Rasa', desc: 'The emotional flavor experienced by the audience.' },
        { num: '02', title: 'Bhava', desc: 'The psychological states of the actors that create Rasa.' },
        { num: '03', title: 'Abhinaya', desc: 'The medium through which the actor communicates.' },
        { num: '04', title: 'Nritta', desc: 'Pure dance without specific narrative meaning.' },
        { num: '05', title: 'Nritya', desc: 'Expressional dance carrying storytelling.' },
        { num: '06', title: 'Natya', desc: 'The dramatic core combining dance and theatre.' },
    ];

    return (
        <section id="natya-shastra" className="py-24 bg-natya-cream text-natya-text-dark relative border-b border-natya-border/50">
            <div className="max-w-[1240px] mx-auto px-6">

                <div className="mb-20 max-w-2xl">
                    <span className="eyebrow">The Foundation</span>
                    <h2 className="heading-section mb-6">
                        The ancient science<br />
                        of performance.
                    </h2>
                    <p className="text-[15px] md:text-[17px] text-natya-text-muted leading-relaxed font-sans max-w-lg">
                        Attributed to the sage Bharata Muni, the Natya Shastra is an ancient Indian treatise on the performing arts, dictating that true art must evoke Rasa—profound emotional response—in the audience.
                    </p>
                </div>

                {/* Clean Editorial Horizontal List Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {fundamentals.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-4 border-b border-natya-border pb-4">
                                <span className="font-sans text-[11px] font-bold text-natya-burgundy/50 tracking-widest uppercase">
                                    {item.num}
                                </span>
                                <h3 className="font-serif text-[22px] text-natya-burgundy font-medium group-hover:text-natya-accent transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-[14px] leading-relaxed text-natya-text-muted font-sans">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
