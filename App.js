import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { Button, Stack } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import './Auth.css';
import ProductList from './pages/ProductList';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome! You're logged in.</h1>
      <button onClick={handleLogout} className="auth-button" style={{ marginTop: 16 }}>Logout</button>
    </div>
  );
}

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <ErrorBoundary>
      <Router>
        <nav className="main-navbar">
          <Link to="/" className="nav-title">MyApp</Link>
          <div className="nav-btns">
            {user && <Link to="/products" className="nav-btn">Products</Link>}
            {!user && <>
              <Button variant="contained" color="primary" component={Link} to="/login" sx={{ ml: 1 }}>
                Login
              </Button>
              <Link to="/register" className="nav-btn">Register</Link>
            </>}
            {user && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginRight: 2 }}>
                <span style={{ color: '#fff', fontWeight: 500 }}>Logged in as {user.username}</span>
                <Button variant="contained" color="secondary" size="small" onClick={() => {
                  dispatch(logout());
                  window.location.href = '/login';
                }}>
                  Logout
                </Button>
              </Stack>
            )}
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<RequireAuth><ProductList /></RequireAuth>} />
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
