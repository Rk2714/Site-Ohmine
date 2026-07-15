import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7 },
};

export default function About() {
  return (
    <div className="inner-page about-page">
      <section className="about-hero">
        <motion.div
          className="about-hero__copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <span className="chapter-label chapter-label--ink">OUR WORKSHOP</span>
          <h1>作ることと、<br />奏でること。</h1>
          <p>どちらも、石垣島の暮らしから始まります。</p>
        </motion.div>
        <img src="/images/ohmine/ishigaki-workshop-hero.png" alt="石垣島の木造工房で布を仕立てる様子" />
      </section>

      <motion.section className="about-statement" {...reveal}>
        <p className="about-statement__index">OH!! MINE<br />ISHIGAKI / OKINAWA</p>
        <h2>
          島で受け継がれてきたものを、<br />暮らしのすぐそばへ。
        </h2>
        <p className="about-statement__body">
          強い日差し、潮を含んだ風、赤瓦の家並み。Oh!! Mineは、石垣島で感じる色と手ざわりを、
          日々使える布の道具と、三線に触れる時間にして届けます。飾り立てるのではなく、
          素材の表情と作り手の手跡が静かに残ることを大切にしています。
        </p>
      </motion.section>

      <section className="about-chapters">
        <motion.article className="about-chapter about-chapter--indigo" {...reveal}>
          <div>
            <span>01</span>
            <p>ISLAND CRAFT</p>
          </div>
          <img src="/images/ohmine/product-still.png" alt="藍色の布小物と島の素材" />
          <div className="about-chapter__copy">
            <h2>使いながら、<br />自分の色に育つもの。</h2>
            <p>
              ミンサーや紅型の意匠、丈夫なデニムや布地。一点ずつ柄の出方を見ながら、
              長く使える形に仕立てています。
            </p>
            <Link to="/collection" className="editorial-link editorial-link--light">
              商品を見る <ArrowRight size={16} />
            </Link>
          </div>
        </motion.article>

        <motion.article className="about-chapter about-chapter--vermilion" {...reveal}>
          <div>
            <span>02</span>
            <p>SANSHIN SCHOOL</p>
          </div>
          <img src="/images/ohmine/sanshin-vermilion.png" alt="石垣島で沖縄の三線を奏でる人" />
          <div className="about-chapter__copy">
            <h2>一音ずつ、<br />島の歌に近づく。</h2>
            <p>
              三線を初めて持つ方から、島唄を深めたい方まで。それぞれの歩幅に合わせて、
              音をつなぐ時間をつくります。
            </p>
            <Link to="/shamisen" className="editorial-link editorial-link--light">
              三線教室を見る <ArrowRight size={16} />
            </Link>
          </div>
        </motion.article>
      </section>

      <motion.section className="about-belief" {...reveal}>
        <span className="chapter-label chapter-label--ink">OUR BELIEF</span>
        <h2>いつの世までも、という願い。</h2>
        <p>
          ミンサー織りの五つと四つの絣には、「いつの世までも末永く」という想いが重ねられています。
          手にした品も、覚えた一曲も、その人の暮らしの中で長く残っていくものでありますように。
        </p>
      </motion.section>
    </div>
  );
}
