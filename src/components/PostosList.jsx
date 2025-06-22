'use client';
import { 
  VStack, 
  Input,
  Text, 
  Box,
  Grid,
  Badge,
  Button,
  HStack
} from "@chakra-ui/react";
import { useState, useMemo } from "react";

const postosData = [
  {
    id: 1,
    nome: "UBS Centro",
    tipo: "Unidade Básica de Saúde",
    endereco: "Av. Getúlio Vargas, 1200 - Centro, Chapecó - SC",
    lotacao: "média",
    atendimentosHoje: 47,
    filaEspera: 8,
    tempoMedio: "25min",
    capacidade: "80/dia",
    ultimaAtualizacao: "5min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Atendimento normal. Recomendamos agendamento prévio.",
    servicos: [
      "Consultas médicas",
      "Vacinação",
      "Curativo",
      "Aferição de pressão",
      "Coleta de exames"
    ]
  },
  {
    id: 2,
    nome: "UBS São Pedro",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua Marechal Bormann, 850 - São Pedro, Chapecó - SC",
    lotacao: "alta",
    atendimentosHoje: 62,
    filaEspera: 15,
    tempoMedio: "45min",
    capacidade: "70/dia",
    ultimaAtualizacao: "2min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Alta demanda hoje. Tempo de espera acima do normal.",
    servicos: [
      "Consultas médicas",
      "Pediatria",
      "Vacinação",
      "Pré-natal",
      "Curativo"
    ]
  },
  {
    id: 3,
    nome: "UBS Efapi",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua Lauro Müller, 1578 - Efapi, Chapecó - SC",
    lotacao: "baixa",
    atendimentosHoje: 23,
    filaEspera: 3,
    tempoMedio: "15min",
    capacidade: "60/dia",
    ultimaAtualizacao: "1min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: null,
    servicos: [
      "Consultas médicas",
      "Vacinação",
      "Curativo",
      "Aferição de pressão"
    ]
  },
  {
    id: 4,
    nome: "UBS Passo dos Fortes",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua Coronel Ernesto Francisco Bertaso, 123 - Passo dos Fortes, Chapecó - SC",
    lotacao: "crítica",
    atendimentosHoje: 89,
    filaEspera: 25,
    tempoMedio: "60min",
    capacidade: "90/dia",
    ultimaAtualizacao: "3min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Unidade com lotação crítica. Considerem outras opções próximas.",
    servicos: [
      "Consultas médicas",
      "Ginecologia",
      "Vacinação",
      "Pré-natal",
      "Curativo",
      "Coleta de exames"
    ]
  },
  {
    id: 5,
    nome: "UBS Santa Maria",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua Benjamin Constant, 456 - Santa Maria, Chapecó - SC",
    lotacao: "média",
    atendimentosHoje: 41,
    filaEspera: 7,
    tempoMedio: "30min",
    capacidade: "75/dia",
    ultimaAtualizacao: "8min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Atendimento funcionando normalmente.",
    servicos: [
      "Consultas médicas",
      "Vacinação",
      "Curativo",
      "Aferição de pressão",
      "Teste rápido"
    ]
  },
  {
    id: 6,
    nome: "UBS Jardim América",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua Nereu Ramos, 789 - Jardim América, Chapecó - SC",
    lotacao: "baixa",
    atendimentosHoje: 18,
    filaEspera: 2,
    tempoMedio: "20min",
    capacidade: "65/dia",
    ultimaAtualizacao: "4min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: null,
    servicos: [
      "Consultas médicas",
      "Vacinação",
      "Curativo",
      "Aferição de pressão"
    ]
  },
  {
    id: 7,
    nome: "UBS São Cristóvão",
    tipo: "Unidade Básica de Saúde",
    endereco: "Rua São Paulo, 321 - São Cristóvão, Chapecó - SC",
    lotacao: "alta",
    atendimentosHoje: 58,
    filaEspera: 12,
    tempoMedio: "40min",
    capacidade: "70/dia",
    ultimaAtualizacao: "6min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Demanda elevada no período da manhã.",
    servicos: [
      "Consultas médicas",
      "Pediatria",
      "Vacinação",
      "Curativo",
      "Coleta de exames"
    ]
  },
  {
    id: 8,
    nome: "ESF Bela Vista",
    tipo: "Estratégia Saúde da Família",
    endereco: "Rua das Palmeiras, 654 - Bela Vista, Chapecó - SC",
    lotacao: "baixa",
    atendimentosHoje: 16,
    filaEspera: 1,
    tempoMedio: "18min",
    capacidade: "50/dia",
    ultimaAtualizacao: "7min",
    horarioFuncionamento: "Segunda a Sexta: 7h às 17h",
    mensagem: "Unidade com disponibilidade para atendimento.",
    servicos: [
      "Consultas médicas",
      "Vacinação",
      "Pré-natal",
      "Curativo",
      "Visita domiciliar"
    ]
  }
];

