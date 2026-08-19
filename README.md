## 🌟 Visão Geral

O **Nexus** é um boilerplate profissional de alta performance e fortemente tipado projetado para o desenvolvimento de sistemas complexos e aplicações web escaláveis. Desenvolvido sobre o ecossistema do React 19 e Next.js 16 (App Router), o template vem pré-configurado com a biblioteca de componentes **Bloom UI**, gerenciamento de estado leve com **Zustand**, sincronização e cache de servidor via **TanStack Query** e formulários validados com **React Hook Form + Zod**.

---

## 📦 Instalação & Uso via CLI

Você pode criar um novo projeto baseado neste boilerplate instantaneamente utilizando o inicializador CLI oficial do Nexus:

```bash
# Inicialize um novo projeto baseado no Nexus
pnpm create @guibus-nexus/nexus meu-sistema
# ou
npm create @guibus-nexus/nexus meu-sistema
```

A CLI guiará você por um fluxo de perguntas interativo para customizar o seu setup:
* **Nome do projeto:** Define a pasta e o nome da aplicação.
* **Internacionalização (i18n):** Escolha se deseja habilitar rotas e traduções com `next-intl`.
* **Suporte a Docker:** Adicione ou remova configurações de `Dockerfile` e `docker-compose.yml`.
* **GitHub Actions:** Mantenha ou remova os arquivos de CI/CD para automações no GitHub.
* **Gerenciador de pacotes:** Selecione entre `pnpm`, `npm`, `yarn` ou `bun` (a CLI fará a instalação automática das dependências caso decida).

### Comandos de Desenvolvimento

Após criar seu projeto e acessar o diretório, utilize os scripts abaixo para gerenciar a aplicação:

```bash
# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev

# Realize a validação estática de tipos
pnpm typecheck

# Execute a suíte de testes unitários (Vitest)
pnpm test

# Execute a suíte de testes E2E (Playwright)
pnpm test:e2e

# Realize a compilação otimizada para produção
pnpm build
```

---

## 🛠️ Stack Tecnológica

<div align="center">
  <img alt="React" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React.svg">
  <img alt="NextJS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/NextJS.svg">
  <img alt="Typescript" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg">
  <img alt="TailwindCSS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/TailwindCSS.svg">
  <img alt="Bloom" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Bloom.svg">
  <img alt="Framer Motion" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Framer%20Motion.svg">
  <img alt="React Hook Form" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Hook%20Form.svg">
  <img alt="Zod" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zod.svg">
  <img alt="Tanstack" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Tanstack.svg">
  <img alt="nextintl" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/nextintl.svg">
  <img alt="pnpm" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/pnpm.svg">
  <img alt="Vitest" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Vitest.svg">
  <img alt="Playwright" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Playwright.svg">
  <img alt="Husky" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Husky.svg">
  <img alt="Zustand" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zustand.svg">
</div>

---

## 🏛️ Arquitetura do Sistema

O Nexus adota o design orientado a **Features (Recursos)** para garantir o isolamento e modularização lógica de cada domínio de negócio:

```mermaid
graph TB
    subgraph App ["🌐 Application Core Layout"]
        Pages["📄 Next.js App Router (app/)"]
        Provider["⚙️ QueryProvider (React Query client)"]
        Switcher["🌍 LanguageSwitcher & ThemeToggle (pt/en)"]
    end

    subgraph Features ["🧩 Features Architecture (features/)"]
        SubFeature["src/features/<feature-name>/"]
        FComp["components/ (Exclusive UI)"]
        FHook["hooks/ (Custom Domain Logic)"]
        FServ["services/ (API Calls and Mutations)"]
        FStore["store/ (Zustand Domain State)"]
        FType["types/ (Domain Type Definitions)"]
    end

    subgraph Shared ["💎 Shared Global Services"]
        UI["📦 Bloom UI (@bloomui-react/components)"]
        GlobalsCSS["globals.css (@theme & CSS Variables)"]
    end

    subgraph CI ["🧪 Quality Gate"]
        Vitest["🧪 Vitest (Unit/Component Testing)"]
        Playwright["🎭 Playwright (E2E Smoke Tests)"]
    end

    Pages -->|Envolve com| Provider
    Pages -->|Renderiza| Switcher
    Pages -->|Importa do ponto de entrada das| SubFeature
    SubFeature --> FComp
    SubFeature --> FHook
    SubFeature --> FServ
    SubFeature --> FStore
    SubFeature --> FType
    
    FComp -->|Consome componentes globais do| UI
    Pages -->|Aplica estilos de| GlobalsCSS
    
    SubFeature -.->|Validado por| Vitest
    Pages -.->|Testado de ponta a ponta por| Playwright
```
