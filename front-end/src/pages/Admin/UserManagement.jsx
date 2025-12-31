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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import api from '../../services/api';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser({ ...user });
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/admin/users/${selectedUser.id}`, {
        role: selectedUser.role,
        isUnlocked: selectedUser.isUnlocked,
      });
      toast.success('User updated successfully');
      setEditDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update user');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'error';
      case 'PANDIT':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN':
        return '👑';
      case 'PANDIT':
        return '📿';
      default:
        return '👤';
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.phone?.includes(searchTerm) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          User Management
        </Typography>
      </Box>

      {/* Search and Stats */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search by phone, name, or role"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 250 }}
          />
          <Button variant="outlined" onClick={fetchUsers}>
            Refresh
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip label={`Total: ${users.length}`} color="primary" />
          <Chip label={`Admins: ${users.filter((u) => u.role === 'ADMIN').length}`} color="error" />
          <Chip label={`Pandits: ${users.filter((u) => u.role === 'PANDIT').length}`} color="warning" />
          <Chip label={`Users: ${users.filter((u) => u.role === 'USER').length}`} />
          <Chip label={`Premium: ${users.filter((u) => u.isUnlocked).length}`} color="success" />
        </Box>
      </Paper>

      {/* Users Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Language</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Premium</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Joined</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{getRoleIcon(user.role)}</Typography>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {user.name || '(No name)'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.id.substring(0, 8)}...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip label={user.role} color={getRoleColor(user.role)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.languagePref === 'hi' ? 'हिं' : 'EN'} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {user.isUnlocked ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="disabled" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(user)}
                      disabled={user.id === currentUser.id}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Editing user: <strong>{selectedUser.name || selectedUser.phone}</strong>
              </Alert>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedUser.role}
                  label="Role"
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <MenuItem value="USER">👤 USER - Regular user</MenuItem>
                  <MenuItem value="PANDIT">📿 PANDIT - Content creator</MenuItem>
                  <MenuItem value="ADMIN">👑 ADMIN - Full access</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Premium Status</InputLabel>
                <Select
                  value={selectedUser.isUnlocked}
                  label="Premium Status"
                  onChange={(e) => setSelectedUser({ ...selectedUser, isUnlocked: e.target.value })}
                >
                  <MenuItem value={false}>❌ Free User</MenuItem>
                  <MenuItem value={true}>✅ Premium User</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
