import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-indigo-900 mb-6">
          Oh!! Mine
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          沖縄の伝統と、デニムの革新。<br/>
          二つの青が織りなす、あなただけの物語。
        </p>
      </motion.div>

      {/* Story Section 1: The Concept */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000" 
            alt="Denim texture" 
            className="rounded-lg shadow-xl w-full h-[400px] object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-serif text-indigo-800 mb-4">
            「青」へのこだわり
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            沖縄の空と海を象徴する「琉球藍」と、世界に誇る日本の「岡山デニム」。
            Oh!! Mineは、この二つの異なる「青」を融合させることから始まりました。
          </p>
          <p className="text-gray-600 leading-relaxed">
            使い込むほどに表情を変えるデニムのエイジングは、まるで人生のよう。
            あなたの日常に寄り添い、あなただけの色に育ってほしい。そんな願いを込めています。
          </p>
        </motion.div>
      </div>

      {/* Story Section 2: Craftsmanship */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24 md:flex-row-reverse">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:order-2"
        >
          <img 
            src="https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&q=80&w=1000" 
            alt="Craftsmanship" 
            className="rounded-lg shadow-xl w-full h-[400px] object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:order-1"
        >
          <h2 className="text-2xl font-serif text-indigo-800 mb-4">
            手仕事のぬくもり
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            私たちの製品はすべて、沖縄の工房で職人が一つひとつ手作業で仕立てています。
            ミンサー織りの繊細な柄合わせや、頑丈なステッチワーク。
          </p>
          <p className="text-gray-600 leading-relaxed">
            大量生産では出せない「味」と「温もり」を大切に。
            手に取った瞬間、作り手の想いが伝わるようなものづくりを目指しています。
          </p>
        </motion.div>
      </div>

      {/* Value Proposition */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-50 rounded-2xl p-8 md:p-12 text-center"
      >
        <h3 className="text-2xl font-serif text-indigo-900 mb-6">
          いつ（五）の世（四）までも
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          ミンサー織りの特徴である五つと四つの市松模様には、「いつの世までも末長く幸せに」という想いが込められています。<br/><br/>
          Oh!! Mineのアイテムが、あなたと、あなたの大切な人の毎日に、<br/>
          末永く寄り添う存在でありますように。
        </p>
      </motion.div>
    </div>
  );
};

export default About;
