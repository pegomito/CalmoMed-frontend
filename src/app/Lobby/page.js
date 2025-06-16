'use client';
import { Box, VStack, HStack, Text, Heading, Button } from "@chakra-ui/react";
import { Tabs } from "@chakra-ui/react";

export default function LobbyPage() {
  return (
    <Box w="100%" h="100vh" display="flex">
      <Box
        w="250px"
        h="100vh"
        bg="gray.800"
        color="white"
        position="fixed"
        left="0"
        top="0"
        zIndex="1000"
        p={4}
        boxShadow="xl"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="teal.300" mb={4}>
            Menu Principal
          </Heading>
          
          <Button
            variant="ghost"
            justifyContent="flex-start"
            color="white"
            _hover={{ bg: "gray.700", color: "teal.300" }}
          >
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            justifyContent="flex-start"
            color="white"
            _hover={{ bg: "gray.700", color: "teal.300" }}
          >
            Postos
          </Button>
          
          <Button
            variant="ghost"
            justifyContent="flex-start"
            color="white"
            _hover={{ bg: "gray.700", color: "teal.300" }}
          >
            Relatórios
          </Button>
          
          <Button
            variant="ghost"
            justifyContent="flex-start"
            color="white"
            _hover={{ bg: "gray.700", color: "teal.300" }}
          >
            Configurações
          </Button>
        </VStack>
      </Box>

      
      <Box ml="250px" w="calc(100% - 250px)" h="100vh" background = {"rgb(192, 200, 202)"} p={6}>
       
        <Tabs.Root defaultValue="dashboard" variant="enclosed">
          <Box bg="white" borderBottom="1px solid" borderColor="gray.200" px={4}>
            <Tabs.List>
              <Tabs.Trigger value="dashboard">
                Dashboard
              </Tabs.Trigger>
              <Tabs.Trigger value="postos">
                Postos
              </Tabs.Trigger>
              <Tabs.Trigger value="relatorios">
                Relatórios
              </Tabs.Trigger>
              <Tabs.Trigger value="usuarios">
                Usuários
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
          </Box>

          <Box p={6}>
            <Tabs.Content value="dashboard">
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="gray.700">
                  Dashboard Principal
                </Heading>
                <Text color="gray.600">
                  Bem-vindo ao sistema de gerenciamento de postos de saúde.
                </Text>
              </VStack>
            </Tabs.Content>

            <Tabs.Content value="postos">
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="gray.700">
                  Gerenciamento de Postos
                </Heading>
                <Text color="gray.600">
                  Visualize e gerencie todos os postos de saúde cadastrados.
                </Text>
              </VStack>
            </Tabs.Content>

            <Tabs.Content value="relatorios">
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="gray.700">
                  Relatórios
                </Heading>
                <Text color="gray.600">
                  Gere e visualize relatórios detalhados do sistema.
                </Text>
                {/* Relatórios aqui */}
              </VStack>
            </Tabs.Content>

            <Tabs.Content value="usuarios">
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="gray.700">
                  Gestão de Usuários
                </Heading>
                <Text color="gray.600">
                  Gerencie usuários e permissões do sistema.
                </Text>
                {/* Gestão de usuários aqui */}
              </VStack>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </Box>
  );
}
