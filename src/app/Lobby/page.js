'use client';
import { Box, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import FixBar from "@/components/FixBar";
import GoogleMap from "@/components/GoogleMap";
import NotificationCenter from "@/components/NotificationCenter";
import NotificationSettings from "@/components/NotificationSettings";
import PostosList from "@/components/PostosList";

export default function LobbyPage() {
  const [sidebarSection, setSidebarSection] = useState("dashboard");

  return (
    <>
      <FixBar />
      <Box w="100%" h="100vh" display="flex">
        <Box
          w="250px"
          h="calc(100vh - 80px)"
          background="rgba(21, 74, 90, 0.8)"
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
              variant={sidebarSection === "notificacoes" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "notificacoes" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("notificacoes")}
            >
              Notificações
            </Button>
            <Button
              textStyle= "lg"
              variant={sidebarSection === "configuracoes" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "configuracoes" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("configuracoes")}
            >
              Configurações
            </Button>
          </VStack>
        </Box>
        <Box ml="250px" w="calc(100% - 250px)" h="100vh" background = {"linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #4A5568 100%)"} p={6} mt="80px">
          <Box bg="rgba(255, 255, 255, 0.05)" borderRadius="xl" p={8}  h="100%" display="flex" flexDirection="column" border="1px solid rgba(255, 255, 255, 0.1)">
            {sidebarSection === "mapa" && (
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="lg" color="white" mb={2}>
                    Mapa de Postos de Saúde
                  </Heading>
                  <Text color="gray.300" fontSize="lg">
                    Visualize a localização das UBS e ESF de Chapecó e região.
                  </Text>
                </Box>
                
                <GoogleMap
                  center={{ lat: -27.0945, lng: -52.6166 }}
                  zoom={13}
                  height="500px"
                  markers={[
                    {
                      position: { lat: -27.0945, lng: -52.6166 },
                      title: "UBS Centro",
                      description: "Unidade Básica de Saúde do Centro",
                      address: "Av. Getúlio Vargas, 1200 - Centro, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.1125, lng: -52.6203 },
                      title: "UBS São Pedro",
                      description: "Unidade Básica de Saúde São Pedro",
                      address: "Rua Marechal Bormann, 850 - São Pedro, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.0798, lng: -52.6045 },
                      title: "UBS Efapi",
                      description: "Unidade Básica de Saúde do Efapi",
                      address: "Rua Lauro Müller, 1578 - Efapi, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.0923, lng: -52.6389 },
                      title: "UBS Passo dos Fortes",
                      description: "Unidade Básica de Saúde Passo dos Fortes",
                      address: "Rua Coronel Ernesto Francisco Bertaso, 123 - Passo dos Fortes, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.1054, lng: -52.5987 },
                      title: "UBS Santa Maria",
                      description: "Unidade Básica de Saúde Santa Maria",
                      address: "Rua Benjamin Constant, 456 - Santa Maria, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.0823, lng: -52.6298 },
                      title: "UBS Jardim América",
                      description: "Unidade Básica de Saúde Jardim América",
                      address: "Rua Nereu Ramos, 789 - Jardim América, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.1178, lng: -52.6134 },
                      title: "UBS São Cristóvão",
                      description: "Unidade Básica de Saúde São Cristóvão",
                      address: "Rua São Paulo, 321 - São Cristóvão, Chapecó - SC"
                    },
                    {
                      position: { lat: -27.0756, lng: -52.6445 },
                      title: "ESF Bela Vista",
                      description: "Estratégia Saúde da Família Bela Vista",
                      address: "Rua das Palmeiras, 654 - Bela Vista, Chapecó - SC"
                    }
                  ]}
                />
              </VStack>
            )}
            {sidebarSection === "postos" && (
              <VStack spacing={6} align="stretch" h="100%">
                <PostosList />
              </VStack>
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
            {sidebarSection === "notificacoes" && (
              <VStack spacing={6} align="stretch" h="100%">
                <NotificationCenter />
              </VStack>
            )}
            {sidebarSection === "configuracoes" && (
              <VStack spacing={6} align="stretch" h="100%">
                <Box>
                  <Heading size="lg" color="white" mb={2}>
                    Configurações
                  </Heading>
                  <Text color="gray.300" fontSize="lg">
                    Área reservada para configurações do sistema.
                  </Text>
                </Box>
              </VStack>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
