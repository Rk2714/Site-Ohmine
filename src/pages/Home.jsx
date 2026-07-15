import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] },
};

function TextLink({ to, children, light = false }) {
  return (
    <Link to={to} className={`editorial-link ${light ? 'editorial-link--light' : ''}`}>
      {children}
      <ArrowRight size={17} strokeWidth={1.4} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="workshop-hero" aria-labelledby="home-heading">
        <img
          src="/images/ohmine/ishigaki-workshop-hero.png"
          alt="石垣島の工房で八重山の布を仕立てる作り手"
          className="workshop-hero__image"
        />
        <div className="workshop-hero__shade" />
        <motion.div
          className="workshop-hero__noren"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
        >
          <span className="workshop-hero__eyebrow">ISHIGAKI / OKINAWA</span>
          <h1 id="home-heading" className="vertical-copy">
            <span>石垣島で、</span>
            <span>手仕事と三線を</span>
            <span>暮らしにつなぐ。</span>
          </h1>
          <p>島で生まれる布の道具と、受け継がれる三線の音。</p>
        </motion.div>
        <div className="workshop-hero__note">
          <span>OH!! MINE</span>
          <span>CRAFT &amp; SANSHIN</span>
        </div>
      </section>

      <section className="chapter-gates" aria-label="商品と三線教室">
        <motion.article className="chapter-gate chapter-gate--indigo" {...reveal}>
          <div className="chapter-gate__copy">
            <span className="chapter-label">01 / ISLAND CRAFT</span>
            <h2>島の布を、<br />日々の道具へ。</h2>
            <p>八重山の織りの気配を、毎日使える小さな品に仕立てます。</p>
            <TextLink to="/collection" light>商品を見る</TextLink>
          </div>
          <img src="/images/ohmine/minsa-products-indigo.png" alt="藍色の八重山ミンサー小物" />
        </motion.article>

        <motion.article className="chapter-gate chapter-gate--vermilion" {...reveal}>
          <div className="chapter-gate__copy">
            <span className="chapter-label">02 / SANSHIN SCHOOL</span>
            <h2>島の音を、<br />次の人へ。</h2>
            <p>楽器に触れるところから、一人ひとりの歩幅で丁寧に。</p>
            <TextLink to="/shamisen" light>三線教室を見る</TextLink>
          </div>
          <img src="/images/ohmine/sanshin-vermilion.png" alt="沖縄の三線を奏でる様子" />
        </motion.article>
      </section>

      <motion.section className="brand-intro" {...reveal}>
        <div className="brand-intro__index">OUR PLACE<br />ISHIGAKI</div>
        <div className="brand-intro__copy">
          <span className="chapter-label chapter-label--ink">OH!! MINEについて</span>
          <h2>作ることと、奏でること。<br />どちらも島の暮らしから。</h2>
          <p>
            石垣島の光、風、手ざわり。Oh!! Mineは、手仕事の品と三線の時間を通して、
            島で育まれてきたものを暮らしの近くへ届けます。
          </p>
          <TextLink to="/about">工房のことを読む</TextLink>
        </div>
        <div className="brand-intro__facts">
          <div><span>01</span><p>石垣島を拠点に活動</p></div>
          <div><span>02</span><p>一点ずつ仕立てる手仕事</p></div>
          <div><span>03</span><p>初めての方にも開かれた三線教室</p></div>
        </div>
      </motion.section>

      <section className="featured-editorial">
        <div className="section-heading">
          <div>
            <span className="chapter-label chapter-label--ink">SELECTED OBJECTS</span>
            <h2>島から届く、手仕事の品。</h2>
          </div>
          <TextLink to="/collection">すべての商品</TextLink>
        </div>
        <div className="featured-editorial__grid">
          {products.slice(0, 3).map((product, index) => (
            <motion.article key={product.id} {...reveal}>
              <Link to={`/product/${product.id}`} className="product-editorial-card">
                <div className="product-editorial-card__image">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/images/ohmine/minsa-products-indigo.png';
                    }}
                  />
                  <span>0{index + 1}</span>
                </div>
                <div className="product-editorial-card__body">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <div><span>{product.tagline}</span><strong>{product.priceStr}</strong></div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section className="lesson-banner" {...reveal}>
        <img src="/images/ohmine/sanshin-vermilion.png" alt="石垣島の三線教室" />
        <div className="lesson-banner__copy">
          <Music2 size={25} strokeWidth={1.35} />
          <span className="chapter-label">SANSHIN IN ISHIGAKI</span>
          <h2>初めての一音から、<br />島の歌へ。</h2>
          <p>楽器をお持ちでない方も大丈夫です。石垣島で、三線に触れる時間を。</p>
          <TextLink to="/shamisen" light>教室のご案内</TextLink>
        </div>
      </motion.section>

      <section className="home-closing">
        <div>
          <ShoppingBag size={21} strokeWidth={1.4} />
          <span>PRODUCTS</span>
          <TextLink to="/collection">島の手仕事を見る</TextLink>
        </div>
        <div>
          <Music2 size={21} strokeWidth={1.4} />
          <span>SANSHIN</span>
          <TextLink to="/shamisen">三線教室を見る</TextLink>
        </div>
      </section>
    </div>
  );
}
