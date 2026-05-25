import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display font-bold text-3xl">Quin<span className="text-primary">IA</span></Link>
          <p className="text-sm text-muted-foreground mt-2">Plataforma de análisis y predicción futbolística</p>
        </div>

        <NeuCard glow="primary" className="p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode('login')} className={mode === 'login' ? 'neu-tab-active flex-1 py-2 rounded-lg text-sm font-display font-semibold' : 'neu-tab-inactive flex-1 py-2 rounded-lg text-sm font-display font-semibold'}>
              Iniciar sesión
            </button>
            <button onClick={() => setMode('register')} className={mode === 'register' ? 'neu-tab-active flex-1 py-2 rounded-lg text-sm font-display font-semibold' : 'neu-tab-inactive flex-1 py-2 rounded-lg text-sm font-display font-semibold'}>
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <NeuInput label="Nombre" id="name" placeholder="Tu nombre" />
            )}
            <NeuInput label="Email" id="email" type="email" placeholder="tu@email.com" />
            <div className="relative">
              <NeuInput label="Contraseña" id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <div className="neu-inset w-4 h-4 rounded flex items-center justify-center">
                    <input type="checkbox" className="sr-only" />
                  </div>
                  Recordarme
                </label>
                <span className="text-primary cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
              </div>
            )}

            <NeuButton variant="primary" size="lg" className="w-full mt-2" type="submit">
              {mode === 'login' ? 'Acceder' : 'Crear cuenta'}
            </NeuButton>
          </form>

          <div className="mt-6 text-center">
            <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Continuar como demo →
            </Link>
          </div>
        </NeuCard>
      </motion.div>
    </div>
  );
}
