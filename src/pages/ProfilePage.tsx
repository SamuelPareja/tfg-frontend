import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { FormResult } from "@/components/ui/FormResult";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-display font-bold">Perfil</h1>

        <NeuCard className="p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-2xl font-display font-bold text-primary">U</div>
            <div>
              <div className="font-display font-bold text-lg">Usuario Demo</div>
              <div className="text-sm text-muted-foreground">demo@quinia.com</div>
              <NeuBadge variant="info" className="mt-1">Plan Pro</NeuBadge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <NeuInput label="Nombre" defaultValue="Usuario Demo" id="profile-name" />
            <NeuInput label="Email" defaultValue="demo@quinia.com" id="profile-email" type="email" />
          </div>
        </NeuCard>

        <NeuCard className="p-6 space-y-4">
          <h3 className="font-display font-semibold">Preferencias</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">Perfil de riesgo</div>
              <div className="flex gap-2">
                {['Conservador', 'Equilibrado', 'Agresivo'].map((r, i) => (
                  <button key={r} className={i === 1 ? 'neu-tab-active flex-1 py-2 rounded-lg text-xs font-display font-semibold' : 'neu-tab-inactive flex-1 py-2 rounded-lg text-xs font-display font-semibold'}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-wider">Equipos favoritos</div>
              <div className="flex gap-2 flex-wrap">
                {['⚪ RMA', '🔵🔴 FCB', '🔴⚪ ATM', '🔵⚪ RSO'].map(t => (
                  <span key={t} className="neu-inset px-3 py-1.5 rounded-lg text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </NeuCard>

        <NeuCard className="p-6 space-y-4">
          <h3 className="font-display font-semibold">Historial de quinielas</h3>
          <div className="space-y-2">
            {[
              { name: 'Quiniela Segura J30', hits: 11, status: 'active' },
              { name: 'Quiniela Valor J30', hits: 9, status: 'active' },
              { name: 'Quiniela Equilibrada J29', hits: 10, status: 'completed' },
            ].map(q => (
              <div key={q.name} className="neu-inset p-3 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.hits} aciertos</div>
                </div>
                <NeuBadge variant={q.status === 'active' ? 'info' : 'success'}>
                  {q.status === 'active' ? 'Activa' : 'Completada'}
                </NeuBadge>
              </div>
            ))}
          </div>
        </NeuCard>

        <NeuButton variant="primary" size="lg">Guardar cambios</NeuButton>
      </div>
    </AppLayout>
  );
}
