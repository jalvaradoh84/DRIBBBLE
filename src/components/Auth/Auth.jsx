import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../../utils/firebaseAuth";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError("");
      const result = await signInWithGoogle();
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setEmailLoading(true);
    
    try {
      const result = isRegistering 
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <img 
            src="https://cdn.dribbble.com/assets/logo-bw-0200c7483844c355752e89519359c4e4af960601071c90cf81d66ce8a786d6b8.svg" 
            alt="Dribbble" 
            className="w-[76px] h-[30px] mx-auto mb-6"
          />
          <h2 className="text-[24px] font-bold text-[#0d0c22] mb-2">
            {isRegistering ? "Sign up to Dribbble" : "Sign in to Dribbble"}
          </h2>
          <p className="text-[#6e6d7a] text-[14px]">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <button 
                  onClick={() => setIsRegistering(false)}
                  className="text-[#ea4c89] hover:text-[#f082ac]"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button 
                  onClick={() => setIsRegistering(true)}
                  className="text-[#ea4c89] hover:text-[#f082ac]"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading || emailLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#e7e7e9] rounded-lg text-[14px] font-medium text-[#0d0c22] hover:border-[#0d0c22] transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img 
            src="https://cdn.dribbble.com/assets/google-icon-c5834b32d98d1c9be155ddf5aec22b5c0884178d0805c1b5437813005037b1c5.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          {loading ? "Signing in..." : `Sign ${isRegistering ? 'up' : 'in'} with Google`}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e7e7e9]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-[14px] text-[#6e6d7a]">
              Or sign {isRegistering ? 'up' : 'in'} with email
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-[14px] font-medium text-[#0d0c22] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7e7e9] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ea4c89] focus:ring-opacity-50"
              placeholder="name@email.com"
              disabled={loading || emailLoading}
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#0d0c22] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#e7e7e9] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ea4c89] focus:ring-opacity-50"
              placeholder={isRegistering ? "6+ characters" : "Enter password"}
              disabled={loading || emailLoading}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-[14px]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || emailLoading}
            className="w-full px-4 py-3 bg-[#ea4c89] hover:bg-[#f082ac] text-white text-[14px] font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailLoading 
              ? (isRegistering ? "Creating account..." : "Signing in...") 
              : (isRegistering ? "Create Account" : "Sign In")
            }
          </button>
        </form>

        {!isRegistering && (
          <div className="mt-6 text-center">
            <button 
              className="text-[14px] text-[#ea4c89] hover:text-[#f082ac]"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </button>
          </div>
        )}

        {isRegistering && (
          <p className="mt-6 text-[12px] text-[#6e6d7a] text-center">
            By creating an account you agree to our{" "}
            <button 
              onClick={() => navigate('/terms')}
              className="text-[#ea4c89] hover:text-[#f082ac]"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => navigate('/privacy')}
              className="text-[#ea4c89] hover:text-[#f082ac]"
            >
              Privacy Policy
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
