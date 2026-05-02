import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  CheckCircle, 
  ChevronRight,
  Star,
  Lock
} from 'lucide-react';
import { cn } from '../atoms/Button';
import { useProgress } from '../../contexts/ProgressContext';
import { articles, type Article } from '../../data/learning_content';



export const LearningHub: React.FC = () => {
  const { progress, markModuleCompleted } = useProgress();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const activeLevel = useMemo(() => {
    if (!progress) return 0;
    // Find the first article index that is NOT completed
    const firstIncomplete = articles.findIndex(a => !progress.completedModules.includes(a.id));
    return firstIncomplete === -1 ? articles.length : firstIncomplete;
  }, [progress]);

  const handleCompleteArticle = (id: string) => {
    markModuleCompleted(id);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Header */}
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4 block">Voter Readiness Program</span>
                <h1 className="text-6xl font-black tracking-tighter text-text-primary uppercase mb-6">Learning Journey</h1>
                <div className="flex justify-center items-center gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-primary">{activeLevel}/{articles.length}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Modules</span>
                  </div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-secondary">
                      {progress?.completedModules.reduce((acc, id) => acc + (articles.find(a => a.id === id)?.xp || 0), 0) || 0}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Total XP</span>
                  </div>
                </div>
              </div>

              {/* Journey Path */}
              <div className="relative space-y-32">
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-surface-high -translate-x-1/2 opacity-20"></div>

                {articles.map((article, idx) => {
                  const isCompleted = progress?.completedModules.includes(article.id);
                  const isLocked = idx > activeLevel;
                  const isActive = idx === activeLevel;

                  return (
                    <div key={article.id} className={cn(
                      "relative flex items-center justify-center",
                      idx % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    )}>
                      {/* Node Circle */}
                      <div className="absolute left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                          animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 90, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className={cn(
                            "w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                            isCompleted ? "bg-secondary border-secondary shadow-neon-teal" : 
                            isActive ? "bg-primary border-primary shadow-neon-saffron" : 
                            "bg-background border-surface-high"
                          )}
                        >
                          {isCompleted ? <CheckCircle className="w-6 h-6 text-background" /> :
                           isLocked ? <Lock className="w-4 h-4 text-text-muted" /> :
                           <Star className="w-6 h-6 text-background fill-background" />}
                        </motion.div>
                      </div>

                      {/* Card */}
                      <motion.div
                        whileHover={!isLocked ? { scale: 1.05 } : {}}
                        onClick={() => !isLocked && setSelectedArticle(article)}
                        className={cn(
                          "w-full md:w-[42%] glass-panel p-8 border-white/5 transition-all duration-500 cursor-pointer relative group",
                          isLocked ? "opacity-40 grayscale pointer-events-none" : "opacity-100 grayscale-0",
                          isActive ? "border-primary shadow-neon-saffron/20 ring-1 ring-primary/30" : ""
                        )}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 rounded-lg bg-surface-high border border-white/5 text-primary group-hover:shadow-neon-saffron transition-all">
                            <article.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">+{article.xp} XP</span>
                        </div>
                        
                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 block">
                          Module 0{idx + 1} • {article.category}
                        </span>
                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{article.readTime} Read</span>
                          <div className="flex items-center text-[10px] font-black text-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                            {isCompleted ? "REVIEW" : "START"} <ChevronRight className="w-4 h-4 ml-1" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="article"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="flex items-center text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-primary transition-colors mb-12"
              >
                ← Return to Journey
              </button>

              <div className="glass-panel-high p-8 md:p-16 border-white/5 relative">
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 border border-primary/20 rounded">
                      {selectedArticle.category}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{selectedArticle.readTime}</span>
                  </div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-8">{selectedArticle.title}</h2>
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content}
                </div>

                <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-secondary shadow-neon-teal" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase">Mastery Challenge</h4>
                      <p className="text-[10px] text-text-muted uppercase">Complete to unlock next phase</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCompleteArticle(selectedArticle.id)}
                    className="btn-primary-sovereign py-4 px-12 text-xs uppercase w-full md:w-auto"
                  >
                    Complete & Unlock Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
