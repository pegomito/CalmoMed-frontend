'use client';
import { 
  Badge, 
  Text, 
  Button, 
  HStack, 
  VStack, 
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState } from "react";
import ReportOccupancyModal from "./ReportOccupancyModal";

export default function PostoDetailsModal({ isOpen, onClose, posto }) {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  if (!posto) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'baixa': return 'green';
      case 'média': return 'yellow';
      case 'alta': return 'orange';
      case 'crítica': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'baixa': return 'Baixa Lotação';
      case 'média': return 'Média Lotação';
      case 'alta': return 'Alta Lotação';
      case 'crítica': return 'Lotação Crítica';
      default: return 'Status Desconhecido';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="rgba(0, 0, 0, 0.6)"
        zIndex="1000"
        onClick={onClose}
      />
      
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="90%"
        maxW="600px"
        maxH="90vh"
        bg="white"
        borderRadius="xl"
        boxShadow="2xl"
        zIndex="1001"
        overflow="hidden"
      >
        <Box p={6} borderBottom="1px solid" borderColor="gray.200">
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between" align="flex-start">
              <Text fontSize="xl" fontWeight="bold">
                {posto.nome}
              </Text>
              <HStack spacing={2}>
                <Badge 
                  colorScheme={getStatusColor(posto.lotacao)} 
                  fontSize="sm"
                  px={3} 
                  py={1}
                  borderRadius="md"
                >
                  {getStatusText(posto.lotacao)}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  color="gray.600"
                  _hover={{ bg: "gray.100" }}
                >
                  X
                </Button>
              </HStack>
            </HStack>
            <Text fontSize="md" color="gray.600">
              {posto.tipo}
            </Text>
          </VStack>
        </Box>

        <Box p={6} overflowY="auto" maxH="60vh">
          <VStack spacing={6} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Endereço
              </Text>
              <Text fontSize="md" color="gray.600">
                {posto.endereco}
              </Text>
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Pessoas na Fila</Text>
                  <Text fontSize="2xl" color="blue.600" fontWeight="bold">
                    {posto.crowding_info?.reportedQueue || 0}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Taxa de Ocupação</Text>
                  <Text fontSize="2xl" color="orange.600" fontWeight="bold">
                    {posto.crowding_info?.occupancyPercentage || 0}%
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Última Atualização</Text>
                  <Text fontSize="lg" color="purple.600" fontWeight="bold">
                    {posto.crowding_info?.lastUpdate 
                      ? new Date(posto.crowding_info.lastUpdate).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Sem dados'}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Distância Média</Text>
                  <Text fontSize="lg" color="green.600" fontWeight="bold">
                    {posto.crowding_info?.distance_to_posto 
                      ? `${Math.round(posto.crowding_info.distance_to_posto)}m`
                      : 'N/A'}
                  </Text>
                </Box>
              </GridItem>
            </Grid>

            {posto.specialties && Array.isArray(posto.specialties) && posto.specialties.length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                  Especialidades Disponíveis
                </Text>
                <VStack align="stretch" spacing={1}>
                  {posto.specialties.map((spec, index) => (
                    <Text key={index} fontSize="sm" color="gray.600">
                      • {spec}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}

            {posto.services && Array.isArray(posto.services) && posto.services.length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                  Serviços Disponíveis
                </Text>
                <VStack align="stretch" spacing={1}>
                  {posto.services.map((servico, index) => (
                    <Text key={index} fontSize="sm" color="gray.600">
                      • {servico}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}

            <Box 
              bg="blue.50" 
              p={4} 
              borderRadius="md"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={2}>
                Como Reportar Ocupação:
              </Text>
              <Text fontSize="sm" color="blue.700">
                Ajude a comunidade! Clique em "Reportar Ocupação" para informar quantas pessoas você vê na fila ou sala de espera. Seus dados ajudam outros usuários a planejar melhor suas visitas.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box p={6} borderTop="1px solid" borderColor="gray.200">
          <HStack justify="space-between">
            <Button 
              onClick={() => setIsReportModalOpen(true)} 
              colorScheme="teal"
            >
              Reportar Ocupação
            </Button>
            <Button onClick={onClose} colorScheme="gray">
              Fechar
            </Button>
          </HStack>
        </Box>
      </Box>

      <ReportOccupancyModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        posto={posto}
      />
    </>
  );
}
