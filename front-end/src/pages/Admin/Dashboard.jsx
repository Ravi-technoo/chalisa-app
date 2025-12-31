import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  const dashboardCards = [
    {
      title: 'Manage Users',
      description: 'View and manage all registered users, assign roles',
      icon: <PeopleIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      action: 'View Users',
      path: '/admin/users',
      color: '#e3f2fd',
    },
    {
      title: 'Manage Content',
      description: 'View, edit and delete all devotional content',
      icon: <LibraryBooksIcon sx={{ fontSize: 60, color: '#388e3c' }} />,
      action: 'View Content',
      path: '/admin/content',
      color: '#e8f5e9',
    },
    {
      title: 'Create Content',
      description: 'Add new devotional content in multiple languages',
      icon: <AddCircleIcon sx={{ fontSize: 60, color: '#f57c00' }} />,
      action: 'Create New',
      path: '/content/create',
      color: '#fff3e0',
    },
    {
      title: 'Analytics',
      description: 'View user statistics and content performance',
      icon: <BarChartIcon sx={{ fontSize: 60, color: '#7b1fa2' }} />,
      action: 'View Stats',
      path: '/admin/analytics',
      color: '#f3e5f5',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Welcome back, {user?.name || 'Admin'}! Manage your devotional content platform.
        </Typography>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  sx={{
                    backgroundColor: card.color,
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(card.path)}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {card.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Quick Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Content
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                -
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Premium Users
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
          Navigate to Analytics for detailed statistics
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
