import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TranslateIcon from '@mui/icons-material/Translate';
import { contentTypes } from '../data/hanumanChalisa';
import AudioPlayer from '../components/AudioPlayer';
import api from '../services/api';

const ContentViewer = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [contentInfo, setContentInfo] = useState(null);
  const [fontSize, setFontSize] = useState(1.1);
  const [showMeaning, setShowMeaning] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Find content info from contentTypes
        const info = contentTypes.find((c) => c.id === contentId);
        setContentInfo(info);

        // Fetch content from API
        const response = await api.get(`/content/by-content-id/${contentId}`, {
          params: { language: currentLanguage }
        });

        if (response.data && response.data.content) {
          setContent(response.data.content);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err.response?.data?.error || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContent();
    }
  }, [contentId, currentLanguage]);

  const handleBack = () => {
    navigate(-1);
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 0.1, 2));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 0.1, 0.8));
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
  };

  const handleVerseChange = (newIndex) => {
    setCurrentVerseIndex(newIndex);
    // Scroll to the verse
    const verseElement = document.getElementById(`verse-${newIndex}`);
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button onClick={handleBack} variant="outlined">
          {currentLanguage === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </Button>
      </Container>
    );
  }

  if (!contentInfo || !content) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          {currentLanguage === 'hi' ? 'सामग्री नहीं मिली' : 'Content not found'}
        </Typography>
        <Button onClick={handleBack} sx={{ mt: 2 }}>
          {currentLanguage === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </Button>
      </Container>
    );
  }

  // Render content with verses (Chalisa type)
  if (content.type === 'chalisa' && content.chaupai && content.chaupai.length > 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {content.title}
            </Typography>
          </Box>

          {/* Controls */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<TranslateIcon />}
              label={currentLanguage === 'hi' ? 'EN' : 'हिं'}
              onClick={toggleLanguage}
              color="primary"
              variant="outlined"
              clickable
            />
            <IconButton onClick={decreaseFontSize} size="small" color="primary">
              <TextDecreaseIcon />
            </IconButton>
            <Typography variant="caption">{Math.round(fontSize * 100)}%</Typography>
            <IconButton onClick={increaseFontSize} size="small" color="primary">
              <TextIncreaseIcon />
            </IconButton>
            <ToggleButtonGroup
              value={showMeaning}
              exclusive
              onChange={(e, val) => setShowMeaning(val)}
              size="small"
            >
              <ToggleButton value={true}>
                {currentLanguage === 'hi' ? 'अर्थ' : 'Meaning'}
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>

        {/* Audio Player */}
        <AudioPlayer
          verses={content.chaupai}
          currentVerseIndex={currentVerseIndex}
          onVerseChange={handleVerseChange}
          language={currentLanguage}
        />

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          {/* Opening Doha */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}
            >
              {currentLanguage === 'hi' ? 'दोहा' : 'Opening Doha'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                lineHeight: 2,
                fontFamily: currentLanguage === 'hi' ? 'Noto Sans Devanagari, sans-serif' : 'inherit',
                textAlign: 'center',
                mb: 2,
                fontSize: `${fontSize}rem`,
              }}
            >
              {content.doha.opening}
            </Typography>
            {showMeaning && content.doha.openingMeaning && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', fontStyle: 'italic', fontSize: `${fontSize * 0.85}rem` }}
              >
                {content.doha.openingMeaning}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Chaupais */}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 3, color: 'secondary.main' }}
            >
              {currentLanguage === 'hi' ? 'चौपाई' : 'Chaupais'}
            </Typography>

            {content.chaupai.map((verse, index) => (
              <Card
                key={index}
                id={`verse-${index}`}
                sx={{
                  mb: 2,
                  backgroundColor: currentVerseIndex === index ? '#e3f2fd' : '#fafafa',
                  border: currentVerseIndex === index ? '2px solid #2196f3' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                <CardContent>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {currentLanguage === 'hi' ? `चौपाई ${index + 1}` : `Verse ${index + 1}`}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      fontFamily: currentLanguage === 'hi' ? 'Noto Sans Devanagari, sans-serif' : 'inherit',
                      fontSize: `${fontSize}rem`,
                      mb: 1,
                    }}
                  >
                    {verse.verse}
                  </Typography>
                  {showMeaning && verse.meaning && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: 'italic', mt: 1, fontSize: `${fontSize * 0.85}rem` }}
                    >
                      {currentLanguage === 'hi' ? 'अर्थ: ' : 'Meaning: '}
                      {verse.meaning}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Closing Doha */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.main' }}
            >
              {currentLanguage === 'hi' ? 'समापन दोहा' : 'Closing Doha'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                lineHeight: 2,
                fontFamily: currentLanguage === 'hi' ? 'Noto Sans Devanagari, sans-serif' : 'inherit',
                textAlign: 'center',
                mb: 2,
                fontSize: `${fontSize}rem`,
              }}
            >
              {content.doha.closing}
            </Typography>
            {showMeaning && content.doha.closingMeaning && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', fontStyle: 'italic', fontSize: `${fontSize * 0.85}rem` }}
              >
                {content.doha.closingMeaning}
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Back Button */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            size="large"
          >
            {currentLanguage === 'hi' ? 'वापस जाएं' : 'Go Back'}
          </Button>
        </Box>
      </Container>
    );
  }

  // Placeholder for other content types
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {currentLanguage === 'hi' ? contentInfo.nameHi : contentInfo.name}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {contentInfo.icon}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {currentLanguage === 'hi' ? 'जल्द आ रहा है...' : 'Coming Soon...'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {currentLanguage === 'hi'
            ? 'यह सामग्री जल्द ही उपलब्ध होगी।'
            : 'This content will be available soon.'}
        </Typography>
        <Button variant="outlined" onClick={handleBack} sx={{ mt: 3 }}>
          {currentLanguage === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </Button>
      </Paper>
    </Container>
  );
};

export default ContentViewer;
