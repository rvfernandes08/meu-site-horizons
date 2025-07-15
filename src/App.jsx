// App.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, Droplets, Phone, MapPin, Clock, Star, CheckCircle,
  AlertCircle, User, Calendar, MessageSquare
} from 'lucide-react';
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

  const renderHome = () => <section className="py-20 text-center bg-blue-50">
    <h1 className="text-4xl font-bold text-blue-700 mb-4">KM Reparos</h1>
    <p className="text-lg text-blue-600 mb-6">Soluções hidráulicas em Indaiatuba com atendimento rápido</p>
    <Button onClick={() => setActiveSection('solicitar')}>Solicitar Reparo</Button>
  </section>;

  const renderSolicitar = () => <section className="py-20 px-4 bg-white max-w-xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Formulário de Solicitação</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Nome completo" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
      <Input placeholder="Telefone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} required />
      <Input placeholder="Endereço" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} required />
      <Textarea placeholder="Descrição do problema" value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={4} />
      <Button type="submit">Enviar via WhatsApp</Button>
    </form>
  </section>;

  const renderMinhasSolicitacoes = () => <section className="py-20 text-center">
    <h2 className="text-2xl font-bold text-gray-700">Funcionalidade em desenvolvimento</h2>
    <p className="text-gray-500">Em breve você poderá acompanhar suas solicitações por aqui.</p>
  </section>;

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow py-4 px-6 flex justify-between">
        <span className="font-bold text-xl text-blue-700 cursor-pointer" onClick={() => setActiveSection('home')}>KM Reparos</span>
        <div className="space-x-4">
          <Button variant={activeSection === 'home' ? 'default' : 'ghost'} onClick={() => setActiveSection('home')}>Início</Button>
          <Button variant={activeSection === 'solicitar' ? 'default' : 'ghost'} onClick={() => setActiveSection('solicitar')}>Solicitar</Button>
          <Button variant={activeSection === 'solicitacoes' ? 'default' : 'ghost'} onClick={() => setActiveSection('solicitacoes')}>Minhas Solicitações</Button>
        </div>
      </nav>

      {activeSection === 'home' && renderHome()}
      {activeSection === 'solicitar' && renderSolicitar()}
      {activeSection === 'solicitacoes' && renderMinhasSolicitacoes()}

      <footer className="bg-gray-800 text-white text-center py-6 mt-20">
        <p className="text-sm">&copy; 2024 KM Reparos - Indaiatuba</p>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;

