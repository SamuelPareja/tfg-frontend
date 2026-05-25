import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuCard } from "@/components/ui/NeuCard";
import { BarChart3, Brain, Target, Shield, Zap, TrendingUp, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "Motor Analítico IA", desc: "Algoritmos avanzados que procesan miles de variables para generar predicciones precisas." },
  { icon: Target, title: "Constructor de Quinielas", desc: "Herramienta interactiva para crear quinielas optimizadas con recomendaciones inteligentes." },
  { icon: BarChart3, title: "Estadísticas Profundas", desc: "Datos exhaustivos de equipos, ligas y tendencias para decisiones informadas." },
  { icon: Shield, title: "Cartera Diversificada", desc: "Optimiza 10 quinielas simultáneas con perfiles de riesgo personalizados." },
];

const benefits = [
  { value: "73.4%", label: "Precisión estimada" },
  { value: "1,247", label: "Partidos analizados" },
  { value: "34", label: "Picks de valor activos" },
  { value: "10x", label: "Cobertura de cartera" },
];

const steps = [
  { num: "01", title: "Analiza", desc: "Explora predicciones y estadísticas detalladas de cada partido." },
  { num: "02", title: "Decide", desc: "Usa las señales de valor y la confianza del modelo para elegir." },
  { num: "03", title: "Construye", desc: "Crea tu quiniela con el constructor inteligente." },
  { num: "04", title: "Optimiza", desc: "Genera una cartera de 10 quinielas diversificadas." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl">Quin<span className="text-primary">IA</span></span>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <NeuButton variant="ghost" size="sm">Iniciar sesión</NeuButton>
            </Link>
            <Link to="/auth">
              <NeuButton variant="primary" size="sm">Comenzar</NeuButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Predicción futbolística<br />
              <span className="text-gradient-primary">impulsada por IA</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Combina análisis estadístico avanzado, señales de valor y construcción inteligente de quinielas en una plataforma diseñada para la precisión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <NeuButton variant="primary" size="lg" className="w-full sm:w-auto">
                  Explorar plataforma <ArrowRight className="inline w-4 h-4 ml-2" />
                </NeuButton>
              </Link>
              <Link to="/dashboard">
                <NeuButton size="lg" className="w-full sm:w-auto text-foreground">Ver demo</NeuButton>
              </Link>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {benefits.map((b) => (
              <NeuCard key={b.label} className="text-center p-4">
                <div className="text-2xl md:text-3xl font-display font-bold text-gradient-primary">{b.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{b.label}</div>
              </NeuCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Funcionalidades principales</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Herramientas profesionales para maximizar tu estrategia en quinielas.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <NeuCard className="h-full hover:glow-primary transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </NeuCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 md:px-8 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <NeuCard variant="small" className="text-center p-6">
                  <div className="text-3xl font-display font-bold text-primary/30 mb-3">{s.num}</div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </NeuCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Panel de control premium</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">Una experiencia visual diseñada para la toma de decisiones inteligentes.</p>
          <NeuCard className="p-8 relative overflow-hidden">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: Zap, label: "Señales activas", val: "12" },
                { icon: TrendingUp, label: "Precisión", val: "73.4%" },
                { icon: Target, label: "Quinielas", val: "156" },
              ].map((m) => (
                <div key={m.label} className="neu-inset p-4 rounded-lg text-center">
                  <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-xl font-display font-bold text-foreground">{m.val}</div>
                  <div className="text-[10px] text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((n) => (
                <div key={n} className="neu-inset p-4 rounded-lg h-24 flex items-center justify-center text-xs text-muted-foreground">
                  Vista previa de gráfico
                </div>
              ))}
            </div>
          </NeuCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-lg">Quin<span className="text-primary">IA</span></span>
          <p className="text-xs text-muted-foreground">© 2026 QuinIA. Análisis inteligente para quinielas.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Términos</span>
            <span className="hover:text-foreground cursor-pointer">Privacidad</span>
            <span className="hover:text-foreground cursor-pointer">Contacto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
