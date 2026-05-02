import React from 'react';
import { 
  ShieldCheck, 
  Fingerprint, 
  Cpu, 
  Zap 
} from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  content: React.ReactNode;
  icon: React.ElementType;
  difficulty: 'Beginner' | 'Advanced';
  xp: number;
}

export const articles: Article[] = [
  {
    id: 'voting-rights',
    title: 'Constitutional Sovereignty',
    category: 'Foundation',
    readTime: '4 min',
    difficulty: 'Beginner',
    xp: 250,
    icon: ShieldCheck,
    content: (
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p className="text-lg font-medium text-text-primary">Your vote is the ultimate expression of constitutional power.</p>
        <div className="glass-panel p-6 border-primary/20 bg-primary/5">
          <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-2">Article 326</h4>
          <p className="text-sm italic">"The elections to the State Legislative Assembly shall be on the basis of adult suffrage..."</p>
        </div>
        <h3 className="text-xl font-bold text-text-primary mt-8">The Pillars of Your Rights</h3>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
            <span><strong className="text-text-primary">Universal Suffrage:</strong> Every citizen above 18 has one vote of equal value.</span>
          </li>
          <li className="flex gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
            <span><strong className="text-text-primary">Secrecy of Ballot:</strong> Your choice remains strictly confidential.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'voter-journey',
    title: 'Booth Day Protocol',
    category: 'Practical',
    readTime: '3 min',
    difficulty: 'Beginner',
    xp: 300,
    icon: Fingerprint,
    content: (
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p className="text-lg font-medium text-text-primary">A step-by-step walkthrough of what happens inside the polling station.</p>
        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:bg-white/5">
          {[
            { step: '01', title: 'Identity Check', desc: 'Polling Officer verifies your name in the electoral roll.' },
            { step: '02', title: 'The Indelible Ink', desc: 'Your finger is marked, signaling your participation.' },
            { step: '03', title: 'The Vote', desc: 'Enter the compartment and press the blue button on the Balloting Unit.' }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary z-10">
                {item.step}
              </div>
              <h4 className="text-text-primary font-bold uppercase tracking-tight mb-1">{item.title}</h4>
              <p className="text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'evm-integrity',
    title: 'Architecture of Integrity',
    category: 'Security',
    readTime: '6 min',
    difficulty: 'Advanced',
    xp: 500,
    icon: Cpu,
    content: (
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p className="text-lg font-medium text-text-primary">Ensuring every "beep" translates to a legitimate tally.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-4 border-white/5">
            <h4 className="text-secondary font-bold text-xs mb-2">Standalone Design</h4>
            <p className="text-[11px]">EVMs are NOT connected to any network. Non-hackable by design.</p>
          </div>
          <div className="glass-panel p-4 border-white/5">
            <h4 className="text-secondary font-bold text-xs mb-2">VVPAT Verification</h4>
            <p className="text-[11px]">The paper audit trail confirms your vote visually for 7 seconds.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'election-law',
    title: 'Model Code of Conduct',
    category: 'Legal',
    readTime: '5 min',
    difficulty: 'Advanced',
    xp: 450,
    icon: Zap,
    content: (
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p className="text-lg font-medium text-text-primary">Guidelines that govern political parties and candidates during elections.</p>
        <p>The Model Code of Conduct (MCC) comes into force the moment the election schedule is announced. It prevents the misuse of official machinery and ensures fair play.</p>
      </div>
    )
  }
];
