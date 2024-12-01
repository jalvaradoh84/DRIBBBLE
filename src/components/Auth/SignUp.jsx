import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/authFunctions";
import Logo from "../Logo/Logo";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleEmailSignUp = async (e) => {
        console.log("Form submitted"); // Log form submission
        console.log("Attempting to register with:", email, password); // Log email and password
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!email || !password) {
        throw new Error("Por favor, completa todos los campos");
      }

      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      
      const result = await registerUser(email, password);
      
      console.log("Registration result:", result); // Log the result of the registration
      if (result.success) {
        navigate('/');
      } else {
        if (result.error.includes('Firebase no está inicializado')) {
          throw new Error('Error de conexión. Por favor, intenta de nuevo más tarde.');
        } else if (result.error.includes('already in use')) {
          throw new Error('Este correo ya está registrado. Por favor, inicia sesión.');
        } else {
          throw new Error(result.error);
        }
      }
    } catch (error) {
      setError(error.message || 'Error al crear la cuenta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <Logo className="mb-8 justify-center" />
          <h2 className="text-[24px] font-bold text-[#0d0c22] mb-2">Regístrate en RIBBBLE</h2>
          <p className="text-[#6e6d7a] text-[14px]">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[#ea4c89] hover:text-[#f082ac]">
              Inicia sesión
            </Link>
          </p>
        </div>

        <form onSubmit={(e) => { console.log("Form submitted"); handleEmailSignUp(e); }} className="space-y-4" noValidate>
          <input type="text" onChange={() => console.log("Input changed")} placeholder="Test Input" />
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
              autoComplete="new-password"
              aria-label="Contraseña (mínimo 6 caracteres)"
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
            aria-label={loading ? "Creando cuenta..." : "Crear Cuenta"}
          >
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="mt-6 text-[12px] text-[#6e6d7a] text-center">
          Al crear una cuenta, aceptas nuestros{" "}
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

export default SignUp;
