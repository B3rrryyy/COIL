import { useState } from "react";
import { useNavigate } from "react-router-dom";


const COIL_COLORS = {
  darkBlue: "#2c3e6b",
  midBlue: "#3d5a80",
  accentBlue: "#1a56a4",
  lightBlue: "#e8eef7",
  white: "#ffffff",
  gray: "#6b7a8d",
  lightGray: "#f4f6fb",
  border: "#c9d4e8",
  error: "#c0392b",
  success: "#27ae60",
};

// ─── Iconos SVG inline ────────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Logo PUCE ────────────────────────────────────────────────────────────────
const LogoPUCE = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="27" stroke="#ffffff" strokeWidth="2"/>
    <circle cx="28" cy="28" r="20" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 2"/>
    <line x1="28" y1="1" x2="28" y2="55" stroke="#ffffff" strokeWidth="1.5"/>
    <line x1="1" y1="28" x2="55" y2="28" stroke="#ffffff" strokeWidth="1.5"/>
    <ellipse cx="28" cy="28" rx="12" ry="27" stroke="#ffffff" strokeWidth="1.5"/>
    <circle cx="28" cy="28" r="4" fill="#ffffff" opacity="0.9"/>
  </svg>
);

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: "",
    rol: "usuario",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rolOpen, setRolOpen] = useState(false);

  const roles = [
    { value: "usuario", label: "Usuario de Campo" },
    { value: "administrador", label: "Administrador" },
  ];

  const rolLabel = roles.find((r) => r.value === form.rol)?.label;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.correo || !form.password) {
    setError("Por favor completa todos los campos.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.correo,
      password: form.password,
    });

    if (error) throw error;

    navigate("/ficha");
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Source Sans 3', sans-serif;
          background: #f0f3fa;
        }

        /* Panel izquierdo institucional */
        .login-panel-left {
          width: 420px;
          flex-shrink: 0;
          background: linear-gradient(170deg, #1e2e5c 0%, #2c3e6b 45%, #3d5a80 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
        }

        .login-panel-left::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .login-panel-left::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }

        .panel-logo {
          margin-bottom: 28px;
          animation: fadeSlideDown 0.7s ease both;
        }

        .panel-university {
          color: #ffffff;
          text-align: center;
          animation: fadeSlideDown 0.8s 0.1s ease both;
        }

        .panel-university h1 {
          font-family: 'Merriweather', serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0.3px;
          margin-bottom: 6px;
        }

        .panel-university p {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          line-height: 1.5;
        }

        .panel-divider {
          width: 48px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          margin: 28px auto;
          animation: fadeSlideDown 0.8s 0.2s ease both;
        }

        .panel-system {
          text-align: center;
          color: rgba(255,255,255,0.85);
          animation: fadeSlideDown 0.8s 0.3s ease both;
        }

        .panel-system h2 {
          font-family: 'Merriweather', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .panel-system p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
        }

        .panel-badge {
          margin-top: 36px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 8px 18px;
          color: rgba(255,255,255,0.8);
          font-size: 12px;
          letter-spacing: 0.5px;
          animation: fadeSlideDown 0.8s 0.4s ease both;
        }

        /* Panel derecho — formulario */
        .login-panel-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: #f0f3fa;
          position: relative;
        }

        /* Decoración geométrica de fondo */
        .login-panel-right::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 320px; height: 320px;
          background: radial-gradient(circle at 80% 20%, rgba(61,90,128,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(44,62,107,0.10), 0 1px 4px rgba(44,62,107,0.06);
          padding: 44px 40px 40px;
          animation: fadeSlideUp 0.6s 0.2s ease both;
        }

        .card-header {
          margin-bottom: 32px;
        }

        .card-header h3 {
          font-family: 'Merriweather', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1e2e5c;
          margin-bottom: 6px;
        }

        .card-header p {
          font-size: 14px;
          color: #6b7a8d;
          line-height: 1.5;
        }

        /* Selector de rol */
        .rol-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #3d5a80;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          margin-bottom: 8px;
        }

        .rol-selector {
          position: relative;
          margin-bottom: 24px;
        }

        .rol-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border: 1.5px solid #c9d4e8;
          border-radius: 10px;
          background: #f4f6fb;
          cursor: pointer;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #2c3e6b;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .rol-trigger:hover, .rol-trigger:focus {
          border-color: #3d5a80;
          box-shadow: 0 0 0 3px rgba(61,90,128,0.10);
        }

        .rol-trigger .chevron {
          transition: transform 0.2s;
          color: #6b7a8d;
        }
        .rol-trigger.open .chevron { transform: rotate(180deg); }

        .rol-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: #ffffff;
          border: 1.5px solid #c9d4e8;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(44,62,107,0.12);
          overflow: hidden;
          z-index: 10;
          animation: dropIn 0.18s ease;
        }

        .rol-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          font-size: 14px;
          color: #2c3e6b;
          cursor: pointer;
          transition: background 0.15s;
        }

        .rol-option:hover { background: #e8eef7; }

        .rol-option.active {
          background: #e8eef7;
          font-weight: 600;
        }

        .rol-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #3d5a80;
          flex-shrink: 0;
        }

        /* Campos de texto */
        .field-group {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #3d5a80;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          margin-bottom: 8px;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8a9ab5;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .field-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 1.5px solid #c9d4e8;
          border-radius: 10px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          color: #1e2e5c;
          background: #f4f6fb;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .field-input::placeholder { color: #aab4c4; }

        .field-input:focus {
          border-color: #3d5a80;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(61,90,128,0.10);
        }

        .field-input.error-field {
          border-color: #c0392b;
          box-shadow: 0 0 0 3px rgba(192,57,43,0.08);
        }

        .field-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #8a9ab5;
          display: flex;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .field-eye:hover { color: #3d5a80; }

        /* Error */
        .error-msg {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fdf0ef;
          border: 1px solid #f5c6c2;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #c0392b;
          margin-bottom: 20px;
          animation: shake 0.4s ease;
        }

        /* Botón submit */
        .btn-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #2c3e6b 0%, #1a56a4 100%);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(44,62,107,0.25);
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(44,62,107,0.30);
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Footer card */
        .card-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 12px;
          color: #8a9ab5;
          border-top: 1px solid #e8eef7;
          padding-top: 20px;
          line-height: 1.6;
        }

        /* Animaciones */
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-6px); }
          75%       { transform: translateX(6px); }
        }

        /* Responsivo */
        @media (max-width: 768px) {
          .login-root { flex-direction: column; }
          .login-panel-left {
            width: 100%;
            padding: 36px 24px;
            min-height: auto;
          }
          .login-panel-left::before, .login-panel-left::after { display: none; }
          .login-card { padding: 32px 24px; }
        }
      `}</style>

      <div className="login-root">
        {/* ── Panel izquierdo ── */}
        <div className="login-panel-left">
          <div className="panel-logo">
            <LogoPUCE />
          </div>

          <div className="panel-university">
            <h1>Universidad Pontificia<br />Católica del Ecuador</h1>
            <p>Sede Santo Domingo</p>
          </div>

          <div className="panel-divider" />

          <div className="panel-system">
            <h2>Sistema COIL</h2>
            <p>Infraestructura Vial<br />Ingeniería Civil</p>
          </div>

          <div className="panel-badge">
            <IconShield />
            <span>Acceso Seguro Institucional</span>
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="login-panel-right">
          <div className="login-card">
            <div className="card-header">
              <h3>Iniciar Sesión</h3>
              <p>Ingresa tus credenciales institucionales para acceder al sistema.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* Selector de rol */}
              <div className="rol-selector">
                <label className="rol-label">Acceder como</label>
                <button
                  type="button"
                  className={`rol-trigger ${rolOpen ? "open" : ""}`}
                  onClick={() => setRolOpen(!rolOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={rolOpen}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <IconShield />
                    {rolLabel}
                  </span>
                  <span className="chevron"><IconChevron /></span>
                </button>

                {rolOpen && (
                  <div className="rol-dropdown" role="listbox">
                    {roles.map((r) => (
                      <div
                        key={r.value}
                        className={`rol-option ${form.rol === r.value ? "active" : ""}`}
                        role="option"
                        aria-selected={form.rol === r.value}
                        onClick={() => {
                          setForm({ ...form, rol: r.value });
                          setRolOpen(false);
                        }}
                      >
                        <span className="rol-dot" />
                        {r.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Correo */}
              <div className="field-group">
                <label className="field-label" htmlFor="correo">Correo institucional</label>
                <div className="field-wrap">
                  <span className="field-icon"><IconUser /></span>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    className={`field-input ${error ? "error-field" : ""}`}
                    placeholder="usuario@puce.edu.ec"
                    value={form.correo}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="field-group">
                <label className="field-label" htmlFor="password">Contraseña</label>
                <div className="field-wrap">
                  <span className="field-icon"><IconLock /></span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`field-input ${error ? "error-field" : ""}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="field-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="error-msg" role="alert">
                  <span>⚠</span>
                  {error}
                </div>
              )}

              {/* Botón */}
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" />
                    Verificando...
                  </>
                ) : (
                  "Ingresar al Sistema"
                )}
              </button>
            </form>

            <div className="card-footer">
              Sistema COIL · Carrera de Ingeniería Civil<br />
              PUCE — Sede Santo Domingo · {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
