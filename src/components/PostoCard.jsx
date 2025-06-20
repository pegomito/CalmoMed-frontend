'use client';
import { Badge, Text, Button, HStack, VStack, Box } from "@chakra-ui/react";
import { useState } from "react";
import PostoDetailsModal from "./PostoDetailsModal";

export default function PostoCard({ posto }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
        onClick={onOpen}
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
              onOpen();
            }}
          >
            Ver Detalhes
          </Button>
        </HStack>
      </Box>

      <PostoDetailsModal 
        isOpen={isOpen} 
        onClose={onClose} 
        posto={posto} 
      />
    </>
  );
}
