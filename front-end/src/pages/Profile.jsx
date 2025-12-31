import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../services/api';

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    languagePref: 'hi',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        languagePref: user.languagePref || 'hi',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/profile/update', formData);
      toast.success('Profile updated successfully');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {t('profile.myProfile')}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                {t('profile.phone')}
              </Typography>
              <Typography variant="body1">{user?.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                {t('profile.role')}
              </Typography>
              <Chip label={user?.role} color="primary" size="small" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('profile.unlockStatus')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                {user?.isUnlocked ? (
                  <>
                    <CheckCircle color="success" />
                    <Typography color="success.main">{t('payment.unlocked')}</Typography>
                  </>
                ) : (
                  <>
                    <Cancel color="error" />
                    <Typography color="error.main">Locked</Typography>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label={t('profile.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              select
              label={t('profile.language')}
              name="languagePref"
              value={formData.languagePref}
              onChange={handleChange}
              sx={{ mb: 2 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="hi">हिन्दी</option>
              <option value="en">English</option>
            </TextField>

            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? 'Updating...' : t('profile.updateProfile')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
