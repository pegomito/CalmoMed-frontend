'use client';
import { Box, VStack, Heading, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FixBar from "@/components/FixBar";
import GoogleMap from "@/components/GoogleMap";
import NotificationCenter from "@/components/NotificationCenter";
import NotificationSettings from "@/components/NotificationSettings";
import PostosList from "@/components/PostosList";
import { SearchProvider } from "@/contexts/SearchContext";

export default function LobbyPage() {
  const [sidebarSection, setSidebarSection] = useState("mapa");
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setSidebarSection(tabParam);
    }
  }, [searchParams]);

  return (
    <SearchProvider>
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
              variant={sidebarSection === "notificacoes" ? "solid" : "ghost"}
              justifyContent="flex-start"
              color="white"
              _hover={{ bg: "gray.700", color: "teal.300" }}
              bg={sidebarSection === "notificacoes" ? "teal.700" : undefined}
              onClick={() => setSidebarSection("notificacoes")}
            >
              Notificações
            </Button>
          
          </VStack>
        </Box>
        <Box ml="250px" w="calc(100% - 250px)" h="100vh" background = {"linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #4A5568 100%)"} p={6} mt="80px">
          <Box h="100%" display="flex" flexDirection="column">
            {sidebarSection === "mapa" && (
              <VStack spacing={4} align="stretch" h="100%">
                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                    Mapa de Postos de Saúde
                  </Text>
                  <Text color="gray.300" fontSize="lg">
                    Visualize a localização das UBS e ESF de Chapecó e região.
                  </Text>
                </Box>
                
                <Box flex="1" borderRadius="xl" overflow="hidden">
                  <GoogleMap
                    center={{ lat: -27.0945, lng: -52.6166 }}
                    zoom={13}
                    height="100%"
                    markers={[
                    {
                      id: "ubs-centro",
                      position: { lat: -27.0945, lng: -52.6166 },
                      title: "UBS Centro",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde do Centro",
                      address: "Av. Getúlio Vargas, 1200 - Centro, Chapecó - SC",
                      lotacao: "média",
                      tempoEspera: "45min",
                      filaAtual: "12",
                      medicosDisponiveis: "3",
                      avaliacao: "4.1"
                    },
                    {
                      id: "ubs-sao-pedro",
                      position: { lat: -27.1125, lng: -52.6203 },
                      title: "UBS São Pedro",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde São Pedro",
                      address: "Rua Marechal Bormann, 850 - São Pedro, Chapecó - SC",
                      lotacao: "baixa",
                      tempoEspera: "20min",
                      filaAtual: "6",
                      medicosDisponiveis: "2",
                      avaliacao: "4.3"
                    },
                    {
                      id: "ubs-efapi",
                      position: { lat: -27.0798, lng: -52.6045 },
                      title: "UBS Efapi",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde do Efapi",
                      address: "Rua Lauro Müller, 1578 - Efapi, Chapecó - SC",
                      lotacao: "alta",
                      tempoEspera: "1h30min",
                      filaAtual: "25",
                      medicosDisponiveis: "2",
                      avaliacao: "3.9"
                    },
                    {
                      id: "ubs-passo-fortes",
                      position: { lat: -27.0923, lng: -52.6389 },
                      title: "UBS Passo dos Fortes",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde Passo dos Fortes",
                      address: "Rua Coronel Ernesto Francisco Bertaso, 123 - Passo dos Fortes, Chapecó - SC",
                      lotacao: "baixa",
                      tempoEspera: "15min",
                      filaAtual: "4",
                      medicosDisponiveis: "3",
                      avaliacao: "4.5"
                    },
                    {
                      id: "ubs-santa-maria",
                      position: { lat: -27.1054, lng: -52.5987 },
                      title: "UBS Santa Maria",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde Santa Maria",
                      address: "Rua Benjamin Constant, 456 - Santa Maria, Chapecó - SC",
                      lotacao: "média",
                      tempoEspera: "35min",
                      filaAtual: "10",
                      medicosDisponiveis: "2",
                      avaliacao: "4.0"
                    },
                    {
                      id: "ubs-jardim-america",
                      position: { lat: -27.0823, lng: -52.6298 },
                      title: "UBS Jardim América",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde Jardim América",
                      address: "Rua Nereu Ramos, 789 - Jardim América, Chapecó - SC",
                      lotacao: "baixa",
                      tempoEspera: "25min",
                      filaAtual: "7",
                      medicosDisponiveis: "2",
                      avaliacao: "4.2"
                    },
                    {
                      id: "ubs-sao-cristovao",
                      position: { lat: -27.1178, lng: -52.6134 },
                      title: "UBS São Cristóvão",
                      type: "Unidade Básica de Saúde",
                      description: "Unidade Básica de Saúde São Cristóvão",
                      address: "Rua São Paulo, 321 - São Cristóvão, Chapecó - SC",
                      lotacao: "alta",
                      tempoEspera: "1h15min",
                      filaAtual: "22",
                      medicosDisponiveis: "1",
                      avaliacao: "3.8"
                    },
                    {
                      id: "esf-bela-vista",
                      position: { lat: -27.0756, lng: -52.6445 },
                      title: "ESF Bela Vista",
                      type: "Estratégia Saúde da Família",
                      description: "Estratégia Saúde da Família Bela Vista",
                      address: "Rua das Palmeiras, 654 - Bela Vista, Chapecó - SC",
                      lotacao: "baixa",
                      tempoEspera: "10min",
                      filaAtual: "3",
                      medicosDisponiveis: "1",
                      avaliacao: "4.4"
                    }
                  ]}
                />
                </Box>
              </VStack>
            )}
            {sidebarSection === "postos" && (
              <VStack spacing={6} align="stretch" h="100%">
                <PostosList />
              </VStack>
            )}
           
            {sidebarSection === "notificacoes" && (
              <VStack spacing={6} align="stretch" h="100%">
                <NotificationCenter />
              </VStack>
            )}
            
          </Box>
        </Box>
      </Box>
    </SearchProvider>
  );
}
