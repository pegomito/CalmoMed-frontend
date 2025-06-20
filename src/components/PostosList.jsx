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
import { useState } from "react";
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'baixa': return 'green';
      case 'média': return 'yellow';
      case 'alta': return 'orange';
      case 'crítica': return 'red';
      default: return 'gray';
    }
  };

  return (
    <VStack spacing={6} align="stretch" h="100%">
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
          Postos de Saúde - Chapecó/SC
        </Text>
        <Text color="gray.300" fontSize="md">
          Monitore a lotação em tempo real das UBS e ESF da região.
        </Text>
      </Box>

      <Box>
        <Input
          placeholder="Buscar por nome ou endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          color="white"
        />
      </Box>

      <Box flex="1">
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
          {simplePostos.map((posto) => (
            <Box
              key={posto.id}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              p={4}
              _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
            >
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    {posto.nome}
                  </Text>
                  <Badge colorScheme={getStatusColor(posto.lotacao)}>
                    {posto.lotacao}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.400">
                  {posto.endereco}
                </Text>
                <Button size="sm" variant="ghost" color="teal.300">
                  Ver Detalhes
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </VStack>
  );
}
