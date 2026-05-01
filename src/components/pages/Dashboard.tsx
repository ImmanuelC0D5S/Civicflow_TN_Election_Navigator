import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileCheck, MapPin, Download, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '../atoms/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useProgress } from '../../contexts/ProgressContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { progress } = useProgress();

  const readinessScore = progress ? Math.round(
    ((progress.completedModules.length / 5) * 60) + // Modules are 60%
    (progress.registered ? 40 : 0) // Registration is 40%
  ) : 0;

  return (
    <div className="bg-background min-h-screen pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tighter text-text-primary uppercase mb-4"
          >
            Good morning, {user?.displayName?.split(' ')[0] || 'Citizen'}
          </motion.h1>
          <p className="text-text-secondary text-lg font-medium">
            Your civic profile is currently <span className="text-secondary">{readinessScore}% complete</span>. Secure your voice for the upcoming term.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Stats */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 flex flex-col items-center text-center border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-5 h-5 text-secondary shadow-neon-teal" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-8">Voter Readiness</span>
              <div className="relative w-32 h-32 mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-surface-high" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" cx="50" cy="50" 
                  />
                  <circle 
                    className="text-secondary shadow-neon-teal" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 * (1 - readinessScore / 100)}
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" cx="50" cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black">{readinessScore}%</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-text-muted leading-relaxed uppercase tracking-widest">
                Identity verified across all TN districts.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 border-white/5"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Engagement Score</span>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="text-4xl font-black text-primary">1,240</h3>
                <span className="text-[10px] font-bold text-secondary tracking-widest">+12% THIS WEEK</span>
              </div>
              <div className="h-1.5 w-full bg-surface-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 shadow-neon-saffron"></div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column: Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Recent Activity</h2>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 border-primary/20 bg-primary/5 relative group cursor-pointer"
            >
              <div className="flex gap-8 items-start">
                <div className="p-4 rounded-lg bg-surface-high border border-primary/20 text-primary">
                  <Award className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Master Informant</h3>
                    <span className="px-3 py-1 bg-primary text-background text-[10px] font-black uppercase tracking-widest rounded-sm">Amber Badge</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    You successfully verified 5 local booth locations in the Kanyakumari district.
                  </p>
                  <div className="flex items-center gap-2 text-secondary">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">EARNED 500 CREDITS</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {[
                { icon: FileCheck, title: 'Application Submitted', desc: 'Update of residence address is under review by the ERO.', time: '2H AGO' },
                { icon: Award, title: 'Mock Poll Participation', desc: 'Successfully completed the digital literacy mock poll for 2024.', time: 'YESTERDAY' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="glass-panel p-6 border-white/5 flex gap-6 items-center"
                >
                  <div className="p-3 rounded-lg bg-surface-high border border-white/5 text-text-muted">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="text-[10px] text-text-muted font-medium">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{item.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Deadlines & Actions */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 border-red-500/20 bg-red-500/5"
            >
              <div className="flex items-center gap-2 mb-8">
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Upcoming Deadlines</span>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight mb-1">EPIC Linkage</h4>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Ends in 3 days • Oct 15</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight mb-1 text-text-muted">Voter List Revision</h4>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Ends in 24 days • Nov 05</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted block">Quick Actions</span>
              <button className="btn-primary-sovereign w-full py-4 uppercase text-xs">
                <FileCheck className="w-4 h-4 mr-3" /> Apply for ID
              </button>
              <button className="btn-secondary-sovereign w-full py-4 uppercase text-xs border-white/10 hover:border-white/30 text-white">
                <Download className="w-4 h-4 mr-3" /> Download E-EPIC
              </button>
            </div>

            <div className="glass-panel p-4 border-white/5 relative overflow-hidden group cursor-pointer aspect-video flex flex-col justify-end">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/da/Tamil_Nadu_districts_map.svg')] bg-center bg-no-repeat bg-cover filter invert opacity-20 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10 flex justify-center">
                <button className="bg-background/80 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-background transition-all">
                  My Booth Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
