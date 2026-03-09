import { Button } from "@/components/ui/button";
import { Browsers } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="w-full mt-24 sm:mt-16 flex sm:px-5 items-center justify-center flex-col max-w-[900px] mx-auto space-y-6 text-center">
      <h1
        className="font-black tracking-tight text-7xl leading-[1.02] sm:text-5xl uppercase
      "
      >
        Construa páginas web incríveis,{" "}
        <span className="text-primary">rápido</span> e sem complicação.
      </h1>

      <p className="text-muted-foreground text-lg sm:text-base leading-relaxed max-w-[720px]">
        Um editor online completo para{" "}
        <span className="text-foreground">HTML</span>,{" "}
        <span className="text-foreground">CSS</span> e{" "}
        <span className="text-foreground">JavaScript</span> — com preview em
        tempo real e projetos salvos na sua conta.
      </p>

      <div className="sm:w-full sm:flex-col flex items-center justify-center gap-3">
        <Button asChild size="lg" variant="default" className="gap-2 px-6">
          <Link to="/auth/login">
            <Browsers className="size-5" /> Começar agora
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline" className="px-6">
          <Link to="/auth/login">Ver recursos</Link>
        </Button>
      </div>
    </section>
  );
}
