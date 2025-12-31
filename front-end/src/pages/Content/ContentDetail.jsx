import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { PlayArrow, Pause, Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchContentById } from '../../store/slices/contentSlice';

const ContentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentContent, loading } = useSelector((state) => state.content);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    dispatch(fetchContentById(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = currentContent.audioUrl;
      audio.play();
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentContent) {
    return (
      <Container>
        <Typography>Content not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {currentContent.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {currentContent.type === 'chalisa' ? t('content.chalisa') : t('content.aarti')}
          </Typography>

          {currentContent.audioUrl && (
            <Box sx={{ my: 2 }}>
              <IconButton
                color="primary"
                size="large"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
              </IconButton>
            </Box>
          )}

          <Box sx={{ my: 3 }}>
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-wrap', lineHeight: 2 }}
              className="hindi-text"
            >
              {currentContent.bodyText}
            </Typography>
          </Box>

          {currentContent.meaningText && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={showMeaning ? <VisibilityOff /> : <Visibility />}
                onClick={() => setShowMeaning(!showMeaning)}
                sx={{ mb: 2 }}
              >
                {showMeaning ? t('content.hideMeaning') : t('content.showMeaning')}
              </Button>

              {showMeaning && (
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {currentContent.meaningText}
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContentDetail;
