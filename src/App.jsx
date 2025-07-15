// App.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Droplets, Phone, MapPin, Clock, Star, CheckCircle, AlertCircle, User, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', problemType: '', description: '', urgency: 'normal'
  });

  const problemTypes = [
    { id: 'vazamento', label: 'Vazamento', icon: Droplets },
    { id: 'entupimento', label: 'Entupimento', icon: AlertCircle },
    { id: 'instalacao', label: 'Instalação', icon: Wrench },
    { id: 'manutencao', label: 'Manutenção', icon: CheckCircle },
  ];

  const urgencyLevels = [
    { id: 'baixa', label: 'Baixa', color: 'bg-green-500' },
    { id: 'normal', label: 'Normal', color: 'bg-yellow-500' },
    { id: 'alta', label: 'Alta', color: 'bg-orange-500' },
    { id: 'emergencia', label: 'Emergência', color: 'bg-red-500' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.problemType) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const mensagem = `🛠️ *Solicitação de Reparo Hidráulico*

👤 Nome: ${formData.name}
📞 Telefone: ${formData.phone}
📍 Endereço: ${formData.address}
🔧 Tipo de Problema: ${formData.problemType}
⚠️ Urgência: ${formData.urgency}
📝 Descrição: ${formData.description}`;

    const url = `https://wa.me/5511986609516?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  // o restante do seu App (renderHome, renderSolicitar, renderMinhasSolicitacoes, return, etc.) permanece igual
  // apenas a lógica de envio foi substituída por redirecionamento ao WhatsApp

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      {/* ... nav completo */}

      {/* Content */}
      {activeSection === 'home' && renderHome()}
      {activeSection === 'solicitar' && renderSolicitar()}
      {activeSection === 'solicitacoes' && renderMinhasSolicitacoes()}

      {/* Footer */}
      {/* ... footer completo */}

      <Toaster />
    </div>
  );
}

export default App;

