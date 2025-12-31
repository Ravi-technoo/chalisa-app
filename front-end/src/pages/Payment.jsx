import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../services/api';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      toast.error('Failed to load Razorpay SDK');
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/payment/initiate');

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'Hanuman Chalisa App',
        description: 'Premium Content Unlock',
        handler: async function (response) {
          try {
            await api.post('/payment/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            toast.success('Payment successful! Premium unlocked');
            navigate('/');
            window.location.reload();
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          contact: user?.phone,
        },
        theme: {
          color: '#ff6b35',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  if (user?.isUnlocked) {
    return (
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              {t('payment.unlocked')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You already have access to all premium content
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            {t('payment.unlockPremium')}
          </Typography>
          <Typography variant="h2" color="primary" sx={{ my: 3 }}>
            ₹10
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            One-time payment for lifetime access to all premium devotional content
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t('payment.payNow')}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payment;
