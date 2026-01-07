import { useState, type FormEvent } from 'react';
import { useStore } from '@nanostores/react';
import { login, authErrorStore, clearAuthError } from '~/lib/stores/auth';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const error = useStore(authErrorStore);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearAuthError();

    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    login(email, password);
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {/* Animated background elements */}
      <div className="login-bg-grid" />
      <div className="login-bg-scanlines" />
      <div className="login-bg-glow" />

      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{ '--delay': `${i * 0.5}s`, '--x': `${Math.random() * 100}%` } as React.CSSProperties} />
        ))}
      </div>

      {/* Main login card */}
      <div className="login-card">
        {/* Corner accents */}
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />

        {/* Header */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-ring outer" />
            <div className="logo-ring middle" />
            <div className="logo-ring inner" />
            <div className="logo-core">
              <span className="logo-text">B</span>
            </div>
          </div>
          <h1 className="login-title">BRAINIAC</h1>
          <p className="login-subtitle">SECURE ACCESS PORTAL</p>
          <div className="status-line">
            <span className="status-dot" />
            <span className="status-text">SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">◈</span>
              EMAIL ADDRESS
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="login-input"
                required
                autoComplete="email"
              />
              <div className="input-glow" />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">◈</span>
              PASSWORD
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="login-input"
                required
                autoComplete="current-password"
              />
              <div className="input-glow" />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            <span className="button-bg" />
            <span className="button-text">
              {isLoading ? (
                <>
                  <span className="loading-spinner" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <span className="button-icon">▶</span>
                  INITIALIZE ACCESS
                </>
              )}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <div className="footer-line" />
          <p className="footer-text">AUTHORIZED PERSONNEL ONLY</p>
        </div>
      </div>

      <style>{`
        .login-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000408;
          overflow: hidden;
          font-family: 'Rajdhani', 'Orbitron', sans-serif;
        }

        /* Background effects */
        .login-bg-grid {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPulse 4s ease-in-out infinite;
        }

        .login-bg-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 212, 255, 0.02) 2px,
            rgba(0, 212, 255, 0.02) 4px
          );
          pointer-events: none;
        }

        .login-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
        }

        /* Particles */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--jarvis-cyan);
          border-radius: 50%;
          left: var(--x);
          bottom: -10px;
          opacity: 0;
          animation: particleFloat 8s linear infinite;
          animation-delay: var(--delay);
          box-shadow: 0 0 6px var(--jarvis-cyan);
        }

        /* Login card */
        .login-card {
          position: relative;
          width: 420px;
          padding: 40px;
          background: rgba(0, 20, 40, 0.9);
          border: 1px solid rgba(0, 212, 255, 0.3);
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 40px rgba(0, 212, 255, 0.1),
            inset 0 0 60px rgba(0, 212, 255, 0.03);
        }

        /* Corner accents */
        .corner-accent {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: var(--jarvis-cyan);
          border-style: solid;
        }

        .corner-accent.top-left {
          top: -1px;
          left: -1px;
          border-width: 2px 0 0 2px;
        }

        .corner-accent.top-right {
          top: -1px;
          right: -1px;
          border-width: 2px 2px 0 0;
        }

        .corner-accent.bottom-left {
          bottom: -1px;
          left: -1px;
          border-width: 0 0 2px 2px;
        }

        .corner-accent.bottom-right {
          bottom: -1px;
          right: -1px;
          border-width: 0 2px 2px 0;
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
        }

        .logo-ring {
          position: absolute;
          border: 1px solid var(--jarvis-cyan);
          border-radius: 50%;
          animation: ringRotate 10s linear infinite;
        }

        .logo-ring.outer {
          inset: 0;
          border-style: dashed;
          opacity: 0.5;
        }

        .logo-ring.middle {
          inset: 10px;
          animation-direction: reverse;
          animation-duration: 8s;
        }

        .logo-ring.inner {
          inset: 20px;
          animation-duration: 6s;
        }

        .logo-core {
          position: absolute;
          inset: 25px;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 119, 255, 0.2));
          border: 2px solid var(--jarvis-cyan);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 0 20px rgba(0, 212, 255, 0.5),
            inset 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .logo-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--jarvis-cyan);
          text-shadow: 0 0 10px var(--jarvis-cyan);
        }

        .login-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--jarvis-cyan);
          letter-spacing: 8px;
          margin: 0;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .login-subtitle {
          font-size: 12px;
          color: rgba(0, 212, 255, 0.6);
          letter-spacing: 4px;
          margin: 8px 0 0;
        }

        .status-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--jarvis-green-ok);
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px var(--jarvis-green-ok);
        }

        .status-text {
          font-size: 10px;
          color: var(--jarvis-green-ok);
          letter-spacing: 2px;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: rgba(0, 212, 255, 0.7);
          letter-spacing: 2px;
        }

        .label-icon {
          color: var(--jarvis-cyan);
          font-size: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .login-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0, 30, 50, 0.8);
          border: 1px solid rgba(0, 212, 255, 0.2);
          color: var(--jarvis-cyan);
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .login-input::placeholder {
          color: rgba(0, 212, 255, 0.3);
        }

        .login-input:focus {
          border-color: var(--jarvis-cyan);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .input-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
          transition: opacity 0.3s ease;
        }

        .login-input:focus + .input-glow {
          opacity: 1;
          animation: inputGlow 2s linear infinite;
        }

        /* Error message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(255, 51, 68, 0.1);
          border: 1px solid rgba(255, 51, 68, 0.3);
          color: var(--jarvis-red-alert);
          font-size: 13px;
          animation: errorShake 0.5s ease;
        }

        .error-icon {
          font-size: 16px;
        }

        /* Login button */
        .login-button {
          position: relative;
          padding: 16px 32px;
          background: transparent;
          border: 1px solid var(--jarvis-cyan);
          color: var(--jarvis-cyan);
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .login-button:hover:not(:disabled) {
          background: rgba(0, 212, 255, 0.1);
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
          transform: translateY(-2px);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .button-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .login-button:hover:not(:disabled) .button-bg {
          transform: translateX(100%);
        }

        .button-text {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .button-icon {
          font-size: 10px;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 212, 255, 0.3);
          border-top-color: var(--jarvis-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Footer */
        .login-footer {
          margin-top: 32px;
          text-align: center;
        }

        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
          margin-bottom: 16px;
        }

        .footer-text {
          font-size: 10px;
          color: rgba(0, 212, 255, 0.4);
          letter-spacing: 3px;
          margin: 0;
        }

        /* Animations */
        @keyframes gridPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        @keyframes inputGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-card {
            width: 90%;
            padding: 30px 24px;
          }

          .login-title {
            font-size: 22px;
            letter-spacing: 4px;
          }
        }
      `}</style>
    </div>
  );
}

