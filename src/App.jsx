import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import About from './pages/About';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Legal from './pages/Legal';
import ProductDetail from './pages/ProductDetail';
import ShamisenSchool from './pages/ShamisenSchool';
import Success from './pages/Success';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useCart } from './context/CartContext';

const mainLinks = [
  { to: '/collection', label: '商品' },
  { to: '/about', label: '工房について' },
  { to: '/shamisen', label: '三線教室' },
  { to: '/legal', label: 'ご利用案内' },
];

function Header() {
  const { pathname } = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onHome = pathname === '/';

  return (
    <header
      className={`site-header ${onHome ? 'site-header--home' : 'site-header--inner'}`}
    >
      <div className="site-header__row">
        <Link to="/" className="site-wordmark" onClick={() => setIsMenuOpen(false)}>
          Oh!! Mine
          <span>ISHIGAKI / OKINAWA</span>
        </Link>

        <nav className="site-nav" aria-label="メインナビゲーション">
          {mainLinks.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
          <a href="mailto:ryuyakinjo@gmail.com">お問い合わせ</a>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="header-cart"
            onClick={() => setIsCartOpen(true)}
            aria-label={`買い物かご、${cartCount}点`}
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            <span className="header-cart__label">買い物かご</span>
            <span>{String(cartCount).padStart(2, '0')}</span>
          </button>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-nav" aria-label="モバイルナビゲーション">
          {mainLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href="mailto:ryuyakinjo@gmail.com" onClick={() => setIsMenuOpen(false)}>
            お問い合わせ
          </a>
        </nav>
      )}
    </header>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f2ede3] text-[#1a1a18]">
      <ScrollToTop />
      <CartDrawer />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shamisen" element={<ShamisenSchool />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
