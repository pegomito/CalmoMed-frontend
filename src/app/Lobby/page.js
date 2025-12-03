'use client';
import { Box, VStack, HStack, Heading, Button, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FixBar from "@/components/FixBar";
import Sidebar from "@/components/Sidebar";
import GoogleMap from "@/components/GoogleMap";
import PostosList from "@/components/PostosList";
import OccupancyStats from "@/components/OccupancyStats";
import PostoCreate from "@/components/PostoCreate";
import UserProfile from "@/components/UserProfile";
import { SearchProvider, useSearch } from "@/contexts/SearchContext";
import { postosService } from "@/services/api";
import { toaster, Toaster } from "@/components/ui/toaster";
import Dashboard from "@/components/Dashboard";
import { aplicarDecaimentoEmLote } from "@/utils/ocupacaoDecaimento";

export const dynamic = 'force-dynamic';

function LobbyContent() {
  const [sidebarSection, setSidebarSection] = useState("mapa");
  const [postos, setPostos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const { setPostos: setSearchPostos } = useSearch();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const tabParam = searchParams?.get("tab");
    if (tabParam) {
      setSidebarSection(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Buscar dados imediatamente ao carregar
    fetchPostos();

    // 🔄 POLLING: Atualizar dados a cada 1 minuto (60.000 ms)
    const pollingInterval = setInterval(() => {
      fetchPostos(true); // true = é atualização em background
    }, 60000);

    // Limpar interval quando o componente desmontar
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const fetchPostos = async (isBackgroundUpdate = false) => {
    try {
      // Só mostrar loading na busca inicial, não nas atualizações em background
      if (!isBackgroundUpdate) {
        setLoading(true);
      }
      
      const data = await postosService.getAll();
      setPostos(data);
      setSearchPostos(data); // Atualizar contexto de busca
      
      // Log silencioso para atualizações em background
      if (isBackgroundUpdate) {
        console.log('🔄 Dados atualizados via polling:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Erro ao buscar postos:", error);
      
      // Só mostrar toast de erro na busca inicial, não em polling
      if (!isBackgroundUpdate) {
        toaster.create({
          title: "Erro",
          description: error.message || "Erro ao carregar postos de saúde",
          type: "error",
        });
      }
    } finally {
      if (!isBackgroundUpdate) {
        setLoading(false);
      }
    }
  };

  // Aplicar decaimento aos postos para cálculos em tempo real
  const postosComDecaimento = useMemo(() => {
    return aplicarDecaimentoEmLote(postos);
  }, [postos]);

  const markers = useMemo(() => {
    return postosComDecaimento.map((posto) => {
      // Usar o número de pessoas na fila APÓS decaimento
      const filaAtual = posto.crowding_info?.reportedQueue || 0;
      let lotacao = "baixa";
      
      // Determinar lotação baseado no número de pessoas
      if (filaAtual > 15) {
        lotacao = "alta";
      } else if (filaAtual > 5) {
        lotacao = "média";
      }

      return {
        id: posto.id,
        title: posto.name,
        position: {
          lat: parseFloat(posto.latitude),
          lng: parseFloat(posto.longitude),
        },
        address: posto.address,
        lotacao,
        filaAtual: filaAtual,
        avaliacao: posto.rating || 0,
      };
    });
  }, [postosComDecaimento]);

  return (
    <>
      {mounted && <FixBar />}
      {mounted && (
        <Sidebar 
          activeSection={sidebarSection} 
          onSectionChange={setSidebarSection}
        />
      )}

      <Box
        w="100%"
        h="100vh"
        background="rgba(30, 48, 63, 1)"
        pl="70px" 
        pt="70px"
      >
        <Box h="100%" display="flex" flexDirection="column" p={6}>
            {loading ? (
              <VStack spacing={4} align="center" justify="center" h="100%">
                <Spinner size="xl" color="teal.500" />
                <Text color="white" fontSize="lg">
                  Carregando unidades de saúde...
                </Text>
              </VStack>
            ) : (
              <>
                {sidebarSection === "mapa" && (
                  <VStack spacing={4} align="stretch" h="100%">
                    <Box>
                      <Text color="gray.300" fontSize="lg" mb={4}>
                        Visualize a localização das Unidades de Saúde de sua Região
                      </Text>
                      <OccupancyStats postos={postosComDecaimento} />
                    </Box>

                    <Box flex="1" borderRadius="xl" overflow="hidden">
                      {mounted && (
                        <GoogleMap
                          center={{ lat: -27.0945, lng: -52.6166 }}
                          zoom={13}
                          height="100%"
                          markers={markers}
                        />
                      )}
                    </Box>
                  </VStack>
                )}

                {sidebarSection === "unidades" && (
                  <VStack spacing={4} align="stretch" h="100%">
                    <Box>
                      <HStack justify="space-between" align="center" mb={2}>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="3xl" fontWeight="bold" color="white">
                            Lista de Unidades
                          </Text>
                          <Text color="gray.300" fontSize="lg">
                            Encontrados {postos.length} postos de saúde
                          </Text>
                        </VStack>
                        <Button 
                          colorPalette="teal" variant="solid"
                          size="lg"
                          onClick={() => setIsCreateModalOpen(true)}
                        >
                          + Adicionar Unidade
                        </Button>     
                      </HStack> 
                    </Box>

                    <Box flex="1" overflowY="auto">
                      <PostosList postos={postosComDecaimento} onUpdate={fetchPostos} />
                    </Box>
                  </VStack>
                )}

                {sidebarSection === "perfil" && (
                  <Box h="100%" overflowY="auto">
                    <UserProfile />
                  </Box>
                )}

                {sidebarSection === "dashboard" && (
                  <Box h="100%" w="100%" bg="rgba(30, 48, 63, 1)" overflowY="auto">
                    <Dashboard />
                  </Box>
                )}
                
              </>
            )}
          </Box>
        </Box>

      <PostoCreate
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchPostos}
      />
      <Toaster />
    </>
  );
}

export default function LobbyPage() {
  return (
    <SearchProvider>
      <Suspense fallback={
        <Box w="100%" h="100vh" bg="rgba(30, 48, 63, 1)" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="teal.500" />
        </Box>
      }>
        <LobbyContent />
      </Suspense>
    </SearchProvider>
  );
}
