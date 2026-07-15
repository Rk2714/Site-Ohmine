import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const categories = [
  { value: 'All', label: 'すべて' },
  { value: 'Bag', label: 'バッグ' },
  { value: 'Wallet', label: '財布・小物' },
  { value: 'Case', label: 'ケース' },
  { value: 'Accessory', label: '装身具' },
];

export default function Collection() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    const result = filter === 'All'
      ? [...products]
      : products.filter((product) => product.category === filter);

    if (sort === 'price-asc') return result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return result.sort((a, b) => b.price - a.price);
    return result.sort((a, b) => b.id - a.id);
  }, [filter, sort]);

  return (
    <div className="inner-page collection-page">
      <motion.section
        className="collection-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65 }}
      >
        <div className="collection-hero__copy">
          <span className="chapter-label">01 / ISLAND CRAFT</span>
          <h1>島の布を、<br />日々の道具へ。</h1>
          <p>
            ミンサーの祈り、紅型の色、使うほどに馴染む藍。
            石垣島の暮らしから生まれた手ざわりを、毎日の道具に仕立てます。
          </p>
          <Link to="/about" className="editorial-link editorial-link--light">
            工房について <ArrowRight size={16} />
          </Link>
        </div>
        <div className="collection-hero__image">
          <img src="/images/ohmine/minsa-products-indigo.png" alt="藍色の布小物を並べた工房の卓上" />
          <span>ISHIGAKI / OKINAWA</span>
        </div>
      </motion.section>

      <section className="catalog" aria-labelledby="catalog-heading">
        <div className="catalog__heading">
          <div>
            <span className="chapter-label chapter-label--ink">ONLINE STORE</span>
            <h2 id="catalog-heading">手仕事の品</h2>
          </div>
          <p>{String(filteredProducts.length).padStart(2, '0')} ITEMS</p>
        </div>

        <div className="catalog-toolbar">
          <div className="catalog-filters" aria-label="商品カテゴリー">
            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={filter === category.value ? 'is-active' : ''}
              >
                {category.label}
              </button>
            ))}
          </div>
          <label className="catalog-sort">
            <span className="sr-only">並び順</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">新着順</option>
              <option value="price-asc">価格が安い順</option>
              <option value="price-desc">価格が高い順</option>
            </select>
            <ChevronDown size={15} aria-hidden="true" />
          </label>
        </div>

        <motion.div layout className="catalog-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.article
                layout
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.4, delay: index * 0.035 }}
              >
                <Link to={`/product/${product.id}`} className="catalog-card">
                  <div className="catalog-card__image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = '/images/ohmine/product-still.png';
                      }}
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="catalog-card__body">
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                    <div>
                      <span>{product.tagline}</span>
                      <strong>{product.priceStr}</strong>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="catalog-empty">
            <p>該当する商品がありません。</p>
            <button type="button" onClick={() => setFilter('All')}>すべての商品を見る</button>
          </div>
        )}
      </section>
    </div>
  );
}
