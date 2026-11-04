import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

/**
 * GitHub Pages — статический хостинг без rewrite-правил: прямой переход
 * на /register или /privacy-policy отдаёт 404 вместо приложения.
 * Копия index.html под именем 404.html служит SPA-fallback'ом,
 * дальше маршрут разбирает уже React Router на клиенте.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(import.meta.dirname, 'dist')
      const index = resolve(outDir, 'index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve(outDir, '404.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    spaFallback(),
  ],
})
