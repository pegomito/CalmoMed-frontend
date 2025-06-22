'use client';
import {
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Box,
  Card,
  CardBody
} from "@chakra-ui/react";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";

export default function NotificationDetailsModal({ isOpen, onClose, notification }) {
  if (!notification) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'urgente';
      case 'high': return 'alta';
      case 'medium': return 'média';
      case 'low': return 'baixa';
      default: return 'normal';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'exam_result': return '🩺';
      case 'medication': return '💊';
      case 'alert': return '⚠️';
      default: return '📢';
    }
  };

  const getActionButtons = (type) => {
    switch (type) {
      case 'appointment':
        return (
          <HStack spacing={3}>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              📅 Ver Agenda
            </Button>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              🗺️ Ver Localização
            </Button>
          </HStack>
        );
      case 'exam_result':
        return (
          <HStack spacing={3}>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              📄 Baixar Resultado
            </Button>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              👨‍⚕️ Agendar Retorno
            </Button>
          </HStack>
        );
      case 'medication':
        return (
          <HStack spacing={3}>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              ⏰ Configurar Lembrete
            </Button>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              💊 Ver Medicamentos
            </Button>
          </HStack>
        );
      case 'alert':
        return (
          <HStack spacing={3}>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              🗺️ Ver Alternativas
            </Button>
            <Button
              size="sm"
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              📍 Traçar Rota
            </Button>
          </HStack>
        );
      default:
        return null;
    }
  };

  const getDetailedInfo = (notification) => {
    switch (notification.type) {
      case 'appointment':
        return {
          details: [
            { label: "Data", value: "Amanhã, 15 de Janeiro" },
            { label: "Horário", value: "14:00h" },
            { label: "Médico", value: "Dr. João Silva" },
            { label: "Local", value: "UBS Centro - Sala 3" },
            { label: "Tipo", value: "Consulta de Rotina" }
          ],
          instructions: "Chegue 15 minutos antes do horário. Traga documento com foto e cartão SUS."
        };
      case 'exam_result':
        return {
          details: [
            { label: "Exame", value: "Hemograma Completo" },
            { label: "Data da Coleta", value: "10 de Janeiro" },
            { label: "Status", value: "Resultado Disponível" },
            { label: "Local", value: "Laboratório UBS Centro" }
          ],
          instructions: "Procure a recepção com documento e cartão SUS para retirar o resultado impresso."
        };
      case 'medication':
        return {
          details: [
            { label: "Medicamento", value: "Losartana Potássica 50mg" },
            { label: "Dosagem", value: "1 comprimido" },
            { label: "Frequência", value: "1x ao dia" },
            { label: "Próxima dose", value: "Hoje às 20:00h" }
          ],
          instructions: "Tome sempre no mesmo horário, preferencialmente após as refeições."
        };
      case 'alert':
        return {
          details: [
            { label: "Local Atual", value: "UBS Efapi" },
            { label: "Situação", value: "Alta Lotação - 95%" },
            { label: "Tempo de Espera", value: "~2h30min" },
            { label: "Alternativa Sugerida", value: "UBS São Pedro" },
            { label: "Lotação Alternativa", value: "Baixa - 30%" }
          ],
          instructions: "Considere dirigir-se à UBS São Pedro para atendimento mais rápido."
        };
      default:
        return { details: [], instructions: "" };
    }
  };

  const detailedInfo = getDetailedInfo(notification);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent bg="gray.800" color="white" borderRadius="xl" border="1px solid rgba(255, 255, 255, 0.1)">
        <DialogHeader pb={2}>
          <HStack spacing={3}>
            <Text fontSize="2xl">{getTypeIcon(notification.type)}</Text>
            <VStack align="start" spacing={1}>
              <DialogTitle fontSize="lg" fontWeight="bold">
                {notification.title}
              </DialogTitle>
              <HStack>
                <Badge colorScheme={getPriorityColor(notification.priority)} size="sm">
                  {getPriorityText(notification.priority)}
                </Badge>
                <Text fontSize="xs" color="gray.400">
                  {new Date(notification.timestamp).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </DialogHeader>
        <DialogCloseTrigger color="gray.400" _hover={{ color: "white" }} />
        
        <DialogBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text color="gray.200" fontSize="sm" lineHeight="1.6">
                {notification.message}
              </Text>
            </Box>

            <Box height="1px" bg="gray.600" my={4} />

            {detailedInfo.details.length > 0 && (
              <Card bg="rgba(255, 255, 255, 0.05)" border="1px solid rgba(255, 255, 255, 0.1)">
                <CardBody>
                  <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.300">
                    📋 Detalhes
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {detailedInfo.details.map((detail, index) => (
                      <HStack key={index} justify="space-between">
                        <Text fontSize="xs" color="gray.400" fontWeight="medium">
                          {detail.label}:
                        </Text>
                        <Text fontSize="xs" color="gray.200">
                          {detail.value}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            )}

            {detailedInfo.instructions && (
              <Card bg="rgba(74, 222, 128, 0.1)" border="1px solid rgba(74, 222, 128, 0.3)">
                <CardBody>
                  <Text fontSize="sm" fontWeight="semibold" mb={2} color="green.300">
                    💡 Instruções
                  </Text>
                  <Text fontSize="xs" color="gray.200" lineHeight="1.5">
                    {detailedInfo.instructions}
                  </Text>
                </CardBody>
              </Card>
            )}

            {notification.actionRequired && (
              <>
                <Box height="1px" bg="gray.600" my={4} />
                <VStack spacing={3}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.300">
                    🚀 Ações Disponíveis
                  </Text>
                  {getActionButtons(notification.type)}
                </VStack>
              </>
            )}
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
