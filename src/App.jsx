import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Github, Instagram } from 'lucide-react';
// 분리한 Work 컴포넌트를 불러옵니다.
import Work from './components/Work'; 

const PortfolioApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 스크롤 감지 로직
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 네비게이션 클릭 시 해당 섹션으로 부드럽게 이동
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-[70] transition-all duration-500 px-8 py-6 flex justify-between items-center ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent'}`}>
        <div 
          className="text-xl font-bold tracking-tighter cursor-pointer z-[100]" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          KEEP INSIGHT
        </div>

        {/* 상단 메뉴: 스크롤 전 & 메뉴 닫힘 상태일 때만 표시 */}
        {!isScrolled && !isMenuOpen && (
          <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em]">
            <button onClick={() => scrollTo('work')} className="hover:text-gray-400 transition">WORK</button>
            <button onClick={() => scrollTo('about')} className="hover:text-gray-400 transition">ABOUT</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-gray-400 transition">CONTACT</button>
          </div>
        )}

        {/* 햄버거/닫기 버튼 */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 relative z-[100] hover:bg-gray-100 rounded-full transition"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* --- Side Menu Overlay (오른쪽 1/3 너비) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white z-[60] shadow-2xl flex flex-col justify-center px-12 gap-8 text-3xl font-light italic"
            >
              <motion.button whileHover={{ x: 10 }} onClick={() => scrollTo('work')} className="text-left hover:text-gray-400 transition border-b border-gray-50 pb-4">Work</motion.button>
              <motion.button whileHover={{ x: 10 }} onClick={() => scrollTo('about')} className="text-left hover:text-gray-400 transition border-b border-gray-100 pb-4">About</motion.button>
              <motion.button whileHover={{ x: 10 }} onClick={() => scrollTo('contact')} className="text-left hover:text-gray-400 transition border-b border-gray-100 pb-4">Contact</motion.button>
              <div className="mt-12 text-xs font-mono text-gray-400 not-italic uppercase tracking-widest">Keep Insight Portfolio 2026</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-24">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-sm tracking-[0.4em] text-gray-400 mb-6">CREATIVE PORTFOLIO</motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 100 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }} 
          className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter"
        >
          Keep <br /> <span className="text-gray-300 italic font-light">Your</span> Insight.
        </motion.h1>
      </section>

      {/* --- Work Section (분리된 컴포넌트) --- */}
      <Work />

      {/* --- About Section --- */}
      <section id="about" className="px-8 py-40 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold tracking-[0.5em] text-gray-600 mb-16 uppercase">About Me</h2>
          <p className="text-3xl md:text-6xl leading-[1.1] font-light tracking-tight">
            가장 미니멀하고 트렌디하게 <br />
            <span className="text-gray-500 italic">저만의 색깔</span>로 담아냅니다. <br />
            리액트로 조금 더 나은 디자인을<br /> 만들어 나가고 싶습니다.
          </p>
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 text-left">
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">[ Skills ]</p>
              <p className="font-light text-lg">React, Vite, Node.js, Tailwind CSS</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">[ Focus ]</p>
              <p className="font-light text-lg">User Experience, Minimal UI, Performance</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">[ Location ]</p>
              <p className="font-light text-lg">Based in Seoul, South Korea</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="px-8 py-40 flex flex-col items-center justify-center text-center">
        <h2 className="text-xs font-bold tracking-[0.5em] text-gray-400 mb-12 uppercase">Contact</h2>
        <a href="mailto:hello@keepinsight.com" className="text-5xl md:text-8xl font-bold tracking-tighter hover:text-gray-400 transition-all duration-500">
          LET'S TALK
        </a>
        <div className="flex gap-10 mt-20">
          <motion.div whileHover={{ y: -5 }} className="cursor-pointer hover:text-black transition text-gray-400"><Mail size={24} /></motion.div>
          <motion.div whileHover={{ y: -5 }} className="cursor-pointer hover:text-black transition text-gray-400"><Github size={24} /></motion.div>
          <motion.div whileHover={{ y: -5 }} className="cursor-pointer hover:text-black transition text-gray-400"><Instagram size={24} /></motion.div>
        </div>
        <footer className="mt-40 pt-10 border-t border-gray-100 w-full text-[10px] tracking-[0.3em] text-gray-300 uppercase">
          © 2026 KEEP INSIGHT. ALL RIGHTS RESERVED.
        </footer>
      </section>
    </div>
  );
};

export default PortfolioApp;