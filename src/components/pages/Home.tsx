import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MapPin, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '../atoms/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

export const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-8">
              Election 2024 • Tamil Nadu
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-text-primary mb-6 leading-[1.1]">
              Shape Your <span className="text-primary shadow-neon-saffron">Sovereignty</span> <br/>
              through Knowledge.
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed">
              Navigate the democratic landscape of Tamil Nadu with high-precision tools. 
              Track constituencies live, locate your booth, and master the voting process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              {user ? (
                <Link to="/dashboard">
                  <button className="btn-primary-sovereign w-full sm:w-auto px-12">
                    GO TO DASHBOARD
                  </button>
                </Link>
              ) : (
                <button 
                  onClick={() => signInWithGoogle()}
                  className="btn-primary-sovereign w-full sm:w-auto px-12"
                >
                  GET STARTED
                </button>
              )}
              <Link to="/learn">
                <button className="btn-secondary-sovereign w-full sm:w-auto px-12 border-white/10 hover:border-white/30 text-white">
                  EXPLORE ACADEMY
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full animate-pulse-slow"></div>
            <div className="glass-panel-high p-4 relative overflow-hidden group">
              <img 
                src="/images/sovereign_hero.png" 
                alt="Sovereign Hero" 
                className="w-full h-auto rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Constituency Tracker */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-panel p-8 group hover:border-primary/30 transition-all duration-500"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Live Constituency Tracker</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-neon-teal"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">LIVE</span>
              </div>
            </div>
            <div className="aspect-video bg-surface-high rounded-lg overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/da/Tamil_Nadu_districts_map.svg')] bg-center bg-no-repeat bg-contain filter invert brightness-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="btn-secondary-sovereign bg-background/60 backdrop-blur-md border-white/20 text-white">
                  EXPLORE LIVE MAP
                </button>
              </div>
            </div>
          </motion.div>

          {/* Side Panels */}
          <div className="space-y-8">
            {/* Timeline Snippet */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 hover:border-primary/30 transition-all group"
            >
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Election Timeline</h3>
              <p className="text-sm text-text-muted mb-6">Track key phases, nomination deadlines, and result days.</p>
              <Link to="/timeline" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
                VIEW SCHEDULE <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Academy Snippet */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 hover:border-secondary/30 transition-all group"
            >
              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 w-fit mb-4">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Voter Academy</h3>
              <p className="text-sm text-text-muted mb-6">Master the voting process through interactive modules.</p>
              <Link to="/learn" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-white transition-colors">
                BROWSE MODULES <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Constituencies', value: '234', color: 'text-primary' },
            { label: 'Registered Voters', value: '6.2M', color: 'text-secondary' },
            { label: 'Polling Booths', value: '68k', color: 'text-primary' },
            { label: 'Voter Security', value: '100%', color: 'text-secondary' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="stat-card"
            >
              <h4 className={`text-4xl font-black tracking-tighter mb-1 ${stat.color}`}>
                {stat.value}
              </h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
