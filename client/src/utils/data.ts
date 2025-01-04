export function formatarData(data: Date): string {
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]
  
    const diaDaSemana = diasDaSemana[data.getDay()]
    const dia = data.getDate()
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
  
    return `${diaDaSemana}, ${mes} ${dia}, ${ano}`
  }
  
  export function obterDiasDaSemana(): string[] {
    return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  }
  
  export function obterDiasDoMes(data: Date): number[] {
    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1)
    const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0)
    
    const dias: number[] = []
    

    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(i)
    }
    

    const espacosVazios = primeiroDia.getDay()
    for (let i = 0; i < espacosVazios; i++) {
      dias.unshift(0)
    }
    
    return dias
  }
  
  