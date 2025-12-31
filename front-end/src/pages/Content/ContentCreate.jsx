import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ContentCreate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    type: 'chalisa',
    title: '',
    language: 'hi',
    bodyText: '',
    meaningText: '',
    isPremium: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/content/create', formData);
      toast.success('Content created successfully');
      navigate('/content');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create content');
    }
  };

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {t('common.create')} Content
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <MenuItem value="chalisa">{t('content.chalisa')}</MenuItem>
                <MenuItem value="aarti">{t('content.aarti')}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select name="language" value={formData.language} onChange={handleChange}>
                <MenuItem value="hi">हिन्दी</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Body Text"
              name="bodyText"
              value={formData.bodyText}
              onChange={handleChange}
              required
              multiline
              rows={10}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Meaning Text"
              name="meaningText"
              value={formData.meaningText}
              onChange={handleChange}
              multiline
              rows={6}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" size="large" sx={{ mr: 2 }}>
                {t('common.create')}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/content')}>
                {t('common.cancel')}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContentCreate;
