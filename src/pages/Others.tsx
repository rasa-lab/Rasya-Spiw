import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Quote, 
  Shield, 
  HelpCircle, 
  Mail, 
  Globe, 
  Cookie,
  ExternalLink,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Zap
} from 'lucide-react';

const Others: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'info' | 'contact'>('quotes');

  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "Stay hungry, stay foolish.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Don't count the days, make the days count.",
    "Believe you can and you're halfway there.",
    "It always seems impossible until it's done.",
    "Your time is limited, so don't waste it living someone else's life.",
    "The best way to predict the future is to create it.",
    "Do what you can, with what you have, where you are.",
    "Everything you've ever wanted is on the other side of fear.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Dream big and dare to fail.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Act as if what you do makes a difference. It does.",
    "Never bend your head. Always hold it high. Look the world straight in the eye.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "You are never too old to set another goal or to dream a new dream.",
    "Try to be a rainbow in someone else's cloud.",
    "You do not find the happy life. You make it.",
    "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
    "Sometimes you will never know the value of a moment, until it becomes a memory.",
    "The most wasted of all days is one without laughter.",
    "You must be the change you wish to see in the world.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "The only thing we have to fear is fear itself.",
    "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    "It is during our darkest moments that we must focus to see the light.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "Be yourself; everyone else is already taken.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Life is what happens when you're busy making other plans.",
    "Get busy living or get busy dying.",
    "You only live once, but if you do it right, once is enough.",
    "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    "If you want to live a happy life, tie it to a goal, not to people or things.",
    "Never let the fear of striking out keep you from playing the game.",
    "Money and success don't change people; they only amplify what is already there.",
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma.",
    "Not how long, but how well you have lived is the main thing.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
    "In order to write about life first you must live it.",
    "The big lesson in life, baby, is never be scared of anyone or anything.",
    "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.",
    "Life is not a problem to be solved, but a reality to be experienced.",
    "The unexamined life is not worth living.",
    "Turn your wounds into wisdom.",
    "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    "Do all the good you can, for all the people you can, in all the ways you can, as long as you ever can.",
    "Don't settle for what life gives you; make life better and build something.",
    "Everything negative - pressure, challenges - is all an opportunity for me to rise.",
    "I like criticism. It makes you strong.",
    "You never really learn much from hearing yourself speak.",
    "Life imposes things on you that you can't control, but you still have the choice of how you're going to live through this.",
    "Life is never easy. There is work to be done and obligations to be met - obligations to truth, to justice, and to liberty.",
    "Live for each day as if it were your last.",
    "Life is 10% what happens to you and 90% how you react to it.",
    "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.",
    "Life is a long lesson in humility.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "Life is made of ever so many partings welded together.",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    "Life is short, and it is here to be lived.",
    "The longer I live, the more beautiful life becomes.",
    "Every moment is a fresh beginning.",
    "When you cease to dream you cease to live.",
    "If you spend your whole life waiting for the storm, you'll never enjoy the sunshine.",
    "Don't cry because it's over, smile because it happened.",
    "If you can do what you do best and be happy, you're further along in life than most people.",
    "We should remember that just as a positive outlook on life can promote good health, so can everyday acts of kindness.",
    "Don't limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you.",
    "It is our choices that show what we truly are, far more than our abilities.",
    "If you don't like the road you're walking, start paving another one.",
    "The most important thing is to enjoy your life - to be happy - it's all that matters.",
    "Life is a succession of lessons which must be lived to be understood.",
    "You will face many defeats in life, but never let yourself be defeated.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, so don't waste it living someone else's life.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "When you reach the end of your rope, tie a knot in it and hang on.",
    "Always remember that you are absolutely unique. Just like everyone else.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    "It is during our darkest moments that we must focus to see the light.",
    "Whoever is happy will make others happy too.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-zinc-900 rounded-2xl">
        {['quotes', 'info', 'contact'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeTab === tab ? 'bg-emerald-500 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Quote className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Inspiration</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {quotes.map((q, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-3xl italic text-sm text-zinc-300 relative overflow-hidden group"
              >
                <Quote className="absolute -top-2 -left-2 w-12 h-12 text-white/5 group-hover:text-emerald-500/10 transition-colors" />
                "{q}"
              </motion.div>
            ))}
            <div className="text-center py-4">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Showing 10 of 300+ Quotes</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-6">
          <section className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-widest">FYP Tricks</h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { platform: 'TikTok', trick: 'Use trending audio + 3-second hook.' },
                { platform: 'Instagram', trick: 'Post Reels with high contrast visuals.' },
                { platform: 'YouTube', trick: 'Custom thumbnails with emotional faces.' },
                { platform: 'Twitter/X', trick: 'Threads with controversial opening lines.' },
              ].map((t, i) => (
                <div key={i} className="p-3 bg-zinc-950/50 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase block mb-1">{t.platform}</span>
                  <p className="text-xs text-zinc-400">{t.trick}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Shield className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Privacy Policy</h2>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Your data is stored locally in your browser. We do not collect or sell your personal information. 
              API keys are used only to connect to the respective services.
            </p>
          </section>

          <section className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Cookie className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-widest">Cookie Policy</h2>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We use local storage to save your preferences and notes. No third-party tracking cookies are used.
            </p>
          </section>

          <section className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-orange-400">
              <HelpCircle className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-widest">FAQ</h2>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-zinc-300">How to use AI?</h4>
                <p className="text-[10px] text-zinc-500">Go to Settings and enter your OpenRouter API Key.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-zinc-300">Is it free?</h4>
                <p className="text-[10px] text-zinc-500">The system is free, but some APIs may require their own keys.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl text-center space-y-4">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center">
              <UserSearch className="w-12 h-12 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">Rasya</h2>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Lead Developer</p>
            </div>
            <div className="flex justify-center gap-4">
              <button className="p-3 glass rounded-2xl text-zinc-400 hover:text-emerald-400 transition-colors"><Instagram className="w-5 h-5" /></button>
              <button className="p-3 glass rounded-2xl text-zinc-400 hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></button>
              <button className="p-3 glass rounded-2xl text-zinc-400 hover:text-red-400 transition-colors"><Youtube className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Quick Links</h3>
            <a href="#" className="flex items-center justify-between p-4 glass rounded-2xl group">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">Email Support</span>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 glass rounded-2xl group">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">WhatsApp Contact</span>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const UserSearch = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

export default Others;
