// src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';
import { Snackbar, Alert } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (result.type === 'auth/loginUser/fulfilled') {
      setSnackbarMsg('Login successful! Redirecting to products...');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/products');
      }, 1200);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          <div>
            <input
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoFocus
              autoComplete="username"
            />
          </div>
          <div className="auth-input-wrapper">
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="auth-error">{error}</div>}
        </form>
        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
