import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Shield, Truck, CreditCard, ShoppingBag, Star, Info, Edit3, AlertCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 3);

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For slider
  
  // Monogram State
  const [monogram, setMonogram] = useState('');
  const [showMonogramInput, setShowMonogramInput] = useState(false);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  // Use images array if available, otherwise fallback to single image
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, 1, monogram);
  };

  const handleCheckout = async () => {
    addToCart(product, 1, monogram);
    setIsCartOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-[#fcfbf9]">
      
      {/* Mobile Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-leather-dark mb-8 transition-colors text-sm font-medium">
        <ArrowLeft size={18} /> Back to Collection
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
        
        {/* Product Image Slider */}
        <div className="relative -mx-4 md:mx-0 select-none">
           <div className="relative aspect-square md:rounded-[3rem] overflow-hidden shadow-sm md:shadow-xl bg-gray-100">
             <AnimatePresence mode="wait">
               <motion.img 
                 key={currentImageIndex}
                 src={images[currentImageIndex]} 
                 alt={product.name}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 className="w-full h-full object-cover absolute inset-0"
                 // Simple drag for mobile swipe
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 dragElastic={0.2}
                 onDragEnd={(e, { offset, velocity }) => {
                   const swipe = offset.x;
                   if (swipe < -50) nextImage();
                   else if (swipe > 50) prevImage();
                 }}
               />
             </AnimatePresence>

             {/* Monogram Overlay (Only on first image) */}
             {monogram && currentImageIndex === 0 && (
               <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-none z-10">
                  <span className="text-3xl md:text-4xl font-serif font-bold tracking-widest text-gold-foil opacity-90 drop-shadow-md" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {monogram}
                  </span>
               </div>
             )}

             {/* Slider Controls */}
             {images.length > 1 && (
               <>
                 <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-20">
                   <ChevronLeft size={20} />
                 </button>
                 <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-20">
                   <ChevronRight size={20} />
                 </button>
                 {/* Dots */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                   {images.map((_, idx) => (
                     <div 
                       key={idx} 
                       className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-leather w-4' : 'bg-white/50'}`} 
                     />
                   ))}
                 </div>
               </>
             )}
           </div>
           
           <p className="text-center text-[10px] text-gray-400 mt-2 px-4">
             ※写真はイメージです。手作りのため個体差があります。
           </p>
        </div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-2 md:px-0"
        >
          <span className="text-leather font-bold tracking-widest uppercase text-xs bg-leather/10 px-2 py-1 rounded-sm">New Arrival</span>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-leather-dark mt-4 mb-2 leading-tight">{product.name}</h1>
          
          {product.tagline && (
             <p className="text-base text-gray-500 mb-6 font-light tracking-wide">{product.tagline}</p>
          )}
          
          <div className="flex items-baseline gap-2 mb-8">
            <p className="text-2xl md:text-3xl text-leather-dark font-medium">{product.priceStr}</p>
            <span className="text-xs text-gray-400 font-normal">(税込・送料込)</span>
          </div>

          {/* One-of-a-kind Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="text-leather flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-leather-dark mb-1">世界にひとつだけの柄</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                この商品は、大きな一枚布から切り出して製作しているため、
                お届けする商品によって<span className="font-bold border-b border-leather/30">柄の出方や位置が異なります。</span>
                あなただけの「一期一会」のデザインをお楽しみください。
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-8 font-light">
            {product.description}
          </p>

          {/* Monogram Option */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowMonogramInput(!showMonogramInput)}>
               <div className="flex items-center gap-2 text-leather-dark font-bold text-sm">
                 <Edit3 size={16} />
                 <span>名入れ刻印 (無料)</span>
               </div>
               <span className="text-xs text-leather underline decoration-dotted">
                 {showMonogramInput ? '閉じる' : '追加する'}
               </span>
            </div>
            
            <AnimatePresence>
              {showMonogramInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs text-gray-500 mb-2">イニシャルを入力 (3文字まで):</label>
                  <input 
                    type="text" 
                    maxLength={3}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="例: K.T"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-lg font-serif tracking-widest focus:outline-none focus:border-leather transition-colors text-center"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 text-center">
                    ゴールドの箔押し加工を施します。
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
            {['details', 'care', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === tab ? 'text-leather-dark' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'details' && 'スペック'}
                {tab === 'care' && 'お手入れ'}
                {tab === 'reviews' && 'レビュー'}
                {activeTab === tab && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-leather-dark" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 mb-8 min-h-[150px]">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.ul 
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {product.details && product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="mt-0.5 min-w-[16px]"><Check size={14} className="text-leather" /></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {activeTab === 'care' && (
                <motion.div
                  key="care"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  <div className="flex gap-2 mb-2 text-leather items-center">
                    <Info size={16} />
                    <span className="font-bold">永くお使いいただくために</span>
                  </div>
                  {product.care}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                           <div className="flex text-yellow-400">
                             {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                           </div>
                           <span className="text-xs font-bold text-gray-400">{review.user}</span>
                        </div>
                        <p className="text-xs text-gray-600">"{review.text}"</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">まだレビューはありません。</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Buttons (Hidden on Mobile) */}
          <div className="hidden md:flex gap-4">
             <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white border-2 border-leather-dark text-leather-dark py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              カートに入れる
            </button>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="flex-[2] bg-leather-dark text-white py-4 rounded-full font-bold text-lg hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-leather/20"
            >
              <CreditCard size={20} />
              すぐに購入する
            </button>
          </div>

        </motion.div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:hidden z-40 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-pb">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-white border border-leather-dark text-leather-dark py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1 active:bg-gray-50"
        >
          <ShoppingBag size={18} />
          カート
        </button>
        <button 
          onClick={handleCheckout}
          className="flex-[2] bg-leather-dark text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-leather/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          すぐに購入
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Related Products Section */}
      <div className="border-t border-gray-200 pt-16 mb-20 md:mb-0">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-leather-dark mb-6 px-2">こちらもおすすめ</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-2">
           {relatedProducts.map(p => (
             <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-serif font-bold text-sm text-gray-900 group-hover:text-leather line-clamp-1">{p.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{p.priceStr}</p>
             </Link>
           ))}
        </div>
      </div>

    </div>
  );
}
