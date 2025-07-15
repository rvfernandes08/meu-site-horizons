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
    name: '',
    phone: '',
    address: '',
    problemType: '',
    description: '',
    urgency: 'normal'
  });
  const problemTypes = [{
    id: 'vazamento',
    label: 'Vazamento',
    icon: Droplets
  }, {
    id: 'entupimento',
    label: 'Entupimento',
    icon: AlertCircle
  }, {
    id: 'instalacao',
    label: 'Instalação',
    icon: Wrench
  }, {
    id: 'manutencao',
    label: 'Manutenção',
    icon: CheckCircle
  }];
  const urgencyLevels = [{
    id: 'baixa',
    label: 'Baixa',
    color: 'bg-green-500'
  }, {
    id: 'normal',
    label: 'Normal',
    color: 'bg-yellow-500'
  }, {
    id: 'alta',
    label: 'Alta',
    color: 'bg-orange-500'
  }, {
    id: 'emergencia',
    label: 'Emergência',
    color: 'bg-red-500'
  }];
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

    // Salvar no localStorage
    const requests = JSON.parse(localStorage.getItem('hydroRequests') || '[]');
    const newRequest = {
      id: Date.now(),
      ...formData,
      status: 'pendente',
      createdAt: new Date().toISOString(),
      estimatedTime: '2-4 horas'
    };
    requests.push(newRequest);
    localStorage.setItem('hydroRequests', JSON.stringify(requests));
    toast({
      title: "Solicitação enviada!",
      description: "Seu pedido foi registrado. Entraremos em contato em breve!"
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      address: '',
      problemType: '',
      description: '',
      urgency: 'normal'
    });
  };
  const renderHome = () => <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="water-animation h-full w-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full glass-effect floating">
                <Droplets className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">KM Reparos</h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Serviços Hidráulicos em Indaiatuba
            </p>
            
            <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
              Soluções rápidas e profissionais para todos os seus problemas hidráulicos. 
              Atendimento 24h com equipe especializada.
            </p>
            
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-8 py-4 pulse-glow" onClick={() => setActiveSection('solicitar')}>
                <Wrench className="mr-2 w-6 h-6" />
                Solicitar Reparo Agora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossos Serviços</h2>
            <p className="text-xl text-gray-600">Especialistas em soluções hidráulicas completas</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problemTypes.map((service, index) => <motion.div key={service.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} whileHover={{
            y: -10
          }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.label}</h3>
                  <p className="text-gray-600">Serviço profissional e garantido</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Por que escolher a KM Reparos?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Atendimento 24h</h3>
                    <p className="text-gray-600">Emergências hidráulicas não esperam. Estamos disponíveis a qualquer hora.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Profissionais Qualificados</h3>
                    <p className="text-gray-600">Equipe experiente e certificada para garantir o melhor serviço.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Cobertura Total em Indaiatuba</h3>
                    <p className="text-gray-600">Atendemos toda a cidade com rapidez e eficiência.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="relative">
              <img className="rounded-2xl shadow-2xl w-full h-96 object-cover" alt="Encanador profissional trabalhando" src="https://images.unsplash.com/photo-1676210134188-4c05dd172f89" />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Reparos Realizados</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
  const renderSolicitar = () => <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Solicitar Reparo</h1>
            <p className="text-xl text-gray-600">Preencha os dados abaixo e nossa equipe entrará em contato</p>
          </div>

          <Card className="p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Seu nome completo" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <Input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="(11) 99999-9999" className="w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço em Indaiatuba *
                </label>
                <Input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} placeholder="Rua, número, bairro" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Tipo de Problema *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {problemTypes.map(type => <motion.div key={type.id} whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.problemType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => handleInputChange('problemType', type.id)}>
                      <div className="flex items-center space-x-3">
                        <type.icon className="w-6 h-6 text-blue-600" />
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </motion.div>)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Nível de Urgência
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {urgencyLevels.map(level => <motion.div key={level.id} whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${formData.urgency === level.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`} onClick={() => handleInputChange('urgency', level.id)}>
                      <div className={`w-4 h-4 rounded-full ${level.color} mx-auto mb-2`}></div>
                      <span className="text-sm font-medium">{level.label}</span>
                    </motion.div>)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Problema
                </label>
                <Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="Descreva detalhadamente o problema hidráulico..." rows={4} className="w-full" />
              </div>

              <motion.div whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 text-lg">
                  <Wrench className="mr-2 w-5 h-5" />
                  Enviar Solicitação
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>;
  const renderMinhasSolicitacoes = () => {
    const requests = JSON.parse(localStorage.getItem('hydroRequests') || '[]');
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Minhas Solicitações</h1>
              <p className="text-xl text-gray-600">Acompanhe o status dos seus pedidos</p>
            </div>

            {requests.length === 0 ? <Card className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma solicitação encontrada</h3>
                <p className="text-gray-500 mb-6">Você ainda não fez nenhuma solicitação de reparo.</p>
                <Button onClick={() => setActiveSection('solicitar')}>
                  Fazer Primeira Solicitação
                </Button>
              </Card> : <div className="space-y-6">
                {requests.map(request => <motion.div key={request.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {problemTypes.find(p => p.id === request.problemType)?.label || request.problemType}
                          </h3>
                          <p className="text-gray-600">{request.address}</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{request.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(request.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      {request.description && <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{request.description}</p>
                        </div>}
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Tempo estimado: {request.estimatedTime}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => toast({
                    title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                  })}>
                          Ver Detalhes
                        </Button>
                      </div>
                    </Card>
                  </motion.div>)}
              </div>}
          </motion.div>
        </div>
      </div>;
  };
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div whileHover={{
            scale: 1.05
          }} className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">KM Reparos</span>
            </motion.div>
            
            <div className="flex space-x-6">
              <Button variant={activeSection === 'home' ? 'default' : 'ghost'} onClick={() => setActiveSection('home')}>
                Início
              </Button>
              <Button variant={activeSection === 'solicitar' ? 'default' : 'ghost'} onClick={() => setActiveSection('solicitar')}>
                Solicitar Reparo
              </Button>
              <Button variant={activeSection === 'solicitacoes' ? 'default' : 'ghost'} onClick={() => setActiveSection('solicitacoes')}>
                Minhas Solicitações
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {activeSection === 'home' && renderHome()}
      {activeSection === 'solicitar' && renderSolicitar()}
      {activeSection === 'solicitacoes' && renderMinhasSolicitacoes()}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">KM Reparos</span>
              </div>
              <p className="text-gray-300">
                Soluções hidráulicas profissionais em Indaiatuba. 
                Atendimento 24h para emergências.
              </p>
            </div>
            
            <div>
              <span className="text-lg font-semibold mb-4 block">Contato</span>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(11) 98660-9516</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Indaiatuba, SP</span>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-lg font-semibold mb-4 block">Serviços</span>
              <div className="space-y-2 text-gray-300">
                <p>• Vazamentos</p>
                <p>• Entupimentos</p>
                <p>• Instalações</p>
                <p>• Manutenção</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 KM Reparos Indaiatuba. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>;
    import Contato from "./components/Contato";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Contato />
    </div>
  );
}
export default App;
