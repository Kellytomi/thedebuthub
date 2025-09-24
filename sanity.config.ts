import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'thedebuthub',
  title: 'The Debut Hub CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kc23wdnh',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})

