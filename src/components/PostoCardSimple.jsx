'use client';
import { Badge, Text, Button, HStack, VStack, Box } from "@chakra-ui/react";
import { useState } from "react";

function PostoCard({ posto }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Box
        w="100%"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="xl"
        border="1px solid rgba(255, 255, 255, 0.2)"
        transition="all 0.3s ease"
        _hover={{ 
          transform: "translateY(-2px)", 
          boxShadow: "xl",
          bg: "rgba(255, 255, 255, 0.15)"
        }}
        cursor="pointer"
        onClick={openModal}
        p={4}
      >
        {/* Header */}
        <VStack align="stretch" spacing={2} mb={4}>
          <HStack justify="space-between" align="flex-start">
            <Text fontSize="lg" fontWeight="bold" color="white" noOfLines={2}>
              {posto.nome}
            </Text>
            <Badge 
              colorScheme={getStatusColor(posto.lotacao)} 
              fontSize="xs"
              px={2} 
              py={1}
              borderRadius="md"
            >
              {getStatusText(posto.lotacao)}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.300" noOfLines={1}>
            {posto.tipo}
          </Text>
        </VStack>

        {/* Body */}
        <VStack align="stretch" spacing={3} mb={4}>
          <Text fontSize="sm" color="gray.400" noOfLines={2}>
            {posto.endereco}
          </Text>
          
          <HStack spacing={4}>
            <Box>
              <Text fontSize="xs" color="gray.500">Atendimentos</Text>
              <Text fontSize="md" color="white" fontWeight="semibold">
                {posto.atendimentosHoje}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">Fila de Espera</Text>
              <Text fontSize="md" color="white" fontWeight="semibold">
                {posto.filaEspera}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500">Tempo Médio</Text>
              <Text fontSize="md" color="white" fontWeight="semibold">
                {posto.tempoMedio}
              </Text>
            </Box>
          </HStack>

          {posto.mensagem && (
            <Box 
              bg="rgba(255, 255, 255, 0.1)" 
              p={2} 
              borderRadius="md"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <Text fontSize="xs" color="gray.400" mb={1}>Aviso:</Text>
              <Text fontSize="sm" color="gray.200" noOfLines={2}>
                {posto.mensagem}
              </Text>
            </Box>
          )}
        </VStack>

        {/* Footer */}
        <HStack w="100%" justify="space-between" align="center">
          <Text fontSize="xs" color="gray.500">
            Atualizado há {posto.ultimaAtualizacao}
          </Text>
          <Button 
            size="sm" 
            variant="ghost" 
            color="teal.300"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            Ver Detalhes
          </Button>
        </HStack>
      </Box>

      {/* Simple Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.6)"
            zIndex="1000"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
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
            {/* Header */}
            <Box p={6} borderBottom="1px solid" borderColor="gray.200">
              <HStack justify="space-between" align="flex-start">
                <Text fontSize="xl" fontWeight="bold">
                  {posto.nome}
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={closeModal}
                  color="gray.600"
                  _hover={{ bg: "gray.100" }}
                >
                  ✕
                </Button>
              </HStack>
              <Text fontSize="md" color="gray.600" mt={2}>
                {posto.tipo}
              </Text>
            </Box>

            {/* Body */}
            <Box p={6} overflowY="auto" maxH="60vh">
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                    Endereço
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {posto.endereco}
                  </Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                    Status Atual
                  </Text>
                  <Badge 
                    colorScheme={getStatusColor(posto.lotacao)} 
                    fontSize="sm"
                    px={3} 
                    py={1}
                    borderRadius="md"
                  >
                    {getStatusText(posto.lotacao)}
                  </Badge>
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
              </VStack>
            </Box>

            {/* Footer */}
            <Box p={6} borderTop="1px solid" borderColor="gray.200">
              <Button onClick={closeModal} colorScheme="gray" w="100%">
                Fechar
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default PostoCard;
