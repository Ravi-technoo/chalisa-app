import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

import Login from './pages/Auth/Login';
import Home from './pages/Home';
import ContentList from './pages/Content/ContentList';
import ContentDetail from './pages/Content/ContentDetail';
import ContentCreate from './pages/Content/ContentCreate';
import ContentViewer from './pages/ContentViewer';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import AdminDashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import ContentManagement from './pages/Admin/ContentManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b35',
    },
    secondary: {
      main: '#f7931e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="devotional/:contentId" element={<ContentViewer />} />
          <Route path="content" element={<ContentList />} />
          <Route path="content/create" element={<ContentCreate />} />
          <Route path="content/:id" element={<ContentDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment" element={<Payment />} />

          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/content" element={<ContentManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
