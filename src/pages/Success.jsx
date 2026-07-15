import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Mail, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  const orderId = `OM-${Math.floor(100000 + Math.random() * 900000)}`;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 14);

  return (
    <div className="inner-page success-page">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="success-page__mark"><Check size={24} /></div>
        <span className="chapter-label chapter-label--ink">ORDER CONFIRMED</span>
        <h1>ご注文ありがとうございます。</h1>
        <p>石垣島の工房から、仕立ててお届けします。</p>
        <dl>
          <div><dt>注文番号</dt><dd>{orderId}</dd></div>
          <div><dt>ご注文日</dt><dd>{new Date().toLocaleDateString('ja-JP')}</dd></div>
        </dl>
        <div className="success-page__notes">
          <article><Mail size={19} /><div><h2>確認メール</h2><p>ご登録のメールアドレスに、領収書とご注文内容をお送りしました。</p></div></article>
          <article><Truck size={19} /><div><h2>発送の目安</h2><p>一点ずつ仕立てるため、お届けまで約2週間いただきます。目安は{deliveryDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}です。</p></div></article>
        </div>
        <Link to="/" className="editorial-link"><ArrowLeft size={16} /> トップへ戻る</Link>
      </motion.section>
    </div>
  );
}
