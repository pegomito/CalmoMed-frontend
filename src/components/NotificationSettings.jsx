'use client';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Switch, 
  Heading,
  Button,
  Textarea,
  Input,
  Badge
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
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
    reminderTiming: "24",
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
            <Select.Root 
              value={[settings.preferredChannel]}
              onValueChange={(e) => handleSettingChange('preferredChannel', e.value[0])}
            >
              <Select.Control>
                <Select.Trigger
                  bg="rgba(255, 255, 255, 0.1)"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                >
                  <Select.ValueText placeholder="Selecione o canal" />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content bg="#2D3748" borderColor="rgba(255, 255, 255, 0.2)">
                  <Select.Item item={{label: "E-mail", value: "email"}}>
                    <Select.ItemText>E-mail</Select.ItemText>
                  </Select.Item>
                  <Select.Item item={{label: "SMS", value: "sms"}}>
                    <Select.ItemText>SMS</Select.ItemText>
                  </Select.Item>
                  <Select.Item item={{label: "Push Notification", value: "push"}}>
                    <Select.ItemText>Push Notification</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Box>
        </VStack>
      </Box>

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
            <Select.Root 
              value={[settings.reminderTiming]}
              onValueChange={(e) => handleSettingChange('reminderTiming', e.value[0])}
            >
              <Select.Control>
                <Select.Trigger
                  bg="rgba(255, 255, 255, 0.1)"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                >
                  <Select.ValueText placeholder="Selecione a antecedência" />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content bg="#2D3748" borderColor="rgba(255, 255, 255, 0.2)">
                  <Select.Item item={{label: "1 hora antes", value: "1"}}>
                    <Select.ItemText>1 hora antes</Select.ItemText>
                  </Select.Item>
                  <Select.Item item={{label: "6 horas antes", value: "6"}}>
                    <Select.ItemText>6 horas antes</Select.ItemText>
                  </Select.Item>
                  <Select.Item item={{label: "1 dia antes", value: "24"}}>
                    <Select.ItemText>1 dia antes</Select.ItemText>
                  </Select.Item>
                  <Select.Item item={{label: "2 dias antes", value: "48"}}>
                    <Select.ItemText>2 dias antes</Select.ItemText>
                  </Select.Item>
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Box>
        </VStack>
      </Box>

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
              <Select.Root 
                value={[customMessage.type]}
                onValueChange={(e) => setCustomMessage(prev => ({...prev, type: e.value[0]}))}
              >
                <Select.Control>
                  <Select.Trigger
                    bg="rgba(255, 255, 255, 0.1)"
                    borderColor="rgba(255, 255, 255, 0.2)"
                    color="white"
                  >
                    <Select.ValueText placeholder="Selecione o tipo" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content bg="#2D3748" borderColor="rgba(255, 255, 255, 0.2)">
                    <Select.Item item={{label: "Consulta", value: "appointment"}}>
                      <Select.ItemText>Consulta</Select.ItemText>
                    </Select.Item>
                    <Select.Item item={{label: "Exame", value: "exam"}}>
                      <Select.ItemText>Exame</Select.ItemText>
                    </Select.Item>
                    <Select.Item item={{label: "Medicação", value: "medication"}}>
                      <Select.ItemText>Medicação</Select.ItemText>
                    </Select.Item>
                    <Select.Item item={{label: "Geral", value: "general"}}>
                      <Select.ItemText>Geral</Select.ItemText>
                    </Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Box>

            <Box flex="1">
              <Text color="gray.300" mb={2}>Agendamento</Text>
              <Select.Root 
                value={[customMessage.scheduling]}
                onValueChange={(e) => setCustomMessage(prev => ({...prev, scheduling: e.value[0]}))}
              >
                <Select.Control>
                  <Select.Trigger
                    bg="rgba(255, 255, 255, 0.1)"
                    borderColor="rgba(255, 255, 255, 0.2)"
                    color="white"
                  >
                    <Select.ValueText placeholder="Selecione o agendamento" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content bg="#2D3748" borderColor="rgba(255, 255, 255, 0.2)">
                    <Select.Item item={{label: "Enviar agora", value: "immediate"}}>
                      <Select.ItemText>Enviar agora</Select.ItemText>
                    </Select.Item>
                    <Select.Item item={{label: "Em 1 hora", value: "1hour"}}>
                      <Select.ItemText>Em 1 hora</Select.ItemText>
                    </Select.Item>
                    <Select.Item item={{label: "Amanhã", value: "tomorrow"}}>
                      <Select.ItemText>Amanhã</Select.ItemText>
                    </Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
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
