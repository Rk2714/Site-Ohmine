import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const lessons = [
  { number: '01', title: '個人レッスン', detail: '60分 / 月2回から', copy: '構え方や勘所から、弾きたい曲まで。一人ひとりの進み方に合わせます。' },
  { number: '02', title: '少人数レッスン', detail: '90分 / 2から3名', copy: '家族や友人と一緒に。互いの音を聴きながら、島唄を楽しく学びます。' },
  { number: '03', title: '体験レッスン', detail: '60分 / 1回', copy: '三線を持っていなくても大丈夫です。まずは一音、鳴らすところから。' },
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7 },
};

export default function ShamisenSchool() {
  return (
    <div className="inner-page sanshin-page">
      <section className="sanshin-hero">
        <img src="/images/ohmine/sanshin-vermilion.png" alt="石垣島で沖縄の三線を奏でるレッスン風景" />
        <motion.div
          className="sanshin-hero__panel"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>02 / SANSHIN SCHOOL</span>
          <h1>島の音を、<br />自分の指で。</h1>
          <p>石垣島で、三線を始める。初めての一音から、島の歌へ。</p>
        </motion.div>
      </section>

      <motion.section className="sanshin-intro" {...reveal}>
        <div className="sanshin-intro__index">THE SOUND<br />OF ISHIGAKI</div>
        <div>
          <span className="chapter-label chapter-label--ink">ABOUT THE LESSON</span>
          <h2>急がず、比べず、<br />自分の音を見つける。</h2>
        </div>
        <p>
          三線は、沖縄の暮らしとともに歌い継がれてきた楽器です。
          楽器に触れたことがない方にも、構え方や音の出し方から丁寧に。
          石垣島の風を感じながら、それぞれの歩幅で一曲を育てていきます。
        </p>
      </motion.section>

      <section className="lesson-list" aria-labelledby="lesson-heading">
        <div className="lesson-list__heading">
          <span className="chapter-label">LESSON PLANS</span>
          <h2 id="lesson-heading">レッスンのかたち</h2>
        </div>
        <div className="lesson-list__rows">
          {lessons.map((lesson) => (
            <motion.article key={lesson.number} {...reveal}>
              <span>{lesson.number}</span>
              <h3>{lesson.title}</h3>
              <p>{lesson.copy}</p>
              <strong>{lesson.detail}</strong>
            </motion.article>
          ))}
        </div>
      </section>

      <motion.section className="lesson-information" {...reveal}>
        <div className="lesson-information__image">
          <img src="/images/ohmine/sanshin-vermilion.png" alt="沖縄の三線の棹と胴を持つ手元" />
        </div>
        <div className="lesson-information__copy">
          <span className="chapter-label chapter-label--ink">INFORMATION</span>
          <h2>教室のご案内</h2>
          <dl>
            <div><dt><MapPin size={17} />場所</dt><dd>沖縄県石垣市<br />詳細はご予約時にお伝えします</dd></div>
            <div><dt><Clock size={17} />時間</dt><dd>平日 10:00から20:00<br />土日はご相談ください</dd></div>
            <div><dt><Music2 size={17} />三線</dt><dd>体験時の貸し出しがあります<br />楽器をお持ちでない方も参加できます</dd></div>
          </dl>
        </div>
      </motion.section>

      <section className="lesson-contact">
        <div>
          <span>FIRST LESSON</span>
          <h2>まずは、一音から。</h2>
          <p>体験レッスンの希望日と人数をお知らせください。</p>
        </div>
        <a href="mailto:ryuyakinjo@gmail.com" className="lesson-contact__button">
          体験レッスンを相談する <ArrowRight size={18} />
        </a>
      </section>

      <section className="sanshin-crosslink">
        <div>
          <span className="chapter-label chapter-label--ink">01 / ISLAND CRAFT</span>
          <h2>島の手仕事も、<br />同じ工房から。</h2>
          <Link to="/collection" className="editorial-link">
            商品を見る <ArrowRight size={16} />
          </Link>
        </div>
        <img src="/images/ohmine/minsa-products-indigo.png" alt="藍色の八重山ミンサー小物" />
      </section>
    </div>
  );
}
