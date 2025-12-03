/**
 * Utilitário para cálculo de decaimento automático de lotação
 * 
 * Regras de Negócio:
 * - Tempo médio de atendimento: 15 minutos por pessoa
 * - Lotação Baixa: ≤ 5 pessoas
 * - Lotação Média: 6 a 15 pessoas
 * - Lotação Alta: > 15 pessoas
 * - Fórmula: pessoasAtendidas = Math.floor(minutosDecorridos / 15)
 * - Nova fila: Math.max(0, filaAtual - pessoasAtendidas)
 */

const TEMPO_ATENDIMENTO_MINUTOS = 15;

/**
 * Calcula o decaimento de lotação baseado no tempo desde a última atualização
 * @param {Object} posto - Objeto do posto com crowding_info
 * @returns {Object} Posto com dados atualizados + metadados do decaimento
 */
export function calcularDecaimentoLocal(posto) {
  // Se não houver dados de crowding_info ou lastUpdated, retorna posto original
  if (!posto.crowding_info || !posto.crowding_info.lastUpdated) {
    return {
      ...posto,
      decaimento: {
        aplicado: false,
        motivo: 'Sem dados de última atualização',
        filaAtual: posto.crowding_info?.reportedQueue || 0,
        nivel: 'baixa',
        pessoasAtendidas: 0,
        minutosDesdeAtualizacao: 0
      }
    };
  }

  // ✅ PASSO 1: Calcular tempo desde última atualização
  const now = new Date();
  const lastUpdate = new Date(posto.crowding_info.lastUpdated);
  const minutesSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);

  // ✅ PASSO 2: Calcular quantas pessoas foram atendidas
  const peopleServed = Math.floor(minutesSinceUpdate / TEMPO_ATENDIMENTO_MINUTOS);

  // ✅ PASSO 3: Reduzir fila (mínimo 0)
  const currentPeople = posto.crowding_info.reportedQueue || 0;
  const newPeopleCount = Math.max(0, currentPeople - peopleServed);

  // ✅ PASSO 4: Determinar novo nível de lotação
  let newLevel;
  if (newPeopleCount <= 5) {
    newLevel = 'baixa';
  } else if (newPeopleCount <= 15) {
    newLevel = 'média';
  } else {
    newLevel = 'alta';
  }

  // ✅ PASSO 5: Calcular nova porcentagem de ocupação
  const newOccupancyPercentage = newLevel === 'baixa' ? 20 : newLevel === 'média' ? 50 : 80;

  // Retornar posto com dados atualizados
  return {
    ...posto,
    crowding_info: {
      ...posto.crowding_info,
      reportedQueue: newPeopleCount,
      currentOccupancy: newPeopleCount,
      occupancyPercentage: newOccupancyPercentage
    },
    decaimento: {
      aplicado: peopleServed > 0,
      filaOriginal: currentPeople,
      filaAtual: newPeopleCount,
      nivel: newLevel,
      pessoasAtendidas: peopleServed,
      minutosDesdeAtualizacao: Math.round(minutesSinceUpdate),
      ultimaAtualizacao: posto.crowding_info.lastUpdated,
      calculadoEm: now.toISOString()
    }
  };
}

/**
 * Aplica decaimento a uma lista de postos
 * @param {Array} postos - Array de postos
 * @returns {Array} Array de postos com decaimento aplicado
 */
export function aplicarDecaimentoEmLote(postos) {
  if (!Array.isArray(postos)) {
    return [];
  }

  return postos.map(posto => calcularDecaimentoLocal(posto));
}

/**
 * Obtém informações de lotação formatadas
 * @param {Object} posto - Posto com ou sem decaimento aplicado
 * @returns {Object} Informações de lotação formatadas
 */
export function obterInfoLotacao(posto) {
  const filaAtual = posto.crowding_info?.reportedQueue || 0;
  const decaimento = posto.decaimento;

  let nivel = 'baixa';
  if (filaAtual > 15) {
    nivel = 'alta';
  } else if (filaAtual > 5) {
    nivel = 'média';
  }

  return {
    filaAtual,
    nivel,
    ocupacaoPercentual: posto.crowding_info?.occupancyPercentage || 0,
    decaimentoAplicado: decaimento?.aplicado || false,
    pessoasAtendidas: decaimento?.pessoasAtendidas || 0,
    minutosDesdeAtualizacao: decaimento?.minutosDesdeAtualizacao || 0
  };
}

