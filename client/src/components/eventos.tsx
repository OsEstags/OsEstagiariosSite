'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatarData, obterDiasDaSemana, obterDiasDoMes } from '../utils/data'

interface Evento {
  id: number
  titulo: string
  inicio: string
  fim: string
  descricao: string
  participantes: number | null
  endereco: {
    rua: string
    numero: string
    cep: string
    cidade: string
    estado: string
  }
  imagem: string
}

const eventos: Record<string, Evento[]> = {
  '2025-01-07': [
    {
      id: 6,
      titulo: 'Confraria Web3',
      inicio: 'Presencial',
      fim: 'São Paulo/SP',
      descricao: 'Evento para discutir as últimas tendências em Web3 e blockchain.',
      participantes: 50,
      endereco: {
        rua: 'Avenida Paulista',
        numero: '1000',
        cep: '01310-100',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      imagem: '/teste.png'
    },
  ],
  '2025-01-08': [
    {
      id: 7,
      titulo: 'Novidades do SQL Server, Fabric, AI e IoT anunciadas no Ignite 2024',
      inicio: 'Online',
      fim: '',
      descricao: 'Webinar sobre as últimas atualizações do Microsoft SQL Server e tecnologias relacionadas.',
      participantes: 200,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-01-09': [
    {
      id: 8,
      titulo: 'PHPSP Pub',
      inicio: 'Presencial',
      fim: 'São Paulo/SP',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-01-13': [
    {
      id: 9,
      titulo: 'Caminhos para uma Carreira em Cloud para Mulheres',
      inicio: 'Online',
      fim: '',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-01-15': [
    {
      id: 10,
      titulo: 'Princípios básicos e conceitos de nuvem',
      inicio: 'Online',
      fim: '',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-02-20': [
    {
      id: 11,
      titulo: 'FIAP Meetup - AI in Healthcare: maximizar eficiência e inovação na saúde com IA',
      inicio: 'Híbrido',
      fim: 'São Paulo/SP',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-04-10': [
    {
      id: 12,
      titulo: 'IAM Tech Day São Paulo 2025',
      inicio: 'Presencial',
      fim: 'São Paulo/SP',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-05-05': [
    {
      id: 13,
      titulo: 'GopherCon Brasil 2025',
      inicio: 'Presencial',
      fim: 'Florianópolis/SC',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-05-19': [
    {
      id: 14,
      titulo: 'XLIII Simpósio Brasileiro de Redes de Computadores - SBRC 2025',
      inicio: 'Presencial',
      fim: 'Natal/RN',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-07-20': [
    {
      id: 15,
      titulo: 'XLV Congresso da Sociedade Brasileira de Computação - CSBC 2025',
      inicio: 'Presencial',
      fim: 'Maceió/AL',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-09-01': [
    {
      id: 16,
      titulo: 'Simpósio Brasileiro de Cibersegurança - SBSeg 2025',
      inicio: 'Presencial',
      fim: 'Foz do Iguaçu/PR',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
  '2025-10-21': [
    {
      id: 17,
      titulo: 'Python Brasil 2025',
      inicio: 'Presencial',
      fim: 'São Paulo/SP',
      descricao: '',
      participantes: null,
      endereco: {
        rua: '',
        numero: '',
        cep: '',
        cidade: '',
        estado: ''
      },
      imagem: '/placeholder.svg?height=200&width=400'
    },
  ],
}

export default function CalendarioEventos() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date())
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().getDate())
  const diasDaSemana = obterDiasDaSemana()
  const diasDoMes = obterDiasDoMes(dataSelecionada)

  const mesAnterior = () => {
    setDataSelecionada(new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth() - 1, 1))
    setDiaSelecionado(1)
  }

  const proximoMes = () => {
    setDataSelecionada(new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth() + 1, 1))
    setDiaSelecionado(1)
  }

  const dataFormatada = `${dataSelecionada.toLocaleDateString('pt-BR', { month: 'long' })} ${dataSelecionada.getFullYear()}`

  const eventosDoDia = (dia: number) => {
    const data = new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), dia)
    const dataString = data.toISOString().split('T')[0]
    return eventos[dataString] || []
  }

  const selecionarDia = (dia: number) => {
    setDiaSelecionado(dia)
  }

  return (
    <div className="relative min-h-screen p-4 sm:p-8 overflow-hidden">
      {/* Elementos decorativos do fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#09e75e]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#5ce1e6]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute top-40 right-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#fd4ce0]/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <h1 className="mb-8 text-4xl sm:text-6xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-[#09e75e] via-[#5ce1e6] to-[#fd4ce0] text-transparent bg-clip-text animate-gradient-x">
            EVENTOS
          </span>
        </h1>
        
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <Card className="p-4 sm:p-6 bg-black/10 backdrop-blur-xl border-none">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-semibold capitalize text-foreground/90">{dataFormatada}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={mesAnterior} className="bg-black/20 border-none hover:bg-black/30">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={proximoMes} className="bg-black/20 border-none hover:bg-black/30">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {diasDaSemana.map((dia) => (
                <div key={dia} className="text-center font-semibold text-foreground/70">
                  {dia}
                </div>
              ))}
              {diasDoMes.map((dia, index) => {
                const temEventos = eventosDoDia(dia).length > 0
                const isHoje = 
                  dia === new Date().getDate() && 
                  dataSelecionada.getMonth() === new Date().getMonth() && 
                  dataSelecionada.getFullYear() === new Date().getFullYear()
                const isSelecionado = dia === diaSelecionado
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`h-8 sm:h-12 transition-all duration-300 hover:scale-105 ${
                          isHoje
                            ? 'bg-gradient-to-r from-[#09e75e] to-[#5ce1e6] text-primary-foreground hover:opacity-90'
                            : isSelecionado
                            ? 'bg-[#fd4ce0] text-primary-foreground hover:opacity-90'
                            : temEventos
                            ? 'border-2 border-[#5ce1e6]'
                            : 'bg-black/20 hover:bg-black/30'
                        }`}
                        onClick={() => selecionarDia(dia)}
                      >
                        {dia}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/80 border-none backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle className="text-foreground/90">
                          Eventos para {dia} de{' '}
                          {dataSelecionada.toLocaleDateString('pt-BR', { month: 'long' })}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        {eventosDoDia(dia).map((evento) => (
                          <Card key={evento.id} className="p-4 bg-black/50 border-none">
                            <h3 className="font-semibold text-foreground/90">{evento.titulo}</h3>
                            <p className="text-sm text-foreground/70">
                              {evento.inicio} - {evento.fim}
                            </p>
                            <p className="text-sm text-foreground/80">{evento.descricao}</p>
                            {evento.participantes && (
                              <p className="text-sm text-foreground/70">
                                {evento.participantes} participantes
                              </p>
                            )}
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-black/10 backdrop-blur-xl border-none">
            <h2 className="mb-4 text-xl font-semibold text-foreground/90">
              {formatarData(new Date(dataSelecionada.getFullYear(), dataSelecionada.getMonth(), diaSelecionado))}
            </h2>
            <ScrollArea className="h-[400px] sm:h-[600px]">
              <div className="grid gap-4">
                {eventosDoDia(diaSelecionado).map((evento) => (
                  <div key={evento.id} className="group relative">
                    <div className="flex items-start justify-between space-x-4 rounded-lg border border-[#5ce1e6]/20 p-4 hover:bg-black/20 transition-all duration-300">
                      <div>
                        <h3 className="font-semibold text-foreground/90">{evento.titulo}</h3>
                        <div className="text-sm text-foreground/70">
                          {evento.inicio} {evento.fim && `- ${evento.fim}`}
                        </div>
                        {evento.descricao && (
                          <p className="text-sm mt-1 text-foreground/80">{evento.descricao}</p>
                        )}
                        {evento.participantes && (
                          <p className="text-sm text-foreground/70 mt-1">
                            {evento.participantes} participantes
                          </p>
                        )}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gradient-to-r from-[#09e75e] to-[#5ce1e6] text-primary-foreground border-none hover:opacity-90 transition-all duration-300 hover:scale-105"
                          >
                            Detalhes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc border-none backdrop-blur-xl max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground/90">
                              {evento.titulo}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 mt-4">
                            <img
                              src={evento.imagem}
                              alt={`Capa do evento ${evento.titulo}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="text-foreground/80">
                              <p className="mb-2">{evento.descricao}</p>
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {evento.endereco.rua ? (
                                  <>
                                    {evento.endereco.rua}, {evento.endereco.numero} - {evento.endereco.cidade}, {evento.endereco.estado}
                                    <br />
                                    CEP: {evento.endereco.cep}
                                  </>
                                ) : (
                                  'Evento Online'
                                )}
                              </p>
                              <p className="mt-2">
                                <span className="font-semibold">Data e Hora:</span> {evento.inicio} {evento.fim && `- ${evento.fim}`}
                              </p>
                              {evento.participantes && (
                                <p className="mt-2">
                                  <span className="font-semibold">Participantes esperados:</span> {evento.participantes}
                                </p>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  )
}

