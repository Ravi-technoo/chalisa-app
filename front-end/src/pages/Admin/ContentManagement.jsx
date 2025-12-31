import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import api from '../../services/api';

const ContentManagement = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchContents();
  }, [currentUser, navigate]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/content/list', {
        params: { limit: 100 },
      });
      setContents(response.data.content || []);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (content) => {
    setSelectedContent(content);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/content/delete/${selectedContent._id}`);
      toast.success('Content deleted successfully');
      setDeleteDialogOpen(false);
      fetchContents();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete content');
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'chalisa':
        return 'primary';
      case 'aarti':
        return 'secondary';
      case 'ramayan':
        return 'warning';
      case 'mahabharat':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chalisa':
        return '📿';
      case 'aarti':
        return '🪔';
      case 'ramayan':
        return '📖';
      case 'mahabharat':
        return '⚔️';
      default:
        return '📄';
    }
  };

  const getLanguageLabel = (langCode) => {
    const languages = {
      hi: 'हिं',
      en: 'EN',
      bn: 'বাং',
      mr: 'मर',
      ta: 'தமி',
      te: 'తె',
      gu: 'ગુ',
      kn: 'ಕನ್',
      ml: 'മല',
      pa: 'ਪੰ',
      or: 'ଓଡ଼',
      as: 'অস',
    };
    return languages[langCode] || langCode.toUpperCase();
  };

  const filteredContents = contents.filter((content) => {
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesLanguage = filterLanguage === 'all' || content.language === filterLanguage;
    const matchesSearch =
      content.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.contentId?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesLanguage && matchesSearch;
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/admin/dashboard')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Content Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/content/create')}
        >
          Create New
        </Button>
      </Box>

      {/* Filters */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search by title or content ID"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={filterType} label="Type" onChange={(e) => setFilterType(e.target.value)}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="chalisa">Chalisa</MenuItem>
              <MenuItem value="aarti">Aarti</MenuItem>
              <MenuItem value="ramayan">Ramayan</MenuItem>
              <MenuItem value="mahabharat">Mahabharat</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Language</InputLabel>
            <Select value={filterLanguage} label="Language" onChange={(e) => setFilterLanguage(e.target.value)}>
              <MenuItem value="all">All Languages</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="bn">Bengali</MenuItem>
              <MenuItem value="mr">Marathi</MenuItem>
              <MenuItem value="ta">Tamil</MenuItem>
              <MenuItem value="te">Telugu</MenuItem>
              <MenuItem value="gu">Gujarati</MenuItem>
              <MenuItem value="kn">Kannada</MenuItem>
              <MenuItem value="ml">Malayalam</MenuItem>
              <MenuItem value="pa">Punjabi</MenuItem>
              <MenuItem value="or">Odia</MenuItem>
              <MenuItem value="as">Assamese</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={fetchContents}>
            Refresh
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip label={`Total: ${contents.length}`} color="primary" />
          <Chip label={`Chalisa: ${contents.filter((c) => c.type === 'chalisa').length}`} />
          <Chip label={`Aarti: ${contents.filter((c) => c.type === 'aarti').length}`} />
          <Chip label={`Premium: ${contents.filter((c) => c.isPremium).length}`} color="warning" />
        </Box>
      </Paper>

      {/* Content Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Content</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Language</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Premium</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Verses</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">No content found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredContents.map((content) => (
                <TableRow key={content._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{getTypeIcon(content.type)}</Typography>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {content.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {content.contentId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={content.type} color={getTypeColor(content.type)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={getLanguageLabel(content.language)} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {content.isPremium ? (
                      <Chip label="Premium" color="warning" size="small" />
                    ) : (
                      <Chip label="Free" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {content.chaupai?.length || content.bodyText ? '✓' : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/devotional/${content.contentId}`)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => navigate(`/content/edit/${content._id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(content)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to delete this content?
          </Alert>
          {selectedContent && (
            <Box>
              <Typography variant="body2">
                <strong>Title:</strong> {selectedContent.title}
              </Typography>
              <Typography variant="body2">
                <strong>Content ID:</strong> {selectedContent.contentId}
              </Typography>
              <Typography variant="body2">
                <strong>Language:</strong> {selectedContent.language}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContentManagement;
