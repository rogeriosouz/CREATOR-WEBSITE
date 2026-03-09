import { Header } from "@/components/header";
import { NewProject } from "./components/new-project";
import { ListProjects } from "./components/list-projects";
import { ListCommunityProjects } from "./components/list-community-projects";
import { Helmet } from "react-helmet-async";
import { Browsers, Users } from "@phosphor-icons/react";

export function Applications() {
  return (
    <>
      <Helmet>
        <title>Meus projetos</title>
      </Helmet>

      <Header />

      <section className="w-full py-20 px-32 md:px-10">
        <div className="w-full flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Browsers className="size-5 md:size-7" weight="fill" />
            <h1 className="text-3xl font-bold md:text-xl">Meus projetos</h1>
          </div>

          <NewProject />
        </div>

        <ListProjects />

        {/* (not implemented!) <div className="mt-16 pt-16 border-t border-border/80">
          <div className="flex items-center gap-2 mb-6">
            <Users className="size-5 md:size-6" weight="fill" />
            <h2 className="text-xl font-semibold md:text-lg">
              Projetos da comunidade
            </h2>
          </div>
          <ListCommunityProjects />
        </div> */}
      </section>
    </>
  );
}
