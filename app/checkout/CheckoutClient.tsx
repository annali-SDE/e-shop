'use client';

import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const router = useRouter();

  useEffect(() => {
     // Create a PaymentIntent as soon as the page loads
    if (cartProducts) {
      setIsLoading(true);
      setError(false);
      fetch('/api/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({ items: cartProducts, payment_intent_id: paymentIntent }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          setIsLoading(false);
          if (res.status === 401) {
            return router.push('/login')
          }
          return res.json();
        }).then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        }).catch((err) => {
          setError(true);
          console.log('Error', err);
          toast.error('Error creating payment intent');
         });
    }
  }, [cartProducts, paymentIntent]);
	return <div>CheckoutClient</div>;
};
export default CheckoutClient;