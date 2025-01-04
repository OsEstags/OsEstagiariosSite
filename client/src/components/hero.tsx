import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20 sm:py-32">
      {/* Elementos decorativos do fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#09e75e]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#5ce1e6]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute top-40 right-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#fd4ce0]/25 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#09e75e] via-[#5ce1e6] to-[#fd4ce0] text-transparent bg-clip-text animate-gradient-x">
                Abrindo seus horizontes no mundo da tecnologia
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0">
            Na Comunidade Os Estagiários, unimos jovens talentos para transformar sonhos em conquistas na área de tecnologia. Com eventos gratuitos, dicas práticas de carreira e conexões poderosas, criamos um espaço onde você pode descobrir seu potencial, desenvolver habilidades e dar passos confiantes na sua jornada. Junte-se a nós e seja parte de uma comunidade que acredita no poder da união para construir um futuro brilhante na tecnologia!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#09e75e] to-[#5ce1e6] hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                Participe Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-all duration-300 hover:scale-105"
              >
                Nossos Eventos
              </Button>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div
              className="w-full aspect-square bg-gradient-to-b from-[#09e75e]/25 to-transparent rounded-full animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="w-4/5 h-3/5 bg-black/20 blur-xl rounded-full" />
            </div>
            <img
              src="/osestagiarios.png"
              alt="Ilustração da Equipe"
              className="absolute inset-0 w-full h-full object-contain  select-none"

            />
          </div>
        </div>
      </div>
    </div>
  );
}
