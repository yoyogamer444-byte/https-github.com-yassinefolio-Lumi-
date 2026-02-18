
import React, { useState } from 'react';
import { Language } from '../App';
import { CheckoutTask } from '../types';

interface CheckoutViewProps {
  lang: Language;
}

const translations = {
  fr: {
    title: "Départ",
    subtitle: "Quelques étapes finales avant de conclure votre séjour.",
    confirm: "Confirmer le départ",
    thanks: "Merci ! Veuillez laisser un avis sur Airbnb.",
    tasks: [
      'Retirer les draps et ranger le linge utilisé',
      'Débrancher la machine à café et les appareils',
      'Charger et lancer le lave-vaisselle',
      'Vérifier que les fenêtres et portes sont fermées'
    ]
  },
  en: {
    title: "Departure",
    subtitle: "A few final steps to conclude your stay with us.",
    confirm: "Confirm Checkout",
    thanks: "Thank you! Please leave a review on Airbnb.",
    tasks: [
      'Strip the beds and tidy used linens',
      'Unplug the coffee machine and appliances',
      'Load and start the dishwasher',
      'Ensure all windows and doors are locked'
    ]
  },
  es: {
    title: "Salida",
    subtitle: "Unos últimos pasos para concluir su estancia.",
    confirm: "Confirmar Salida",
    thanks: "¡Gracias! Por favor deje una reseña en Airbnb.",
    tasks: [
      'Quitar las sábanas y ordenar la ropa usada',
      'Desenchufar la cafetera y electrodomésticos',
      'Cargar y poner en marcha el lavavajillas',
      'Asegurar que todas las ventanas y puertas estén cerradas'
    ]
  }
};

export const CheckoutView: React.FC<CheckoutViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [tasks, setTasks] = useState<CheckoutTask[]>(
    t.tasks.map((label, idx) => ({ id: String(idx), label, completed: false }))
  );

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const allCompleted = tasks.every(t => t.completed);

  const handleConfirm = () => {
    alert(t.thanks);
    window.location.href = "https://www.airbnb.com";
  };

  return (
    <div className="space-y-8 animate-fade-in mt-4">
      <div className="space-y-2">
        <h1 className="text-4xl">{t.title}</h1>
        <p className="text-[#7C746E] text-sm">{t.subtitle}</p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="w-full bg-white p-6 rounded-[24px] flex items-center justify-between text-left custom-shadow transition-all active:scale-[0.98]"
          >
            <span className={`text-sm pr-4 ${task.completed ? 'text-[#B2A08E] line-through' : 'text-[#3C3633]'}`}>
              {task.label}
            </span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${task.completed ? 'bg-[#3C3633] border-[#3C3633]' : 'border-[#E8E4DE]'}`}>
              {task.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <button 
        disabled={!allCompleted}
        onClick={handleConfirm}
        className={`w-full py-5 rounded-[20px] text-[12px] tracking-widest uppercase font-bold transition-all ${
          allCompleted 
          ? 'bg-[#3C3633] text-white shadow-xl' 
          : 'bg-[#E0DDD8] text-[#B2A08E] cursor-not-allowed'
        }`}
      >
        {t.confirm}
      </button>
    </div>
  );
};
