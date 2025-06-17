'use client';
import { Box, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import FixBar from "@/components/FixBar";

export default function LobbyPage() {
  const [sidebarSection, setSidebarSection] = useState("dashboard");

  return (
    <>
      <FixBar />
      <Box w="100%" h="100vh" display="flex">
        <Box
          w="250px"
          h="calc(100vh - 80px)"
          background="rgba(21, 22, 41, 0.8)"
          color="white"
          position="fixed"
          left="0"
          top="80px"
          zIndex="1000"
          p={4}
          boxShadow="xl"
        >
          <VStack spacing={4} align="stretch">
            <Heading textStyle="1x1" color={"rgb(255, 255, 255)"} fontWeight={"bold"} mb={4} textAlign="stretch">
              Menu Principal
            </Heading>
            <Button
              textStyle= "lg"
              variant={sidebarSection === "mapa" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "mapa" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("mapa")}
            >
              Mapa
            </Button>
            <Button
              textStyle= "lg"
              variant={sidebarSection === "postos" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "postos" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("postos")}
            >
              Postos
            </Button>
            <Button
              textStyle= "lg"
              variant={sidebarSection === "dashboard" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "dashboard" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("dashboard")}
            >
              Dashboard
            </Button>
            <Button
              textStyle= "lg"
              variant={sidebarSection === "usuarios" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "usuarios" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("usuarios")}
            >
              Configurações
            </Button>
          </VStack>
        </Box>
        <Box ml="250px" w="calc(100% - 250px)" h="100vh" background = {"rgb(192, 200, 202)"} p={6} mt="80px">
          <Box bg="white" borderRadius="xl" p={8}  h="100%" display="flex" flexDirection="column" >
            {sidebarSection === "mapa" && (
              <>
                <Heading size="lg" color="gray.700" mb={4}>
                  Mapa de Postos de Saúde
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Procure por Posto De Saúde na sua região e visualize informações detalhadas.
                </Text>
              </>
            )}
            {sidebarSection === "postos" && (
              <>
                <Heading size="lg" color="gray.700" mb={4}>
                  Gerenciamento de Postos
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Visualize e gerencie todos os postos de saúde cadastrados.
                </Text>
              </>
            )}
            {sidebarSection === "dashboard" && (
              <>
                <Heading size="lg" color="gray.700" mb={4}>
                  Dashboard
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Veja estatísticas
                </Text>
              </>
            )}
            {sidebarSection === "usuarios" && (
              <>
                <Heading size="lg" color="gray.700" mb={4}>
                  Gestão de Usuários
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Gerencie usuários e permissões do sistema.
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
