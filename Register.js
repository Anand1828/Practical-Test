import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration is not implemented.');
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          <input
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoFocus
            autoComplete="username"
          />
          <div className="auth-input-wrapper">
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="new-password"
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
            Register
          </button>
          {error && <div className="auth-error">{error}</div>}
        </form>
       
      </div>
    </div>
  );
} 