const simplePostos = [
  {
    id: 1,
    nome: "UBS Centro",
    endereco: "Av. Getúlio Vargas, 1200 - Centro",
    lotacao: "média"
  },
  {
    id: 2,
    nome: "UBS São Pedro", 
    endereco: "Rua Marechal Bormann, 850 - São Pedro",
    lotacao: "alta"
  }
];

export default function PostosList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLotacao, setFilterLotacao] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [selectedPosto, setSelectedPosto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPostos = useMemo(() => {
    return postosData.filter(posto => {
      const matchesSearch = posto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           posto.endereco.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLotacao = filterLotacao === "" || posto.lotacao === filterLotacao;
      
      const matchesTipo = filterTipo === "" || posto.tipo === filterTipo;

      return matchesSearch && matchesLotacao && matchesTipo;
    });
  }, [searchTerm, filterLotacao, filterTipo]);

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

  const openModal = (posto) => {
    setSelectedPosto(posto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPosto(null);
  };

  const getStatsCount = (status) => {
    return postosData.filter(posto => posto.lotacao === status).length;
  };

  return (
    <VStack spacing={6} align="stretch" h="100%">
      <Box mb={5}>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={3}>
          🏥 Postos de Saúde - Chapecó/SC
        </Text>
        
        <HStack spacing={3} mb={4}>
          <Badge colorScheme="green" px={3} py={2} borderRadius="full" fontSize="sm">
            Baixa: {getStatsCount('baixa')}
          </Badge>
          <Badge colorScheme="yellow" px={3} py={2} borderRadius="full" fontSize="sm">
            Média: {getStatsCount('média')}
          </Badge>
          <Badge colorScheme="orange" px={3} py={2} borderRadius="full" fontSize="sm">
            Alta: {getStatsCount('alta')}
          </Badge>
          <Badge colorScheme="red" px={3} py={2} borderRadius="full" fontSize="sm">
            Crítica: {getStatsCount('crítica')}
          </Badge>
        </HStack>
      </Box>

      <VStack spacing={4} align="stretch" mb={5}>
        <Input
          placeholder="Buscar posto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="rgba(255, 255, 255, 0.08)"
          border="1px solid rgba(255, 255, 255, 0.15)"
          color="white"
          size="md"
          h="45px"
          borderRadius="xl"
          _placeholder={{ color: "gray.400" }}
          _focus={{ 
            borderColor: "teal.300",
            bg: "rgba(255, 255, 255, 0.12)"
          }}
        />
        
        <HStack spacing={6} flexWrap="wrap">
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.400" fontWeight="semibold">Lotação:</Text>
            <Badge 
              as="button"
              colorScheme="teal" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterLotacao("")}
              opacity={filterLotacao === "" ? 1 : 0.6}
            >
              Todos
            </Badge>
            <Badge 
              as="button"
              colorScheme="green" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterLotacao("baixa")}
              opacity={filterLotacao === "baixa" ? 1 : 0.6}
            >
              Baixa
            </Badge>
            <Badge 
              as="button"
              colorScheme="yellow" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterLotacao("média")}
              opacity={filterLotacao === "média" ? 1 : 0.6}
            >
              Média
            </Badge>
            <Badge 
              as="button"
              colorScheme="orange" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterLotacao("alta")}
              opacity={filterLotacao === "alta" ? 1 : 0.6}
            >
              Alta
            </Badge>
            <Badge 
              as="button"
              colorScheme="red" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterLotacao("crítica")}
              opacity={filterLotacao === "crítica" ? 1 : 0.6}
            >
              Crítica
            </Badge>
          </HStack>

          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.400" fontWeight="semibold">Tipo:</Text>
            <Badge 
              as="button"
              colorScheme="teal" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterTipo("")}
              opacity={filterTipo === "" ? 1 : 0.6}
            >
              Todos
            </Badge>
            <Badge 
              as="button"
              colorScheme="blue" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterTipo("Unidade Básica de Saúde")}
              opacity={filterTipo === "Unidade Básica de Saúde" ? 1 : 0.6}
            >
              UBS
            </Badge>
            <Badge 
              as="button"
              colorScheme="purple" 
              px={3} 
              py={1} 
              borderRadius="full" 
              fontSize="sm"
              cursor="pointer"
              onClick={() => setFilterTipo("Estratégia Saúde da Família")}
              opacity={filterTipo === "Estratégia Saúde da Família" ? 1 : 0.6}
            >
              ESF
            </Badge>
          </HStack>
        </HStack>
      </VStack>

      <Box flex="1" overflowY="auto">
        {filteredPostos.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.400" fontSize="lg">
              Nenhum posto encontrado com os filtros aplicados.
            </Text>
          </Box>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(320px, 1fr))" gap={4}>
            {filteredPostos.map((posto) => (
              <Box
                key={posto.id}
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                p={4}
                transition="all 0.2s ease"
                _hover={{ 
                  bg: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
                }}
                cursor="pointer"
                onClick={() => openModal(posto)}
              >
                <HStack justify="space-between" align="center" mb={2}>
                  <HStack spacing={3}>
                    <Text fontSize="2xl">🏥</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="lg" fontWeight="bold" color="white" noOfLines={1}>
                        {posto.nome}
                      </Text>
                      <Text fontSize="sm" color="gray.400" noOfLines={1}>
                        {posto.endereco}
                      </Text>
                    </VStack>
                  </HStack>
                  <Box
                    w="10px"
                    h="10px"
                    borderRadius="50%"
                    bg={posto.lotacao === 'baixa' ? '#22c55e' : posto.lotacao === 'média' ? '#eab308' : posto.lotacao === 'alta' ? '#f97316' : '#ef4444'}
                  />
                </HStack>

                <HStack justify="space-between" align="center">
                  <Text fontSize="sm" color="gray.400">
                    Lotação {posto.lotacao}
                  </Text>
                  <Text fontSize="sm" color="teal.300" fontWeight="semibold">
                    Ver mais →
                  </Text>
                </HStack>
              </Box>
            ))}
          </Grid>
        )}
      </Box>

      {isModalOpen && selectedPosto && (
        <>
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
            <Box p={6} borderBottom="1px solid" borderColor="gray.200">
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between" align="flex-start">
                  <Text fontSize="xl" fontWeight="bold">
                    {selectedPosto.nome}
                  </Text>
                  <HStack spacing={2}>
                    <Badge 
                      colorScheme={getStatusColor(selectedPosto.lotacao)} 
                      fontSize="sm"
                      px={3} 
                      py={1}
                      borderRadius="md"
                    >
                      {getStatusText(selectedPosto.lotacao)}
                    </Badge>
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
                </HStack>
                <Text fontSize="md" color="gray.600">
                  {selectedPosto.tipo}
                </Text>
              </VStack>
            </Box>

            <Box p={6} overflowY="auto" maxH="60vh">
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                    Endereço
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {selectedPosto.endereco}
                  </Text>
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Atendimentos Hoje</Text>
                    <Text fontSize="2xl" color="blue.600" fontWeight="bold">
                      {selectedPosto.atendimentosHoje}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Fila de Espera</Text>
                    <Text fontSize="2xl" color="orange.600" fontWeight="bold">
                      {selectedPosto.filaEspera}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Tempo Médio</Text>
                    <Text fontSize="2xl" color="purple.600" fontWeight="bold">
                      {selectedPosto.tempoMedio}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={1}>Capacidade</Text>
                    <Text fontSize="2xl" color="green.600" fontWeight="bold">
                      {selectedPosto.capacidade}
                    </Text>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                    Horário de Funcionamento
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {selectedPosto.horarioFuncionamento}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                    Serviços Disponíveis
                  </Text>
                  <VStack align="stretch" spacing={1}>
                    {selectedPosto.servicos?.map((servico, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        • {servico}
                      </Text>
                    ))}
                  </VStack>
                </Box>

                {selectedPosto.mensagem && (
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
                      {selectedPosto.mensagem}
                    </Text>
                  </Box>
                )}

                <Box>
                  <Text fontSize="xs" color="gray.500">
                    Última atualização: há {selectedPosto.ultimaAtualizacao}
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box p={6} borderTop="1px solid" borderColor="gray.200">
              <HStack justify="flex-end">
                <Button onClick={closeModal} colorScheme="gray">
                  Fechar
                </Button>
              </HStack>
            </Box>
          </Box>
        </>
      )}
    </VStack>
  );
}
