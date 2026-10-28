export interface Badge {
  code: string
  title: string
  description: string
  icon: string
}

export const AVAILABLE_BADGES: Record<string, Badge> = {
  FIRST_STEP: {
    code: 'FIRST_STEP',
    title: 'Primeiro Passo',
    description: 'Registrou sua primeira movimentação no GranaXP.',
    icon: '🚀'
  },
  SAVINGS_MASTER: {
    code: 'SAVINGS_MASTER',
    title: 'Guardião do Ouro',
    description: 'Bateu a primeira meta financeira cadastrada.',
    icon: '🛡️'
  },
  XP_HUNTER: {
    code: 'XP_HUNTER',
    title: 'Subindo de Elo',
    description: 'Alcançou o Nível 3 no GranaXP.',
    icon: '⚡'
  },
  WEEK_WARRIOR: {
    code: 'WEEK_WARRIOR',
    title: 'Semana Sob Controle',
    description: 'Manteve despesas abaixo das receitas no resumo semanal.',
    icon: '🔥'
  }
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function getMotivationalQuote(balance: number, xp: number): string {
  if (balance < 0) {
    return 'Momento de ajustar as velas. Economize hoje para acelerar sua barra de XP amanhã!'
  }
  if (xp > 300) {
    return 'Ritmo de mestre! Sua constância financeira está abrindo os caminhos para o topo.'
  }
  return 'Cada real sob controle é um ponto de experiência somado ao seu futuro.'
}