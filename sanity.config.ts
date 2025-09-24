import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'thedebuthub',
  title: 'The Debut Hub CMS',

  projectId: 'kc23wdnh',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})

