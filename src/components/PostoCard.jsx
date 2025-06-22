'use client';
import { Text, Button, HStack, VStack, Box } from "@chakra-ui/react";
import { useState } from "react";
import PostoDetailsModal from "./PostoDetailsModal";

export default function PostoCard({ posto }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'baixa': return '#22c55e';
      case 'média': return '#eab308';
      case 'alta': return '#f97316';
      case 'crítica': return '#ef4444';
      default: return '#6b7280';
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
        <HStack justify="space-between" align="center" mb={2}>
          <HStack spacing={3}>
            <Text fontSize="2xl">🏥</Text>
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color="white" noOfLines={1}>
                {posto.nome}
              </Text>
            </VStack>
          </HStack>
          <Box
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={getStatusColor(posto.lotacao)}
          />
        </HStack>

        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color="gray.400">
            Lotação {posto.lotacao}
          </Text>
          <Button 
            size="sm" 
            variant="outline" 
            color="teal.300" 
            borderColor="teal.300"
            _hover={{ bg: "teal.300", color: "gray.800" }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            Ver mais
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
