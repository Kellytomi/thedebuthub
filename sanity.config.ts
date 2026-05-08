import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { codeInput } from '@sanity/code-input'
import { dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name: 'thedebuthub',
  title: 'The Debut Hub CMS',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
