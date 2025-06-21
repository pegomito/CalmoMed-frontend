'use client';
import { 
  VStack, 
  Input,
  Text, 
  Box,
  Grid,
  Badge,
  Button,
  HStack,
  Select
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
// Temporarily remove import to test
// import PostoCard from "./PostoCardSimple";

// Dados mockados dos postos
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

// Simple posto data
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

  // Usar os dados completos em vez dos simples
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
      {/* Header */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
          Postos de Saúde - Chapecó/SC
        </Text>
        <Text color="gray.300" fontSize="md">
          Monitore a lotação em tempo real das UBS e ESF da região.
        </Text>
      </Box>

      {/* Stats */}
      <HStack spacing={4} flexWrap="wrap">
        <Badge colorScheme="green" px={3} py={1} borderRadius="md">
          Baixa: {getStatsCount('baixa')}
        </Badge>
        <Badge colorScheme="yellow" px={3} py={1} borderRadius="md">
          Média: {getStatsCount('média')}
        </Badge>
        <Badge colorScheme="orange" px={3} py={1} borderRadius="md">
          Alta: {getStatsCount('alta')}
        </Badge>
        <Badge colorScheme="red" px={3} py={1} borderRadius="md">
          Crítica: {getStatsCount('crítica')}
        </Badge>
      </HStack>

      {/* Filtros */}
      <HStack spacing={4} flexWrap="wrap">
        <Box flex="1" minW="200px">
          <Input
            placeholder="Buscar por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            color="white"
            _placeholder={{ color: "gray.400" }}
            _focus={{ 
              borderColor: "teal.300",
              bg: "rgba(255, 255, 255, 0.15)"
            }}
          />
        </Box>
        <Box minW="150px">
          <Text fontSize="sm" color="gray.400" mb={2}>Filtrar por lotação:</Text>
          <HStack spacing={2} flexWrap="wrap">
            <Button 
              size="sm" 
              variant={filterLotacao === "" ? "solid" : "ghost"}
              colorScheme="teal"
              onClick={() => setFilterLotacao("")}
            >
              Todos
            </Button>
            <Button 
              size="sm" 
              variant={filterLotacao === "baixa" ? "solid" : "ghost"}
              colorScheme="green"
              onClick={() => setFilterLotacao("baixa")}
            >
              Baixa
            </Button>
            <Button 
              size="sm" 
              variant={filterLotacao === "média" ? "solid" : "ghost"}
              colorScheme="yellow"
              onClick={() => setFilterLotacao("média")}
            >
              Média
            </Button>
            <Button 
              size="sm" 
              variant={filterLotacao === "alta" ? "solid" : "ghost"}
              colorScheme="orange"
              onClick={() => setFilterLotacao("alta")}
            >
              Alta
            </Button>
            <Button 
              size="sm" 
              variant={filterLotacao === "crítica" ? "solid" : "ghost"}
              colorScheme="red"
              onClick={() => setFilterLotacao("crítica")}
            >
              Crítica
            </Button>
          </HStack>
        </Box>
        <Box minW="150px">
          <Text fontSize="sm" color="gray.400" mb={2}>Filtrar por tipo:</Text>
          <HStack spacing={2} flexWrap="wrap">
            <Button 
              size="sm" 
              variant={filterTipo === "" ? "solid" : "ghost"}
              colorScheme="teal"
              onClick={() => setFilterTipo("")}
            >
              Todos
            </Button>
            <Button 
              size="sm" 
              variant={filterTipo === "Unidade Básica de Saúde" ? "solid" : "ghost"}
              colorScheme="blue"
              onClick={() => setFilterTipo("Unidade Básica de Saúde")}
            >
              UBS
            </Button>
            <Button 
              size="sm" 
              variant={filterTipo === "Estratégia Saúde da Família" ? "solid" : "ghost"}
              colorScheme="purple"
              onClick={() => setFilterTipo("Estratégia Saúde da Família")}
            >
              ESF
            </Button>
          </HStack>
        </Box>
      </HStack>

      {/* Lista de Postos */}
      <Box flex="1" overflowY="auto">
        {filteredPostos.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.400" fontSize="lg">
              Nenhum posto encontrado com os filtros aplicados.
            </Text>
          </Box>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4}>
            {filteredPostos.map((posto) => (
              <Box
                key={posto.id}
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                border="1px solid rgba(255, 255, 255, 0.2)"
                p={4}
                transition="all 0.3s ease"
                _hover={{ 
                  transform: "translateY(-2px)", 
                  boxShadow: "xl",
                  bg: "rgba(255, 255, 255, 0.15)"
                }}
                cursor="pointer"
                onClick={() => openModal(posto)}
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
                      openModal(posto);
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </HStack>
              </Box>
            ))}
          </Grid>
        )}
      </Box>

      {/* Modal de Detalhes */}
      {isModalOpen && selectedPosto && (
        <>
          {/* Backdrop */}
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
          
          {/* Modal Content */}
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
            {/* Header */}
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

            {/* Body */}
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

            {/* Footer */}
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
