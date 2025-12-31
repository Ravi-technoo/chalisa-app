import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import { PlayArrow, MenuBook } from '@mui/icons-material';
import { fetchContentList } from '../store/slices/contentSlice';
import ContentMenu from '../components/ContentMenu';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { list, loading } = useSelector((state) => state.content);
  const { language } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchContentList({ language, limit: 6 }));
  }, [dispatch, language]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {t('home.welcome')}, {user?.name || 'User'}
        </Typography>
      </Container>

      {/* Devotional Content Menu */}
      <ContentMenu />

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Featured Content from Database */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Featured Content
        </Typography>

        <Grid container spacing={3}>
          {list.map((content) => (
            <Grid item xs={12} sm={6} md={4} key={content._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {content.type === 'chalisa' ? t('content.chalisa') : t('content.aarti')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {content.language.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  {content.audioUrl && (
                    <Button
                      size="small"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate(`/content/${content._id}`)}
                    >
                      {t('home.playNow')}
                    </Button>
                  )}
                  <Button
                    size="small"
                    startIcon={<MenuBook />}
                    onClick={() => navigate(`/content/${content._id}`)}
                  >
                    {t('home.readNow')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {!user?.isUnlocked && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/payment')}
            >
              {t('payment.unlockPremium')} - ₹10
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
