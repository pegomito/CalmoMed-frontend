'use client';
import { useState } from 'react';
import {
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Input,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { postosService } from "@/services/api";

export default function PostoCreate({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    rating: '4.0',
    contact: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    // Limpar formulário ao fechar
    setFormData({
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      rating: '4.0',
      contact: '',
    });
    onClose();
  };

  const handleSubmit = async () => {
    // Validações
    if (!formData.name || !formData.address || !formData.latitude || !formData.longitude || !formData.contact) {
      toaster.create({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        type: "error",
      });
      return;
    }

    // Validar latitude e longitude
    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      toaster.create({
        title: "Erro",
        description: "Latitude e longitude devem ser números válidos.",
        type: "error",
      });
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toaster.create({
        title: "Erro",
        description: "Coordenadas inválidas. Latitude: -90 a 90, Longitude: -180 a 180.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const postoData = {
        name: formData.name,
        address: formData.address,
        latitude: lat.toString(),
        longitude: lng.toString(),
        rating: parseFloat(formData.rating) || 4.0,
        contact: formData.contact,
      };

      console.log('=== INICIANDO CRIAÇÃO DE POSTO ===');
      console.log('Dados enviados:', postoData);
      console.log('URL da API:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

      const result = await postosService.create(postoData);
      console.log('=== POSTO CRIADO COM SUCESSO ===');
      console.log('Resposta:', result);

      toaster.create({
        title: "Sucesso!",
        description: "Posto de saúde criado com sucesso.",
        type: "success",
      });

      // Limpar formulário
      setFormData({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        rating: '4.0',
        contact: '',
      });

      onClose();
      
      // Chamar callback de sucesso para atualizar lista
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("=== ERRO AO CRIAR POSTO ===");
      console.error("Erro completo:", error);
      console.error("Tipo do erro:", typeof error);
      console.error("Erro stringificado:", JSON.stringify(error, null, 2));
      console.error("Detalhes do erro:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: error.config?.url,
        code: error.code
      });
      
      let errorMessage = "Erro ao criar posto de saúde.";
      
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        errorMessage = "Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:3001";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toaster.create({
        title: "Erro ao criar posto",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay de fundo */}
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="rgba(0, 0, 0, 0.6)"
        zIndex="1000"
        onClick={handleClose}
      />

      {/* Modal */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.800"
        color="white"
        borderRadius="xl"
        boxShadow="2xl"
        zIndex="1001"
        w="90%"
        maxW="600px"
        maxH="90vh"
        overflowY="auto"
      >
        {/* Header */}
        <Box p={6} borderBottom="1px solid" borderColor="gray.700">
          <HStack justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">
              Adicionar Novo Posto de Saúde
            </Text>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClose}
              color="gray.400"
              _hover={{ color: "white", bg: "gray.700" }}
            >
              ✕
            </Button>
          </HStack>
        </Box>

        {/* Body */}
        <Box p={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                Nome do Posto <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: UBS Centro"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                Endereço Completo <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Ex: Rua das Flores, 123 - Centro"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                Telefone de Contato <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="Ex: (49) 3321-1234"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
              />
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                    Latitude <Text as="span" color="red.400">*</Text>
                  </Text>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                    placeholder="Ex: -27.0945"
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                    _hover={{ borderColor: "teal.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
                  />
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                    Longitude <Text as="span" color="red.400">*</Text>
                  </Text>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                    placeholder="Ex: -52.6166"
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                    _hover={{ borderColor: "teal.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
                  />
                </Box>
              </GridItem>
            </Grid>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.300">
                Avaliação (0-5)
              </Text>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                placeholder="Ex: 4.5"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)" }}
              />
            </Box>

            <Box p={3} bg="blue.900" borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
              <Text fontSize="sm" color="blue.200">
                Você pode obter as coordenadas acessando o Google Maps, clicando com botão direito no local e selecionando as coordenadas.
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Footer */}
        <Box p={6} borderTop="1px solid" borderColor="gray.700">
          <HStack spacing={3} justify="flex-end">
            <Button 
              variant="outline" 
              onClick={handleClose} 
              disabled={loading}
              borderColor="gray.500"
              color="white"
              _hover={{ bg: "gray.700", borderColor: "gray.400" }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Posto'}
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
