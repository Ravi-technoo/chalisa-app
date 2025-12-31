import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ContentCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'chalisa',
    contentId: '',
    title: '',
    language: 'hi',
    bodyText: '',
    meaningText: '',
    isPremium: false,
    doha: {
      opening: '',
      closing: '',
    },
    chaupai: [],
    metadata: {
      description: '',
      tags: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDohaChange = (field, value) => {
    setFormData({
      ...formData,
      doha: {
        ...formData.doha,
        [field]: value,
      },
    });
  };

  const handleMetadataChange = (field, value) => {
    setFormData({
      ...formData,
      metadata: {
        ...formData.metadata,
        [field]: value,
      },
    });
  };

  const addVerse = () => {
    setFormData({
      ...formData,
      chaupai: [...formData.chaupai, { verse: '', meaning: '' }],
    });
  };

  const removeVerse = (index) => {
    const newChaupai = formData.chaupai.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      chaupai: newChaupai,
    });
  };

  const handleVerseChange = (index, field, value) => {
    const newChaupai = [...formData.chaupai];
    newChaupai[index][field] = value;
    setFormData({
      ...formData,
      chaupai: newChaupai,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data based on content type
      const submitData = {
        type: formData.type,
        contentId: formData.contentId,
        title: formData.title,
        language: formData.language,
        isPremium: formData.isPremium,
        metadata: {
          description: formData.metadata.description,
          tags: formData.metadata.tags ? formData.metadata.tags.split(',').map(t => t.trim()) : [],
        },
      };

      if (formData.type === 'chalisa') {
        // For chalisa type, use structured data
        submitData.doha = formData.doha;
        submitData.chaupai = formData.chaupai;
      } else {
        // For other types (aarti, etc.), use bodyText
        submitData.bodyText = formData.bodyText;
        submitData.meaningText = formData.meaningText;
      }

      await api.post('/content/create', submitData);
      toast.success('Content created successfully');
      navigate('/content');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create content');
    }
  };

  const isChalisa = formData.type === 'chalisa';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create Devotional Content
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Add new devotional content in multiple languages
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Type Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Content Type</InputLabel>
                  <Select name="type" value={formData.type} onChange={handleChange}>
                    <MenuItem value="chalisa">Chalisa (चालीसा)</MenuItem>
                    <MenuItem value="aarti">Aarti (आरती)</MenuItem>
                    <MenuItem value="ramayan">Ramayan (रामायण)</MenuItem>
                    <MenuItem value="mahabharat">Mahabharat (महाभारत)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Language Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Language</InputLabel>
                  <Select name="language" value={formData.language} onChange={handleChange}>
                    <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Content ID */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content ID (e.g., hanuman-chalisa, ganesh-aarti)"
                  name="contentId"
                  value={formData.contentId}
                  onChange={handleChange}
                  required
                  helperText="Unique identifier for this content (use lowercase and hyphens)"
                />
              </Grid>

              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  helperText="Display title in the selected language"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.metadata.description}
                  onChange={(e) => handleMetadataChange('description', e.target.value)}
                  multiline
                  rows={2}
                  helperText="Brief description of this content"
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={formData.metadata.tags}
                  onChange={(e) => handleMetadataChange('tags', e.target.value)}
                  helperText="e.g., devotional, hanuman, prayer"
                />
              </Grid>

              {/* Premium Toggle */}
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isPremium}
                      onChange={handleChange}
                      name="isPremium"
                    />
                  }
                  label="Premium Content"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Chalisa-specific fields */}
            {isChalisa ? (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Doha (Opening & Closing Verses)
                </Typography>

                <TextField
                  fullWidth
                  label="Opening Doha"
                  value={formData.doha.opening}
                  onChange={(e) => handleDohaChange('opening', e.target.value)}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                  helperText="Opening verse of the Chalisa"
                />

                <TextField
                  fullWidth
                  label="Closing Doha"
                  value={formData.doha.closing}
                  onChange={(e) => handleDohaChange('closing', e.target.value)}
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                  helperText="Closing verse of the Chalisa"
                />

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Chaupai (Verses) - {formData.chaupai.length} verses
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addVerse}
                  >
                    Add Verse
                  </Button>
                </Box>

                {formData.chaupai.length === 0 && (
                  <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                    <Typography color="text.secondary">
                      No verses added yet. Click "Add Verse" to start.
                    </Typography>
                  </Paper>
                )}

                {formData.chaupai.map((verse, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#fafafa' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" color="primary">
                        Verse {index + 1}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeVerse(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <TextField
                      fullWidth
                      label="Verse Text"
                      value={verse.verse}
                      onChange={(e) => handleVerseChange(index, 'verse', e.target.value)}
                      multiline
                      rows={2}
                      required
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      label="Meaning"
                      value={verse.meaning}
                      onChange={(e) => handleVerseChange(index, 'meaning', e.target.value)}
                      multiline
                      rows={2}
                    />
                  </Paper>
                ))}
              </>
            ) : (
              /* Non-Chalisa content fields */
              <>
                <Typography variant="h6" gutterBottom>
                  Content Body
                </Typography>

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
                  helperText="Main content text"
                />

                <TextField
                  fullWidth
                  label="Meaning Text (Optional)"
                  name="meaningText"
                  value={formData.meaningText}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  helperText="Translation or meaning of the content"
                />
              </>
            )}

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" size="large">
                Create Content
              </Button>
              <Button variant="outlined" onClick={() => navigate('/content')} size="large">
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContentCreate;
