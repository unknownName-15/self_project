// src/components/Work.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { projects } from '../data/projects'; // 데이터 불러오기

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="work" className="px-8 py-32 border-t border-gray-100">
        <div className="flex justify-between items-end mb-20">
          <div className="space-y-2">
            <h2 className="text-xs font-bold tracking-[0.5em] text-gray-400 uppercase">Selected Works</h2>
            <p className="text-sm text-gray-300 font-light">제가 직접 참여한 프로젝트들입니다.</p>
          </div>
          <span className="text-xs font-mono text-gray-300">Total — 0{projects.length}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-20">
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              whileInView={{ opacity: 1, y: 0 }} 
              initial={{ opacity: 0, y: 30 }} 
              viewport={{ once: true }} 
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-6 relative">
                <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <ArrowRight className="text-white bg-black/80 p-3 rounded-full" size={48} />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-gray-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[11px] text-gray-400 font-light uppercase tracking-[0.2em]">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Detail Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-8 right-8 p-4 bg-black text-white rounded-full z-[110] hover:rotate-90 transition duration-300"
            >
              <X size={24} />
            </button>

            <div className="max-w-6xl mx-auto px-8 py-32">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
                <p className="text-sm tracking-[0.3em] text-gray-400 mb-4 uppercase">Project 0{selectedProject.id}</p>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">{selectedProject.title}</h2>
                
                <div className="aspect-video bg-gray-100 mb-20">
                  <img src={selectedProject.mainImage} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="md:col-span-2 space-y-8">
                    <h3 className="text-2xl font-semibold">Overview</h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-light">{selectedProject.details}</p>
                  </div>
                  <div className="space-y-8 border-l border-gray-100 pl-8">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role</p>
                      <p className="text-sm">{selectedProject.role}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Duration</p>
                      <p className="text-sm">{selectedProject.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-20">
                   {selectedProject.subImages.map((img, idx) => (
                     <div key={idx} className="aspect-square bg-gray-50 overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Work;