import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { clearError } from '../../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [step, setStep] = useState('phone'); // phone, otp, signup
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/request-otp', { phone });
      const data = response.data;

      setIsNewUser(data.isNewUser);
      setDevOtp(data.devOtp || '');

      if (data.isNewUser) {
        setStep('signup');
        toast.success('Welcome! Please enter your name to continue');
      } else {
        setStep('otp');
        toast.success('OTP sent successfully');
      }

      setResendTimer(60);

      // Show dev OTP in development
      if (data.devOtp) {
        toast.info(`Dev OTP: ${data.devOtp}`, { autoClose: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setStep('otp');
    toast.success('Please enter the OTP sent to your phone');
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const payload = { phone, otp };
      if (isNewUser && name) {
        payload.name = name;
      }

      const response = await api.post('/auth/verify-otp', payload);
      const data = response.data;

      localStorage.setItem('token', data.token);

      toast.success(data.isNewUser ? 'Signup successful! Welcome!' : 'Login successful!');

      // Reload to update auth state
      window.location.href = '/';
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/request-otp', { phone });
      const data = response.data;

      setDevOtp(data.devOtp || '');
      setResendTimer(60);
      toast.success('OTP resent successfully');

      if (data.devOtp) {
        toast.info(`Dev OTP: ${data.devOtp}`, { autoClose: false });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'signup') {
      setStep('phone');
      setName('');
    } else if (step === 'otp') {
      if (isNewUser) {
        setStep('signup');
      } else {
        setStep('phone');
      }
      setOtp('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom color="primary">
              {t('app.title')}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              {step === 'phone' && 'Login or Signup'}
              {step === 'signup' && 'Complete Your Signup'}
              {step === 'otp' && 'Verify OTP'}
            </Typography>

            {/* Development OTP Display */}
            {devOtp && step === 'otp' && (
              <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2">
                  <strong>Dev Mode OTP:</strong> {devOtp}
                </Typography>
              </Alert>
            )}

            {/* Phone Number Step */}
            {step === 'phone' && (
              <form onSubmit={handleRequestOTP}>
                <TextField
                  fullWidth
                  label={t('auth.phoneNumber')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  margin="normal"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  inputProps={{ maxLength: 15 }}
                  disabled={loading}
                  helperText="Enter your mobile number to login or signup"
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ mt: 3 }}
                  disabled={loading || phone.length < 10}
                >
                  {loading ? <CircularProgress size={24} /> : 'Continue'}
                </Button>
              </form>
            )}

            {/* Signup Step - Name Collection */}
            {step === 'signup' && (
              <form onSubmit={handleSignup}>
                <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
                  New user detected! Please enter your name.
                </Alert>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  placeholder="Enter your full name"
                  disabled={loading}
                  autoFocus
                  helperText="This will be displayed on your profile"
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ mt: 3 }}
                  disabled={loading || !name.trim()}
                >
                  {loading ? <CircularProgress size={24} /> : 'Continue to OTP'}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </Button>
              </form>
            )}

            {/* OTP Verification Step */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP}>
                <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                  {isNewUser
                    ? `Welcome ${name}! Enter the OTP sent to ${phone}`
                    : `Enter the OTP sent to ${phone}`
                  }
                </Alert>
                <TextField
                  fullWidth
                  label={t('auth.otp')}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  margin="normal"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  inputProps={{ maxLength: 6 }}
                  disabled={loading}
                  autoFocus
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ mt: 3 }}
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? <CircularProgress size={24} /> : (isNewUser ? 'Complete Signup' : 'Verify & Login')}
                </Button>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  {resendTimer > 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      Resend OTP in {resendTimer}s
                    </Typography>
                  ) : (
                    <Button onClick={handleResendOTP} disabled={loading}>
                      {t('auth.resendOTP')}
                    </Button>
                  )}
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={handleBack}
                  disabled={loading}
                >
                  Back
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
