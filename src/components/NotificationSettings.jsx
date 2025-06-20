'use client';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Switch, 
  Heading,
  Select,
  Button,
  Textarea,
  Input,
  Badge
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    examResults: true,
    medicationAlerts: true,
    emergencyAlerts: true,
    reminderTiming: "24", // horas antes
    preferredChannel: "email"
  });

  const [customMessage, setCustomMessage] = useState({
    type: "appointment",
    message: "",
    scheduling: "immediate"
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Aqui você salvaria as configurações no backend
    toaster.create({
      title: "Configurações salvas",
      description: "Suas preferências de notificação foram atualizadas.",
    });
  };

  const sendTestNotification = () => {
    toaster.create({
      title: "Notificação de teste enviada",
      description: "Verifique seus canais configurados.",
    });
  };

  const scheduleCustomMessage = () => {
    if (!customMessage.message.trim()) {
      toaster.create({
        title: "Erro",
        description: "Digite uma mensagem antes de agendar.",
      });
      return;
    }

    toaster.create({
      title: "Mensagem agendada",
      description: `Mensagem de ${customMessage.type} foi agendada com sucesso.`,
    });
    
    setCustomMessage({
      type: "appointment",
      message: "",
      scheduling: "immediate"
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" color="white">
        Configurações de Notificações
      </Heading>

      {/* Canais de Notificação */}
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        borderRadius="xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="teal.300">
            Canais de Comunicação
          </Heading>
          
          <HStack justify="space-between">
            <Text color="white">Notificações por E-mail</Text>
            <Switch
              isChecked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>
          
          <HStack justify="space-between">
            <Text color="white">Notificações por SMS</Text>
            <Switch
              isChecked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>
          
          <HStack justify="space-between">
            <Text color="white">Notificações Push (App)</Text>
            <Switch
              isChecked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>

          <Box h="1px" bg="rgba(255, 255, 255, 0.1)" w="100%" my={2} />

          <Box>
            <Text color="gray.300" mb={2}>Canal Preferencial</Text>
            <Select
              value={settings.preferredChannel}
              onChange={(e) => handleSettingChange('preferredChannel', e.target.value)}
              bg="rgba(255, 255, 255, 0.1)"
              borderColor="rgba(255, 255, 255, 0.2)"
              color="white"
            >
              <option value="email" style={{background: '#2D3748'}}>E-mail</option>
              <option value="sms" style={{background: '#2D3748'}}>SMS</option>
              <option value="push" style={{background: '#2D3748'}}>Push Notification</option>
            </Select>
          </Box>
        </VStack>
      </Box>

      {/* Tipos de Notificação */}
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        borderRadius="xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="teal.300">
            Tipos de Notificação
          </Heading>
          
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text color="white">Lembretes de Consulta</Text>
              <Text color="gray.400" fontSize="xs">Receba lembretes antes das consultas</Text>
            </VStack>
            <Switch
              isChecked={settings.appointmentReminders}
              onChange={(e) => handleSettingChange('appointmentReminders', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>
          
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text color="white">Resultados de Exames</Text>
              <Text color="gray.400" fontSize="xs">Seja notificado quando resultados estiverem prontos</Text>
            </VStack>
            <Switch
              isChecked={settings.examResults}
              onChange={(e) => handleSettingChange('examResults', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>
          
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text color="white">Alertas de Medicação</Text>
              <Text color="gray.400" fontSize="xs">Lembretes para tomar medicamentos</Text>
            </VStack>
            <Switch
              isChecked={settings.medicationAlerts}
              onChange={(e) => handleSettingChange('medicationAlerts', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>
          
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text color="white">Alertas de Emergência</Text>
              <Text color="gray.400" fontSize="xs">Informações sobre lotação e direcionamento</Text>
            </VStack>
            <Switch
              isChecked={settings.emergencyAlerts}
              onChange={(e) => handleSettingChange('emergencyAlerts', e.target.checked)}
              colorScheme="teal"
            />
          </HStack>

          <Box h="1px" bg="rgba(255, 255, 255, 0.1)" w="100%" my={2} />

          <Box>
            <Text color="gray.300" mb={2}>Antecedência dos Lembretes</Text>
            <Select
              value={settings.reminderTiming}
              onChange={(e) => handleSettingChange('reminderTiming', e.target.value)}
              bg="rgba(255, 255, 255, 0.1)"
              borderColor="rgba(255, 255, 255, 0.2)"
              color="white"
            >
              <option value="1" style={{background: '#2D3748'}}>1 hora antes</option>
              <option value="6" style={{background: '#2D3748'}}>6 horas antes</option>
              <option value="24" style={{background: '#2D3748'}}>1 dia antes</option>
              <option value="48" style={{background: '#2D3748'}}>2 dias antes</option>
            </Select>
          </Box>
        </VStack>
      </Box>

      {/* Mensagens Personalizadas */}
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        borderRadius="xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="teal.300">
            Agendar Mensagem Personalizada
          </Heading>
          
          <HStack spacing={4}>
            <Box flex="1">
              <Text color="gray.300" mb={2}>Tipo</Text>
              <Select
                value={customMessage.type}
                onChange={(e) => setCustomMessage(prev => ({...prev, type: e.target.value}))}
                bg="rgba(255, 255, 255, 0.1)"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="white"
              >
                <option value="appointment" style={{background: '#2D3748'}}>Consulta</option>
                <option value="exam" style={{background: '#2D3748'}}>Exame</option>
                <option value="medication" style={{background: '#2D3748'}}>Medicação</option>
                <option value="general" style={{background: '#2D3748'}}>Geral</option>
              </Select>
            </Box>

            <Box flex="1">
              <Text color="gray.300" mb={2}>Agendamento</Text>
              <Select
                value={customMessage.scheduling}
                onChange={(e) => setCustomMessage(prev => ({...prev, scheduling: e.target.value}))}
                bg="rgba(255, 255, 255, 0.1)"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="white"
              >
                <option value="immediate" style={{background: '#2D3748'}}>Enviar agora</option>
                <option value="1hour" style={{background: '#2D3748'}}>Em 1 hora</option>
                <option value="tomorrow" style={{background: '#2D3748'}}>Amanhã</option>
              </Select>
            </Box>
          </HStack>

          <Box>
            <Text color="gray.300" mb={2}>Mensagem</Text>
            <Textarea
              value={customMessage.message}
              onChange={(e) => setCustomMessage(prev => ({...prev, message: e.target.value}))}
              placeholder="Digite sua mensagem personalizada..."
              bg="rgba(255, 255, 255, 0.1)"
              borderColor="rgba(255, 255, 255, 0.2)"
              color="white"
              _placeholder={{ color: "gray.400" }}
              rows={3}
            />
          </Box>

          <Button
            colorScheme="teal"
            onClick={scheduleCustomMessage}
            w="fit-content"
          >
            Agendar Mensagem
          </Button>
        </VStack>
      </Box>

      {/* Ações */}
      <HStack spacing={4}>
        <Button
          colorScheme="teal"
          onClick={saveSettings}
          flex="1"
        >
          Salvar Configurações
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={sendTestNotification}
        >
          Enviar Teste
        </Button>
      </HStack>
    </VStack>
  );
}
