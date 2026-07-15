import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Info,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const tabLabels = {
  details: '仕様',
  care: 'お手入れ',
  reviews: 'お客さまの声',
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const product = products.find((item) => item.id === Number(id));
  const relatedProducts = products.filter((item) => item.id !== Number(id)).slice(0, 3);
  const [activeTab, setActiveTab] = useState('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [monogram, setMonogram] = useState('');
  const [showMonogramInput, setShowMonogramInput] = useState(false);

  if (!product) {
    return (
      <div className="not-found">
        <p>商品が見つかりませんでした。</p>
        <Link to="/collection" className="editorial-link">商品一覧へ <ArrowRight size={16} /></Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const changeImage = (direction) => {
    setCurrentImageIndex((current) => (current + direction + images.length) % images.length);
  };
  const addItem = () => addToCart(product, 1, monogram);
  const buyNow = () => {
    addToCart(product, 1, monogram);
    setIsCartOpen(true);
  };

  return (
    <div className="inner-page product-page">
      <div className="product-page__back">
        <Link to="/collection"><ArrowLeft size={16} /> 商品一覧へ戻る</Link>
      </div>

      <section className="product-main">
        <div className="product-gallery">
          <div className="product-gallery__stage">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${product.name} 商品画像 ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/images/ohmine/product-still.png';
                }}
              />
            </AnimatePresence>
            {monogram && currentImageIndex === 0 && (
              <span className="product-gallery__monogram">{monogram}</span>
            )}
            {images.length > 1 && (
              <div className="product-gallery__controls">
                <button type="button" onClick={() => changeImage(-1)} aria-label="前の画像">
                  <ChevronLeft size={20} />
                </button>
                <span>{String(currentImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                <button type="button" onClick={() => changeImage(1)} aria-label="次の画像">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="product-gallery__note">写真はイメージです。手仕事のため、柄の出方には個体差があります。</p>
        </div>

        <motion.div
          className="product-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <span className="product-info__category">{product.category} / ISHIGAKI CRAFT</span>
          <h1>{product.name}</h1>
          <p className="product-info__tagline">{product.tagline}</p>
          <p className="product-info__price">{product.priceStr}<small>税込・送料込</small></p>

          <div className="product-notice">
            <AlertCircle size={18} />
            <div>
              <h2>一点ずつ異なる、布の表情</h2>
              <p>大きな一枚布から切り出すため、お届けする品ごとに柄の位置や表情が異なります。</p>
            </div>
          </div>

          <p className="product-info__description">{product.description}</p>

          <div className="monogram-option">
            <button type="button" onClick={() => setShowMonogramInput((open) => !open)} aria-expanded={showMonogramInput}>
              <span><Edit3 size={16} /> 名入れ刻印</span>
              <span>{showMonogramInput ? '閉じる' : '無料で追加'}</span>
            </button>
            <AnimatePresence>
              {showMonogramInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="monogram-option__input"
                >
                  <label htmlFor="monogram">英字3文字まで</label>
                  <input
                    id="monogram"
                    type="text"
                    maxLength={3}
                    value={monogram}
                    onChange={(event) => setMonogram(event.target.value.toUpperCase())}
                    placeholder="K.T"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="product-tabs" role="tablist" aria-label="商品情報">
            {Object.entries(tabLabels).map(([value, label]) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === value}
                key={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? 'is-active' : ''}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="product-tab-panel">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.ul key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {product.details?.map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}
                </motion.ul>
              )}
              {activeTab === 'care' && (
                <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3><Info size={15} /> 長くお使いいただくために</h3>
                  <p>{product.care}</p>
                </motion.div>
              )}
              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {product.reviews?.length ? product.reviews.map((review) => (
                    <article key={`${review.user}-${review.text}`} className="product-review">
                      <div>{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}</div>
                      <strong>{review.user}</strong>
                      <p>{review.text}</p>
                    </article>
                  )) : <p>まだレビューはありません。</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="product-actions">
            <button type="button" className="product-actions__secondary" onClick={addItem}>
              <ShoppingBag size={18} /> カートに入れる
            </button>
            <button type="button" className="product-actions__primary" onClick={buyNow}>
              購入へ進む <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="related-products">
        <div className="section-heading">
          <div><span className="chapter-label chapter-label--ink">YOU MAY ALSO LIKE</span><h2>こちらもおすすめ</h2></div>
        </div>
        <div className="related-products__grid">
          {relatedProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/images/ohmine/product-still.png';
                }}
              />
              <div><h3>{item.name}</h3><p>{item.priceStr}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
