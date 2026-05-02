import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, MapPin, X } from 'lucide-react';
import { TN_TIMELINE } from '../../data/tn_mock_data';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../atoms/Button';

export const Timeline: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-background min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-black tracking-tighter text-text-primary mb-4 uppercase">
            Election Schedule 2024
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm font-medium leading-relaxed">
            Track the progress of the Tamil Nadu General Assembly Elections. Navigate through critical phases from notification to the final counting of votes.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-surface-high"></div>

          <div className="space-y-24">
            {TN_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const isActive = item.status === 'active';
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-4 border-background transition-all duration-500",
                      item.status === 'completed' ? "bg-primary shadow-neon-saffron" : 
                      isActive ? "bg-primary scale-150 shadow-[0_0_20px_rgba(255,193,7,0.8)] animate-pulse" :
                      "bg-surface-higher"
                    )}></div>
                  </div>

                  {/* Left Side (Dates for Even, Content for Odd) */}
                  <div className={cn(
                    "flex items-center",
                    isEven ? "md:justify-end text-right order-1" : "md:order-2 order-2"
                  )}>
                    {isEven ? (
                      <div className="hidden md:block">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          {item.date.toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <div className="glass-panel p-8 w-full border-white/5 hover:border-primary/20 transition-all group">
                        <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors uppercase tracking-tight">
                          {language === 'en' ? item.title_en : item.title_ta}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {language === 'en' ? item.description_en : item.description_ta}
                        </p>
                        {isActive && (
                          <div className="mt-6">
                            <div className="h-1 w-full bg-surface-high rounded-full overflow-hidden">
                              <div className="h-full bg-secondary w-3/4 shadow-neon-teal"></div>
                            </div>
                            <span className="text-[10px] font-bold text-secondary mt-2 inline-block">75% VOTER TURNOUT RECORDED</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Side (Content for Even, Dates for Odd) */}
                  <div className={cn(
                    "flex items-center",
                    isEven ? "md:order-2 order-2" : "md:justify-start text-left md:order-1 order-1"
                  )}>
                    {isEven ? (
                      <div className="glass-panel p-8 w-full border-white/5 hover:border-primary/20 transition-all group">
                        {isActive && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon-saffron"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">LIVE STATUS: ACTIVE</span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors uppercase tracking-tight">
                          {language === 'en' ? item.title_en : item.title_ta}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {language === 'en' ? item.description_en : item.description_ta}
                        </p>
                      </div>
                    ) : (
                      <div className="hidden md:block">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          {item.date.toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Voter Guidelines Section */}
        <section className="mt-48">
          <div className="flex items-center gap-4 mb-12">
            <CheckCircle2 className="w-6 h-6 text-primary shadow-neon-saffron" />
            <h2 className="text-3xl font-black uppercase tracking-tight">Voter Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Identification', desc: 'Carry your Voter ID (EPIC) or any of the 12 approved photo ID documents like Aadhaar or PAN card.', accent: 'border-l-secondary shadow-neon-teal' },
              { icon: MapPin, title: 'Booth Finder', desc: 'Use the "Booth Map" section to locate your assigned polling station and check real-time queue status.', accent: 'border-l-primary shadow-neon-saffron' },
              { icon: X, title: 'Prohibited Items', desc: 'Mobile phones, cameras, and electronic gadgets are strictly prohibited inside the polling booth area.', accent: 'border-l-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]' }
            ].map((guide, idx) => (
              <div key={idx} className={cn(
                "glass-panel p-8 border-l-4 transition-all hover:scale-105",
                guide.accent
              )}>
                <guide.icon className="w-8 h-8 mb-6 opacity-80" />
                <h4 className="text-sm font-black uppercase tracking-widest mb-4">{guide.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{guide.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
