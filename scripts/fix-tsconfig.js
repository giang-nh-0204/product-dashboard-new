import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const nuxtDir = resolve(process.cwd(), '.nuxt')

// Ensure .nuxt directory exists
if (!existsSync(nuxtDir)) {
  mkdirSync(nuxtDir, { recursive: true })
}

// tsconfig.app.json
const tsconfigApp = {
  extends: './tsconfig.json',
  compilerOptions: {
    composite: true,
    types: ['vite/client']
  },
  include: ['../**/*', './nuxt.d.ts'],
  exclude: ['../dist', '../node_modules', '../.output']
}

// tsconfig.shared.json
const tsconfigShared = {
  extends: './tsconfig.json',
  compilerOptions: {
    composite: true
  }
}

// tsconfig.node.json
const tsconfigNode = {
  extends: './tsconfig.json',
  compilerOptions: {
    composite: true,
    module: 'ESNext',
    moduleResolution: 'Bundler',
    types: ['node']
  }
}

const files = {
  'tsconfig.app.json': tsconfigApp,
  'tsconfig.shared.json': tsconfigShared,
  'tsconfig.node.json': tsconfigNode
}

Object.entries(files).forEach(([filename, content]) => {
  const filepath = resolve(nuxtDir, filename)
  writeFileSync(filepath, JSON.stringify(content, null, 2))
  console.log(`✓ Created ${filename}`)
})

console.log('✓ All tsconfig files created successfully!')
