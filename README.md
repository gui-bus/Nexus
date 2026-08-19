<div align="center">
  <br/>
  <br/>
  <img src="https://github.com/gui-bus/TechIcons/blob/main/techicons_logo.svg" alt="NEXUS Logo" width="280" />
  <br/>
  <br/>
  <p>
    🇺🇸 <a href="./README.en.md">English Version</a> | 🇧🇷 <strong>Versão em Português</strong>
  </p>
</div>

<br />

## 🌟 Visão Geral

O **Nexus** é um boilerplate profissional de alta performance e fortemente tipado projetado para o desenvolvimento de sistemas complexos e aplicações web escaláveis. Desenvolvido sobre o ecossistema do React 19 e Next.js 16 (App Router), o template vem pré-configurado com a biblioteca de componentes **Bloom UI**, gerenciamento de estado leve com **Zustand**, sincronização e cache de servidor via **TanStack Query** e formulários validados com **React Hook Form + Zod**.

Toda a arquitetura é estruturada de forma modular orientada a **Features/Módulos**, facilitando a manutenção e garantindo a consistência completa de temas claro/escuro e acessibilidade nativa.

---

## 📦 Instalação & Uso via CLI

<div align="center">
  <a href="https://github.com/guibus-nexus/create-nexus">
    <img src="https://img.shields.io/github/actions/workflow/status/gui-bus/Template/ci.yml?branch=main&style=for-the-badge&logo=github&label=Build" alt="CI Build Status" />
  </a>
  <a href="https://www.npmjs.com/package/@guibus-nexus/create-nexus">
    <img src="https://img.shields.io/npm/v/@guibus-nexus/create-nexus?style=for-the-badge&color=cb3837&logo=npm&logoColor=white&label=CLI" alt="CLI Version" />
  </a>
</div>

<br />

Você pode criar um novo projeto baseado neste boilerplate instantaneamente utilizando o inicializador CLI oficial do Nexus:

```bash
# Inicialize um novo projeto baseado no Nexus
pnpm create @guibus-nexus/nexus meu-sistema
# ou
npm create @guibus-nexus/nexus meu-sistema
```

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

---

## 🧪 Testes & Integração

O ecossistema adota uma cobertura robusta de testes para garantir que alterações na lógica e layouts não causem regressões em produção:

```bash
# Rodar todos os testes de unidade e componentes com Vitest
pnpm test

# Rodar todos os testes E2E com Playwright
pnpm test:e2e
```

---

## 🧹 Script de Limpeza (Strip Comments)

Para manter o código-fonte de produção o mais clean possível e livre de comentários desnecessários, o Nexus fornece um script automatizado de limpeza:

```bash
# Remove comentários de linha única (//), multilinha (/* */) e JSX ({/* */}) no diretório src/
pnpm strip
```
