import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  Speed,
  Stop,
} from '@mui/icons-material';

const AudioPlayer = ({ verses, currentVerseIndex, onVerseChange, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const utteranceRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Get available voices
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      // Filter for Hindi and English voices
      const filteredVoices = availableVoices.filter(voice =>
        voice.lang.startsWith('hi') || voice.lang.startsWith('en')
      );
      setVoices(filteredVoices);

      // Set default voice based on language
      if (filteredVoices.length > 0) {
        const defaultVoice = filteredVoices.find(v =>
          language === 'hi' ? v.lang.startsWith('hi') : v.lang.startsWith('en')
        ) || filteredVoices[0];
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    synthRef.current.addEventListener('voiceschanged', loadVoices);

    return () => {
      synthRef.current.removeEventListener('voiceschanged', loadVoices);
    };
  }, [language]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakVerse = (verseIndex) => {
    if (!verses || !verses[verseIndex]) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const verse = verses[verseIndex];
    const text = verse.verse;

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = playbackRate;
    utterance.pitch = 1;
    utterance.volume = volume;
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentTime(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);

      // Auto-advance to next verse
      if (autoAdvance && verseIndex < verses.length - 1) {
        setTimeout(() => {
          onVerseChange(verseIndex + 1);
          speakVerse(verseIndex + 1);
        }, 500);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    // Simulate progress (speech synthesis doesn't provide real-time progress)
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentTime(event.charIndex / text.length);
      }
    };

    utteranceRef.current = utterance;

    // Estimate duration (rough approximation: ~150 words per minute)
    const wordCount = text.split(' ').length;
    const estimatedDuration = (wordCount / 150) * 60 / playbackRate;
    setDuration(estimatedDuration);

    synthRef.current.speak(utterance);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
    } else {
      speakVerse(currentVerseIndex);
    }
  };

  const handleStop = () => {
    synthRef.current.cancel();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIndex = currentVerseIndex + 1;
      onVerseChange(nextIndex);
      if (isPlaying) {
        speakVerse(nextIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (currentVerseIndex > 0) {
      const prevIndex = currentVerseIndex - 1;
      onVerseChange(prevIndex);
      if (isPlaying) {
        speakVerse(prevIndex);
      }
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (utteranceRef.current) {
      utteranceRef.current.volume = newValue;
    }
  };

  const handleRateChange = (event) => {
    const newRate = event.target.value;
    setPlaybackRate(newRate);
    if (isPlaying) {
      // Restart with new rate
      handleStop();
      setTimeout(() => speakVerse(currentVerseIndex), 100);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!verses || verses.length === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Stack spacing={2}>
          {/* Title and Status */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary">
              🎧 Audio Player
            </Typography>
            <Chip
              label={autoAdvance ? 'Auto-Advance ON' : 'Auto-Advance OFF'}
              color={autoAdvance ? 'success' : 'default'}
              size="small"
              onClick={() => setAutoAdvance(!autoAdvance)}
              clickable
            />
          </Box>

          {/* Current Verse Info */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {language === 'hi' ? 'वर्तमान चौपाई' : 'Current Verse'}: {currentVerseIndex + 1} / {verses.length}
            </Typography>
          </Box>

          {/* Playback Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handlePrevious}
              disabled={currentVerseIndex === 0}
              color="primary"
            >
              <SkipPrevious />
            </IconButton>

            <IconButton
              onClick={handlePlayPause}
              color="primary"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' },
                width: 56,
                height: 56,
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton
              onClick={handleStop}
              color="primary"
              disabled={!isPlaying}
            >
              <Stop />
            </IconButton>

            <IconButton
              onClick={handleNext}
              disabled={currentVerseIndex === verses.length - 1}
              color="primary"
            >
              <SkipNext />
            </IconButton>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption">{formatTime(currentTime)}</Typography>
            <Slider
              value={currentTime}
              max={duration}
              disabled
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="caption">{formatTime(duration)}</Typography>
          </Box>

          {/* Volume and Speed Controls */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Volume */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <VolumeUp fontSize="small" />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.1}
                sx={{ width: 100 }}
              />
            </Box>

            {/* Speed */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed fontSize="small" />
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={playbackRate}
                  onChange={handleRateChange}
                >
                  <MenuItem value={0.5}>0.5x</MenuItem>
                  <MenuItem value={0.75}>0.75x</MenuItem>
                  <MenuItem value={1}>1x</MenuItem>
                  <MenuItem value={1.25}>1.25x</MenuItem>
                  <MenuItem value={1.5}>1.5x</MenuItem>
                  <MenuItem value={2}>2x</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>

          {/* Voice Selection */}
          {voices.length > 0 && (
            <FormControl fullWidth size="small">
              <InputLabel>Voice</InputLabel>
              <Select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
                label="Voice"
              >
                {voices.map((voice) => (
                  <MenuItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Instructions */}
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            {language === 'hi'
              ? 'प्ले बटन दबाएं और सुनें। ऑटो-एडवांस चालू है।'
              : 'Click play to listen. Auto-advance is enabled.'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
