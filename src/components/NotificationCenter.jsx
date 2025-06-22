'use client';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Badge, 
  IconButton, 
  Button,
  Heading
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "appointment",
        priority: "high",
        title: "Consulta Agendada",
        message: "Você tem uma consulta marcada para amanhã às 14:00h na UBS Centro",
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true
      },
      {
        id: 2,
        type: "exam_result",
        priority: "medium",
        title: "Resultado de Exame",
        message: "Seu exame de sangue está disponível. Procure a recepção.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: false
      },
      {
        id: 3,
        type: "medication",
        priority: "low",
        title: "Lembrete de Medicação",
        message: "Hora de tomar seu medicamento - Losartana 50mg",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionRequired: false
      },
      {
        id: 4,
        type: "alert",
        priority: "urgent",
        title: "Alerta de Saúde",
        message: "UBS Efapi com alta lotação. Considere UBS São Pedro para atendimento urgente.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        actionRequired: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

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
    return '•';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}min atrás`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h atrás`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between" align="center">
        <HStack>
          <Heading size="lg" color="white">
            Central de Notificações
          </Heading>
          {unreadCount > 0 && (
            <Badge colorScheme="red" borderRadius="full" px={2}>
              {unreadCount}
            </Badge>
          )}
        </HStack>
      </HStack>

      <Box
        bg="rgba(255, 255, 255, 0.05)"
        borderRadius="xl"
        p={6}
        border="1px solid rgba(255, 255, 255, 0.1)"
        maxH="600px"
        overflowY="auto"
      >
        {notifications.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.400">Nenhuma notificação no momento</Text>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <HStack
                  p={6}
                  bg={notification.read ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.08)"}
                  borderRadius="lg"
                  border={notification.read ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(74, 222, 128, 0.3)"}
                  cursor="pointer"
                  _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  onClick={() => markAsRead(notification.id)}
                  align="flex-start"
                  spacing={4}
                  minH="100px"
                >
                  <Text fontSize="xl">{getTypeIcon(notification.type)}</Text>
                  
                  <VStack align="stretch" flex="1" spacing={1}>
                    <HStack justify="space-between" align="flex-start">
                      <VStack align="stretch" spacing={1} flex="1">
                        <HStack>
                          <Text
                            fontWeight={notification.read ? "normal" : "bold"}
                            color={notification.read ? "gray.300" : "white"}
                            fontSize="sm"
                          >
                            {notification.title}
                          </Text>
                          <Badge 
                            colorScheme={getPriorityColor(notification.priority)} 
                            size="xs"
                          >
                            {getPriorityText(notification.priority)}
                          </Badge>
                        </HStack>
                        <Text
                          color={notification.read ? "gray.400" : "gray.200"}
                          fontSize="xs"
                          noOfLines={2}
                        >
                          {notification.message}
                        </Text>
                      </VStack>
                      
                      <VStack align="flex-end" spacing={1}>
                        <Text color="gray.500" fontSize="xs">
                          {formatTime(notification.timestamp)}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
                {index < notifications.length - 1 && (
                  <Box h="1px" bg="rgba(255, 255, 255, 0.1)" w="100%" />
                )}
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}
