import { existsSync, rmSync, writeFileSync, readFileSync } from "node:fs"
import { join } from "node:path"

const targetDir = process.cwd()

console.log("\x1b[32m%s\x1b[0m", "\nLimpando o template Nexus...")

try {
  const logosDir = join(targetDir, "public", "logos")
  if (existsSync(logosDir)) {
    rmSync(logosDir, { recursive: true, force: true })
    console.log("- Logos deletados (/public/logos)")
  }

  const readmePath = join(targetDir, "README.md")
  if (existsSync(readmePath)) {
    const readmeContent = readFileSync(readmePath, "utf8")
    const updatedReadme = readmeContent.replace(
      /<div align="center">[\s\S]*?<\/div>\s*<br \/>\s*/,
      ""
    )
    writeFileSync(readmePath, updatedReadme, "utf8")
    console.log("- Logo do topo removido do README.md")
  }

  const barebonesPage = `"use client"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center p-6 bg-background text-foreground font-sans">
      <h1 className="text-3xl font-bold tracking-tight">Nexus App</h1>
      <p className="text-muted-foreground mt-2">Comece a construir seu sistema aqui.</p>
    </main>
  )
}
`

  const localePagePath = join(targetDir, "src", "app", "[locale]", "page.tsx")
  const rootPagePath = join(targetDir, "src", "app", "page.tsx")

  if (existsSync(localePagePath)) {
    writeFileSync(localePagePath, barebonesPage, "utf8")
    console.log("- Página inicial limpa (src/app/[locale]/page.tsx)")
  } else if (existsSync(rootPagePath)) {
    writeFileSync(rootPagePath, barebonesPage, "utf8")
    console.log("- Página inicial limpa (src/app/page.tsx)")
  }

  console.log("\x1b[32m%s\x1b[0m", "\nBoilerplate limpo com sucesso! Pronto para começar do zero.\n")
} catch (error) {
  console.error("Erro durante a limpeza:", error)
}
