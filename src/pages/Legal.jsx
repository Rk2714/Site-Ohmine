import React from 'react';
import { motion } from 'framer-motion';

function Section({ title, children }) {
  return <div className="legal-row"><h2>{title}</h2><div>{children}</div></div>;
}

export default function Legal() {
  return (
    <div className="inner-page legal-page">
      <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="chapter-label chapter-label--ink">SHOP INFORMATION</span>
        <h1>特定商取引法に基づく表記</h1>
      </motion.header>
      <div className="legal-table">
        <Section title="販売業者">Yazirusi（Oh!! Mine 運営事務局）</Section>
        <Section title="運営統括責任者">金城 竜弥</Section>
        <Section title="所在地">〒901-2424<br />沖縄県中頭郡中城村南上原 501-302</Section>
        <Section title="電話番号">090-6858-2856<br /><small>お問い合わせは原則メールまたはInstagramのDMにてお願いいたします。</small></Section>
        <Section title="メールアドレス"><a href="mailto:ryuyakinjo@gmail.com">ryuyakinjo@gmail.com</a></Section>
        <Section title="商品代金以外の必要料金">なし（全商品、消費税・配送料込みの価格です）</Section>
        <Section title="お支払い方法">クレジットカード決済（Stripe）<br />PayPay（準備中）</Section>
        <Section title="お支払い時期">ご注文確定時にお支払いが確定いたします。</Section>
        <Section title="商品の引き渡し時期">通常、ご注文確定後（決済完了後）14日以内に発送いたします。<br />ハンドメイド品のため、制作状況により遅れる場合は個別にご連絡いたします。</Section>
        <Section title="返品・交換・キャンセル">
          <p><strong>お客様都合による返品</strong><br />一点もののハンドメイド作品であるため、イメージ違い等のお客様都合による返品・交換はお受けできません。</p>
          <p><strong>不良品・誤送</strong><br />商品に不備があった場合や異なる商品が届いた場合は、商品到着後7日以内にご連絡ください。送料弊社負担にて交換または返金いたします。</p>
        </Section>
      </div>
    </div>
  );
}
