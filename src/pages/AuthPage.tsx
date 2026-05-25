import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { useToast } from "@/hooks/use-toast";
import { loginUser, registerUser } from "@/services/authService";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Limpia los campos del formulario cuando el usuario cambia
   * entre login y registro.
   */
  const resetForm = () => {
    setUsername("");
    setFullName("");
    setEmail("");
    setPassword("");
  };

  /**
   * Cambia entre modo login y modo registro manteniendo
   * el estilo visual de las pestañas originales.
   */
  const handleModeChange = (newMode: "login" | "register") => {
    setMode(newMode);
    resetForm();
  };

  /**
   * Envía el formulario al backend.
   *
   * En modo login llama a POST /api/auth/login.
   * En modo registro llama a POST /api/auth/register y después
   * hace login automático para guardar el token JWT.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (mode === "login") {
        await loginUser({
          email,
          password,
        });

        toast({
          title: "Sesión iniciada",
          description: "Has accedido correctamente a Aquinielator.",
        });
      } else {
        await registerUser({
          username,
          email,
          password,
          full_name: fullName,
        });

        await loginUser({
          email,
          password,
        });

        toast({
          title: "Cuenta creada",
          description: "Tu usuario se ha registrado correctamente.",
        });
      }

      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado.";

      toast({
        title: "Error de autenticación",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-display font-bold text-3xl">
            Quin<span className="text-primary">IA</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Plataforma de análisis y predicción futbolística
          </p>
        </div>

        <NeuCard glow="primary" className="p-8">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => handleModeChange("login")}
              className={
                mode === "login"
                  ? "neu-tab-active flex-1 py-2 rounded-lg text-sm font-display font-semibold"
                  : "neu-tab-inactive flex-1 py-2 rounded-lg text-sm font-display font-semibold"
              }
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              onClick={() => handleModeChange("register")}
              className={
                mode === "register"
                  ? "neu-tab-active flex-1 py-2 rounded-lg text-sm font-display font-semibold"
                  : "neu-tab-inactive flex-1 py-2 rounded-lg text-sm font-display font-semibold"
              }
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <NeuInput
                  label="Usuario"
                  id="username"
                  placeholder="samuel"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                />

                <NeuInput
                  label="Nombre"
                  id="fullName"
                  placeholder="Tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </>
            )}

            <NeuInput
              label="Email"
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <NeuInput
                label="Contraseña"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <div className="neu-inset w-4 h-4 rounded flex items-center justify-center">
                    <input type="checkbox" className="sr-only" />
                  </div>
                  Recordarme
                </label>

                <span className="text-primary cursor-pointer hover:underline">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            )}

            <NeuButton
              variant="primary"
              size="lg"
              className="w-full mt-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Procesando..."
                : mode === "login"
                  ? "Acceder"
                  : "Crear cuenta"}
            </NeuButton>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/dashboard"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Continuar como demo →
            </Link>
          </div>
        </NeuCard>
      </motion.div>
    </div>
  );
}