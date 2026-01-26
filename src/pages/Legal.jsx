import React from 'react';
import { motion } from 'framer-motion';

export default function Legal() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
      >
        <h1 className="text-3xl font-serif font-bold text-leather-dark mb-12 text-center">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-8">
          <Section title="販売業者">
            Yazirusi（Oh!! Mine 運営事務局）
          </Section>

          <Section title="運営統括責任者">
            金城 竜弥
          </Section>

          <Section title="所在地">
            〒901-2424<br />
            沖縄県中頭郡中城村南上原 501-302
          </Section>

          <Section title="電話番号">
            090-6858-2856<br />
            <span className="text-xs text-gray-500">※お問い合わせは原則メールまたはInstagramのDMにてお願いいたします。</span>
          </Section>

          <Section title="メールアドレス">
            info@ohmine.jp（仮）
          </Section>

          <Section title="商品代金以外の必要料金">
            なし（全商品、消費税・配送料込みの価格です）
          </Section>

          <Section title="お支払い方法">
            ・クレジットカード決済（Stripe）<br />
            ・PayPay（準備中）
          </Section>

          <Section title="お支払い時期">
            ご注文確定時にお支払いが確定いたします。
          </Section>

          <Section title="商品の引き渡し時期">
            通常、ご注文確定後（決済完了後）14日以内に発送いたします。<br />
            ※ハンドメイド品のため、制作状況により遅れる場合は個別にご連絡いたします。
          </Section>

          <Section title="返品・交換・キャンセルについて">
            <p className="mb-2"><strong>お客様都合による返品：</strong><br />
            当店の商品は一点もののハンドメイド作品であるため、イメージ違い等のお客様都合による返品・交換はお受けできません。</p>
            <p><strong>不良品・誤送：</strong><br />
            万が一、商品に不備があった場合や異なる商品が届いた場合は、商品到着後7日以内にご連絡ください。送料弊社負担にて速やかに交換または返金対応いたします。</p>
          </Section>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-b border-gray-100 pb-8 last:border-0">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      <div className="text-gray-900 leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
}
