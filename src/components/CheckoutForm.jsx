import React, { useState } from 'react';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AlertCircle, ArrowRight, Lock } from 'lucide-react';

export default function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/success` },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(
        error.type === 'card_error' || error.type === 'validation_error'
          ? error.message
          : '決済処理を完了できませんでした。もう一度お試しください。',
      );
      setIsProcessing(false);
      return;
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <section>
        <h3>01 / お届け先</h3>
        <AddressElement options={{ mode: 'shipping', allowedCountries: ['JP'] }} />
      </section>
      <section>
        <h3>02 / お支払い方法</h3>
        <PaymentElement options={{ layout: 'tabs' }} />
      </section>
      {errorMessage && <p className="checkout-form__error"><AlertCircle size={17} />{errorMessage}</p>}
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? '処理中...' : `${amount.toLocaleString()}円を支払う`}
        {!isProcessing && <ArrowRight size={18} />}
      </button>
      <p className="checkout-form__secure"><Lock size={11} />Stripeにより暗号化され、安全に処理されます。</p>
    </form>
  );
}
