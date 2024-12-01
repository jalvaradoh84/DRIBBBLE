import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/authFunctions";
import Logo from "../Logo/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!email || !password) {
        throw new Error("Por favor, completa todos los campos");
      }

      // Email format validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        throw new Error("Por favor, introduce un correo electrónico válido");
      }
      
      const result = await loginUser(email, password);
      
      if (result) {
        navigate('/');
      } else {
        throw new Error("Error al iniciar sesión. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <Logo className="mb-8 justify-center" />
          <h2 className="text-[24px] font-bold text-[#0d0c22] mb-2">Inicia sesión en RIBBBLE</h2>
          <p className="text-[#6e6d7a] text-[14px]">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" className="text-[#ea4c89] hover:text-[#f082ac]">
              Regístrate
            </Link>
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="nombre@email.com"
              required
              autoComplete="email"
              aria-label="Dirección de correo electrónico"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="6+ caracteres"
              required
              autoComplete="current-password"
              aria-label="Contraseña"
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-red-500 text-[14px] font-medium" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            aria-label={loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="mt-6 text-[12px] text-[#6e6d7a] text-center">
          Al iniciar sesión, aceptas nuestros{" "}
          <Link to="/terms" className="text-[#ea4c89] hover:text-[#f082ac]">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link to="/privacy" className="text-[#ea4c89] hover:text-[#f082ac]">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
