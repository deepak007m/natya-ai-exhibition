import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIChat } from './components/AIChat';
import { NatyaShastraSection } from './components/NatyaShastraSection';
import { DanceFormsSection } from './components/DanceFormsSection';
import { NavarasaSection } from './components/NavarasaSection';
import { MudraSection } from './components/MudraSection';
import { AbhinayaSection } from './components/AbhinayaSection';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import mudrasImg from './assets/cultural/mudras_learning.jpg';
import navarasaImg from './assets/cultural/navarasa_learning.jpg';
import danceImg from './assets/cultural/dance_learning.jpg';
import abhinayaImg from './assets/cultural/abhinaya_learning.jpg';

function App() {
  return (
    <div className="font-sans text-natya-text-dark bg-natya-bg selection:bg-natya-burgundy selection:text-white">

      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. AI Experience */}
      <AIChat />

      {/* 4. The Foundation */}
      <NatyaShastraSection />

      {/* 5. Classical & Folk Gallery */}
      <DanceFormsSection />

      {/* 6. Navarasa Expressions */}
      <NavarasaSection />

      {/* 7. Mudras Gestures */}
      <MudraSection />

      {/* 8. Abhinaya Composition */}
      <AbhinayaSection />

      {/* 9. Interactive Learning Section */}
      <section className="py-32 bg-[#F8F3EA] border-b border-[#E6D9CC]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-20 max-w-2xl">
            <span className="eyebrow">Interactive Learning</span>
            <h2 className="heading-section">
              Don't just read.<br />
              Experience it.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Mudras",
                subtitle: "Hand gestures & symbolic language",
                image: mudrasImg,
                anchor: "#mudras",
                videoUrl: "https://www.youtube.com/watch?v=__bOyh3NrKA"
              },
              {
                title: "Navarasa",
                subtitle: "Nine fundamental emotional essences",
                image: navarasaImg,
                anchor: "#navarasa",
                videoUrl: "https://www.youtube.com/watch?v=hY-uWNFMMJA"
              },
              {
                title: "Dance",
                subtitle: "Classical & regional movement styles",
                image: danceImg,
                anchor: "#dance-forms",
                videoUrl: "https://www.youtube.com/watch?v=v21vGnehunk"
              },
              {
                title: "Abhinaya",
                subtitle: "Dramatic expression and storytelling",
                image: abhinayaImg,
                anchor: "#abhinaya",
                videoUrl: "https://www.youtube.com/watch?v=Gbaon1diwgA"
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-[#FFFDF8] border border-[#E6D9CC] rounded-[16px] overflow-hidden group hover:-translate-y-1 hover:border-[#641F29]/30 hover:shadow-[0_12px_40px_#2B20200F] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="h-44 w-full overflow-hidden relative bg-[#F4EDE2]">
                  <img
                    src={item.image}
                    alt={`${item.title} illustration`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[20px] font-serif font-medium text-[#641F29] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[#806F68] font-sans leading-relaxed mb-6">{item.subtitle}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E6D9CC]/50 flex items-center justify-between">
                    <a
                      href={item.anchor}
                      className="text-[13px] font-medium text-[#641F29] hover:text-[#8B2635] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </a>
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-[#806F68] hover:text-[#641F29] inline-flex items-center gap-1 transition-colors"
                      aria-label={`Watch ${item.title} demonstration on YouTube`}
                    >
                      <span>Watch</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-32 bg-[#FCF8F1]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="heading-section text-center mb-6">
            Let ancient art<br />speak to you.
          </h2>
          <p className="text-[16px] text-[#806F68] mb-10 max-w-xl mx-auto">
            Ask Natya, explore Indian dance, and discover the stories behind every movement.
          </p>
          <a href="#ask-natya" className="btn-primary">
            Ask Natya
          </a>
        </div>
      </section>

      {/* 11. Minimal Footer */}
      <footer className="bg-[#FFFDF8] py-16 border-t border-[#E6D9CC]">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
          <div className="text-center md:text-left text-[#2B2020]">
            <span className="font-sans font-semibold tracking-[0.08em] text-[15px]">NATYA AI</span>
            <p className="text-[12px] text-[#806F68] mt-2 font-serif italic text-lg">Ancient wisdom. Interactive learning.</p>
            <p className="text-[10px] uppercase tracking-widest text-[#B88A44] mt-6 font-semibold">Built for the IKS / Indian Knowledge Systems exhibition.</p>
          </div>

          <div className="flex gap-8 text-[12px] font-medium text-[#641F29]">
            <a href="#natya-shastra" className="hover:text-[#B88A44] transition-colors">Explore</a>
            <a href="#navarasa" className="hover:text-[#B88A44] transition-colors">Navarasa</a>
            <a href="#mudras" className="hover:text-[#B88A44] transition-colors">Mudras</a>
            <a href="#ask-natya" className="hover:text-[#B88A44] transition-colors">Ask Natya</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
