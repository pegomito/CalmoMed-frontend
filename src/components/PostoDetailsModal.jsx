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

export default function PostoDetailsModal({ isOpen, onClose, posto }) {
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
                  ✕
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
                  <Text fontSize="sm" color="gray.500" mb={1}>Atendimentos Hoje</Text>
                  <Text fontSize="2xl" color="blue.600" fontWeight="bold">
                    {posto.atendimentosHoje}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Fila de Espera</Text>
                  <Text fontSize="2xl" color="orange.600" fontWeight="bold">
                    {posto.filaEspera}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Tempo Médio</Text>
                  <Text fontSize="2xl" color="purple.600" fontWeight="bold">
                    {posto.tempoMedio}
                  </Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>Capacidade</Text>
                  <Text fontSize="2xl" color="green.600" fontWeight="bold">
                    {posto.capacidade}
                  </Text>
                </Box>
              </GridItem>
            </Grid>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Horário de Funcionamento
              </Text>
              <Text fontSize="md" color="gray.600">
                {posto.horarioFuncionamento}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Serviços Disponíveis
              </Text>
              <VStack align="stretch" spacing={1}>
                {posto.servicos?.map((servico, index) => (
                  <Text key={index} fontSize="sm" color="gray.600">
                    • {servico}
                  </Text>
                ))}
              </VStack>
            </Box>

            {posto.mensagem && (
              <Box 
                bg="blue.50" 
                p={4} 
                borderRadius="md"
                border="1px solid"
                borderColor="blue.200"
              >
                <Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={2}>
                  Avisos e Informações:
                </Text>
                <Text fontSize="sm" color="blue.700">
                  {posto.mensagem}
                </Text>
              </Box>
            )}

            <Box>
              <Text fontSize="xs" color="gray.500">
                Última atualização: há {posto.ultimaAtualizacao}
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box p={6} borderTop="1px solid" borderColor="gray.200">
          <HStack justify="flex-end">
            <Button onClick={onClose} colorScheme="gray">
              Fechar
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
