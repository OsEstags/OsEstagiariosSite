import CalendarioEventos from "@/components/eventos"
import { Hero } from "@/components/hero"
import ParceirosCarousel from "@/components/parceiros-carousel"

export default function Home() {
  return (
    <main>
      <Hero />
      <CalendarioEventos/>
      < ParceirosCarousel/>
    </main>
  )
}

