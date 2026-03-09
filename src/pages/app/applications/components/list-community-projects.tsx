import { useQuery } from "@tanstack/react-query";
import { CardCommunityProject } from "./card-community-project";
import type { CommunityProject } from "./card-community-project";
import { CardProject } from "./card-project";

// Mock: projetos da comunidade - substituir por chamada à API quando disponível
const MOCK_COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: "comm-1",
    name: "Landing page responsiva",
    description: "Template moderno com HTML, CSS e JS puro.",
    author: "creator_user",
    likes: 42,
    updatedAt: new Date("2025-03-01"),
  },
  {
    id: "comm-2",
    name: "Portfólio dark mode",
    description: "Layout minimalista com troca de tema.",
    author: "dev_front",
    likes: 28,
    updatedAt: new Date("2025-02-28"),
  },
  {
    id: "comm-3",
    name: "Formulário com validação",
    description: "Exemplo de inputs e feedback visual.",
    author: "web_creator",
    likes: 15,
    updatedAt: new Date("2025-02-25"),
  },
];

async function fetchCommunityProjects(): Promise<CommunityProject[]> {
  // TODO: trocar por api.get('/projects/community') quando o endpoint existir
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_COMMUNITY_PROJECTS;
}

export function ListCommunityProjects() {
  const { data: projects = [], status } = useQuery({
    queryKey: ["/projects/community"],
    queryFn: fetchCommunityProjects,
    staleTime: 1000 * 60 * 5, // 5 min
  });

  if (status === "pending") {
    return (
      <div className="grid grid-cols-4 gap-7 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-muted/50 border border-border/50"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-6">
        Nenhum projeto da comunidade disponível no momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-7 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {projects.map((project) => (
        <CardProject key={project.id} project={project} isCommunity />
      ))}
    </div>
  );
}
