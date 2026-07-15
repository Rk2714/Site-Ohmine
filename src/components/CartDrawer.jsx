import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState('cart');
  const [clientSecret, setClientSecret] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeDrawer = () => {
    setIsCartOpen(false);
    window.setTimeout(() => {
      setStep('cart');
      setClientSecret('');
      setCheckoutError('');
    }, 300);
  };

  const handleProceedToPayment = async () => {
    if (!stripePromise) {
      setCheckoutError('決済機能は現在準備中です。商品についてはお問い合わせください。');
      return;
    }
    setIsLoading(true);
    setCheckoutError('');
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal }),
      });
      if (!response.ok) throw new Error('payment-intent');
      const data = await response.json();
      if (!data.clientSecret) throw new Error('client-secret');
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch {
      setCheckoutError('決済画面を準備できませんでした。時間をおいてもう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    closeDrawer();
    clearCart();
    navigate('/success');
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#071c31',
      colorBackground: '#f7f3eb',
      colorText: '#171714',
      borderRadius: '0px',
    },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="買い物かごを閉じる"
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="cart-drawer"
            aria-label="買い物かご"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            <header className="cart-drawer__header">
              <div>
                {step === 'payment' && (
                  <button type="button" onClick={() => setStep('cart')} aria-label="買い物かごに戻る">
                    <ArrowLeft size={19} />
                  </button>
                )}
                <ShoppingBag size={18} />
                <h2>{step === 'cart' ? '買い物かご' : 'お支払い'}</h2>
                {step === 'cart' && <span>{String(cartItems.length).padStart(2, '0')}</span>}
              </div>
              <button type="button" onClick={closeDrawer} aria-label="閉じる"><X size={21} /></button>
            </header>

            <div className="cart-drawer__body">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={38} strokeWidth={1.2} />
                  <p>買い物かごは空です。</p>
                  <button type="button" onClick={closeDrawer}>商品を見る</button>
                </div>
              ) : step === 'cart' ? (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <article key={`${item.id}-${item.monogram}`} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = '/images/ohmine/product-still.png';
                        }}
                      />
                      <div className="cart-item__content">
                        <div><p>{item.category}</p><h3>{item.name}</h3></div>
                        {item.monogram && <small>刻印: {item.monogram}</small>}
                        <div className="cart-item__bottom">
                          <strong>¥{item.price.toLocaleString()}</strong>
                          <div className="cart-quantity">
                            <button
                              type="button"
                              aria-label={`${item.name}を1点減らす`}
                              onClick={() => item.quantity > 1
                                ? updateQuantity(item.id, item.monogram, -1)
                                : removeFromCart(item.id, item.monogram)}
                            ><Minus size={13} /></button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              aria-label={`${item.name}を1点増やす`}
                              onClick={() => updateQuantity(item.id, item.monogram, 1)}
                            ><Plus size={13} /></button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : clientSecret ? (
                <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                  <CheckoutForm amount={cartTotal} onSuccess={handlePaymentSuccess} />
                </Elements>
              ) : null}
            </div>

            {cartItems.length > 0 && step === 'cart' && (
              <footer className="cart-drawer__footer">
                <dl>
                  <div><dt>小計</dt><dd>¥{cartTotal.toLocaleString()}</dd></div>
                  <div><dt>送料</dt><dd>商品価格に含まれます</dd></div>
                  <div><dt>合計</dt><dd>¥{cartTotal.toLocaleString()}</dd></div>
                </dl>
                {checkoutError && <p className="cart-error" role="alert">{checkoutError}</p>}
                <button type="button" onClick={handleProceedToPayment} disabled={isLoading}>
                  {isLoading ? '準備中...' : 'お支払いへ進む'} <ArrowRight size={18} />
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
