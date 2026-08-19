# @guibus-nexus/create-nexus

> O inicializador oficial de linha de comando (CLI) para criar novos projetos utilizando o template **Nexus Boilerplate**.

## 🚀 Como Usar

Para criar um novo projeto baseado no Nexus, basta rodar o comando abaixo no seu terminal (não é necessário instalar o pacote globalmente):

```bash
# Usando pnpm (Recomendado)
pnpm create @guibus-nexus/nexus meu-projeto

# Usando npm
npm create @guibus-nexus/nexus meu-projeto

# Usando yarn
yarn create @guibus-nexus/nexus meu-projeto

# Usando bun
bun create @guibus-nexus/nexus meu-projeto
```

A CLI iniciará um fluxo interativo de perguntas para configurar a estrutura de acordo com as necessidades da sua aplicação:

* **Internacionalização (i18n):** Adicione suporte a múltiplos idiomas de forma nativa com `next-intl`.
* **Suporte a Docker:** Adicione arquivos `Dockerfile` e `docker-compose.yml` otimizados.
* **GitHub Actions:** Mantenha automações prontas de CI/CD para deploy/testes.
* **TanStack Query & Devtools:** Habilite o gerenciamento de estados assíncronos e cache.
* **Regras de IA (setup-ai):** Configure assistentes como Antigravity, Cursor ou Copilot para entender toda a estrutura do seu projeto.
* **Gerenciador de Pacotes:** Escolha seu instalador favorito (`pnpm`, `npm`, `yarn` ou `bun`).

---

Para saber mais detalhes sobre a arquitetura do projeto e componentes do **Bloom UI**, consulte o repositório principal do [Nexus](https://github.com/gui-bus/Nexus).
