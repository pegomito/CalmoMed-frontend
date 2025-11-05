'use client';
import { Box, VStack, Heading, Button, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import FixBar from "@/components/FixBar";
import GoogleMap from "@/components/GoogleMap";
import NotificationCenter from "@/components/NotificationCenter";
import PostosList from "@/components/PostosList";
import { SearchProvider } from "@/contexts/SearchContext";
import { postosService } from "@/services/api";
import { toaster } from "@/components/ui/toaster";

export default function LobbyPage() {
  const [sidebarSection, setSidebarSection] = useState("mapa");
  const [postos, setPostos] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setSidebarSection(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPostos();
  }, []);

  const fetchPostos = async () => {
    try {
      setLoading(true);
      const data = await postosService.getAll();
      setPostos(data);
    } catch (error) {
      console.error("Erro ao buscar postos:", error);
      toaster.create({
        title: "Erro",
        description: error.message || "Erro ao carregar postos de saúde",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const markers = useMemo(() => {
    return postos.map((posto) => {
      const occupancy = posto.crowding_info?.occupancyPercentage || 0;
      let lotacao = "baixa";
      if (occupancy >= 90) lotacao = "crítica";
      else if (occupancy >= 70) lotacao = "alta";
      else if (occupancy >= 40) lotacao = "média";

      return {
        id: posto.id,
        title: posto.name,
        position: {
          lat: parseFloat(posto.latitude),
          lng: parseFloat(posto.longitude),
        },
        address: posto.address,
        lotacao,
        tempoEspera: "15-30min",
        filaAtual: posto.crowding_info?.reportedQueue || 0,
        medicosDisponiveis: 2,
        avaliacao: posto.rating || 4.0,
      };
    });
  }, [postos]);

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
            <Heading color="white" fontWeight="bold" mb={4}>
              Menu Principal
            </Heading>
            <Button
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

        <Box
          ml="250px"
          w="calc(100% - 250px)"
          h="100vh"
          background="rgba(30, 48, 63, 1)"
          p={6}
          mt="80px"
        >
          <Box h="100%" display="flex" flexDirection="column">
            {loading ? (
              <VStack spacing={4} align="center" justify="center" h="100%">
                <Spinner size="xl" color="teal.500" />
                <Text color="white" fontSize="lg">
                  Carregando postos de saúde...
                </Text>
              </VStack>
            ) : (
              <>
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
                        markers={markers}
                      />
                    </Box>
                  </VStack>
                )}

                {sidebarSection === "postos" && (
                  <VStack spacing={4} align="stretch" h="100%">
                    <Box>
                      <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                        Lista de Postos
                      </Text>
                      <Text color="gray.300" fontSize="lg">
                        Encontrados {postos.length} postos de saúde
                      </Text>
                    </Box>

                    <Box flex="1" overflowY="auto">
                      <PostosList postos={postos} />
                    </Box>
                  </VStack>
                )}

                {sidebarSection === "notificacoes" && (
                  <VStack spacing={4} align="stretch" h="100%">
                    <Box>
                      <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>
                        Central de Notificações
                      </Text>
                      <Text color="gray.300" fontSize="lg">
                        Gerencie suas notificações e alertas.
                      </Text>
                    </Box>

                    <Box flex="1" overflowY="auto">
                      <NotificationCenter />
                    </Box>
                  </VStack>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </SearchProvider>
  );
}
