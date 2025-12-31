import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Container,
} from '@mui/material';
import { contentTypes } from '../data/hanumanChalisa';

const ContentMenu = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleContentClick = (contentId) => {
    navigate(`/devotional/${contentId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}
      >
        {currentLanguage === 'hi' ? 'भक्ति सामग्री' : 'Devotional Content'}
      </Typography>

      <Grid container spacing={3}>
        {contentTypes.map((content) => (
          <Grid item xs={12} sm={6} md={3} key={content.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleContentClick(content.id)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{ fontSize: '4rem', mb: 2 }}
                  >
                    {content.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {currentLanguage === 'hi' ? content.nameHi : content.name}
                  </Typography>
                  {content.description && (
                    <Typography
                      variant="body2"
                      align="center"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {currentLanguage === 'hi' ? content.descriptionHi : content.description}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContentMenu;
