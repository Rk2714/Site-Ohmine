import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <Link to="/">Oh!! Mine</Link>
        <p>石垣島で、手仕事と三線を暮らしにつなぐ。</p>
      </div>
      <div className="site-footer__links">
        <Link to="/collection">商品</Link>
        <Link to="/shamisen">三線教室</Link>
        <Link to="/about">工房について</Link>
        <Link to="/legal">特定商取引法に基づく表記</Link>
      </div>
      <div className="site-footer__contact">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram size={19} strokeWidth={1.4} />
        </a>
        <a href="mailto:ryuyakinjo@gmail.com" aria-label="メールで問い合わせる">
          <Mail size={19} strokeWidth={1.4} />
        </a>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Oh!! Mine</span>
        <span>ISHIGAKI / OKINAWA</span>
      </div>
    </footer>
  );
}
