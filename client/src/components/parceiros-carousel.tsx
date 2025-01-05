'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function CarrosselParceiros() {
  const [isPausado, setIsPausado] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)


  // Array de parceiros com suas logos e links
  const parceiros = [
    {
      nome: 'Cloud Girls',
      logo: '/cloud_girls_br_logo.jpg',
      cor: '#9B51E0',
      link: 'https://cloudgirls.com.br'
    },
    {
      nome: 'Pull Recast',
      logo: '/pull_recast_logo.jpg',
      cor: '#FF6B00',
      link: 'https://pullrecast.dev'
    },
    {
      nome: 'Instituto PROA',
      logo: '/proa.png',
      cor: '#002b87',
      link: 'https://proa.org'
    },
    {
      nome: 'Itaú Unibanco',
      logo: '/itau.png',
      cor: '#0066CC',
      link: 'https://nestle.com.br'
    },
  ]

  // Duplicar array para criar efeito infinito
  const todosParceiros = [...parceiros, ...parceiros, ...parceiros]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    let startTime: number | null = null
    const duration = 30000 // 30 segundos para uma volta completa

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      
      if (!isPausado) {
        const translateX = (progress % duration) / duration * -100
        container.style.transform = `translateX(${translateX}%)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPausado])

  if (!mounted) return null

  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-500 dark:bg-black/20 bg-white/20">
      {/* Efeito de Gradiente Flutuante */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-[#09e75e] blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute right-0 top-20 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-[#5ce1e6] blur-[80px] sm:blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 -translate-x-1/2 rounded-full bg-[#fd4ce0] blur-[80px] sm:blur-[100px] md:blur-[120px]" />
      </div>

      <div className="relative mx-auto">
        <div className="mb-8 sm:mb-12 md:mb-16 text-center px-4">
          <h2 className="mb-2 sm:mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#09e75e] via-[#5ce1e6] to-[#fd4ce0] bg-clip-text text-transparent">
            Nossos Parceiros e Apoiadores
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg dark:text-gray-300 text-gray-600">
            Empresas que confiam e apoiam nosso trabalho, juntos construindo um futuro melhor
          </p>
        </div>
        
        <div className="relative overflow-hidden py-8 sm:py-12 md:py-16">
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 transition-transform duration-1000 ease-linear"
            onMouseEnter={() => setIsPausado(true)}
            onMouseLeave={() => setIsPausado(false)}
            onTouchStart={() => setIsPausado(true)}
            onTouchEnd={() => setIsPausado(false)}
          >
            {todosParceiros.map((parceiro, index) => (
              <Link
                key={`${parceiro.nome}-${index}`}
                href={parceiro.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative min-w-[180px] sm:min-w-[220px] md:min-w-[250px] rounded-xl backdrop-blur-sm 
                         transition-all duration-500 hover:scale-105
                         dark:bg-white/5 dark:hover:bg-white/10
                         bg-white/5 hover:bg-black/10"
                style={{
                  boxShadow: isPausado ? `0 0 20px ${parceiro.cor}20` : 'none'
                }}
              >
                <div className="relative flex h-[130px] sm:h-[160px] md:h-[180px] w-[180px] sm:w-[220px] md:w-[250px] items-center justify-center p-4 sm:p-5 md:p-6">
                  <Image
                    src={parceiro.logo}
                    alt={`Logo ${parceiro.nome}`}
                    fill
                    className="object-contain rounded  p-2 sm:p-3 md:p-4  transition-transform duration-500 
                             group-hover:scale-110 dark:brightness-100 brightness-75"
                  />
                </div>
                <div className="absolute -bottom-2  left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5ce1e6] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                
                {/* Nome do Parceiro com Efeito de Fade */}
                <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-0 right-0 text-center transition-all duration-500 group-hover:-bottom-6 sm:group-hover:-bottom-8 md:group-hover:-bottom-10">
                  <p className="text-xs sm:text-sm md:text-base font-medium bg-gradient-to-r from-[#09e75e] via-[#5ce1e6] to-[#fd4ce0] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {parceiro.nome}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Gradientes nas bordas */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white dark:from-black to-transparent opacity-90" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white dark:from-black to-transparent opacity-90" />
        </div>
      </div>
    </section>
  )
}

