import React, { useEffect, useState } from 'react';
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
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { fetchContentList } from '../../store/slices/contentSlice';

const ContentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.content);
  const { user } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.ui);

  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    dispatch(fetchContentList({ language, type, search }));
  }, [dispatch, language, type, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchContentList({ language, type, search }));
  };

  const canCreateContent = user?.role === 'PANDIT' || user?.role === 'ADMIN';

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">{t('nav.content')}</Typography>
        {canCreateContent && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/content/create')}
          >
            {t('common.create')}
          </Button>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                label={t('content.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: <Search />,
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="chalisa">{t('content.chalisa')}</MenuItem>
                <MenuItem value="aarti">{t('content.aarti')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {list.map((content) => (
            <Grid item xs={12} sm={6} md={4} key={content._id}>
              <Card>
                <CardContent>
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
                  <Button size="small" onClick={() => navigate(`/content/${content._id}`)}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentList;
