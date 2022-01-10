import { ComputedFields, defineDocumentType, FieldDefs, makeSource } from 'contentlayer/source-files'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  }
}

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  bodyType: 'mdx',
  fields: {},
  computedFields
}))

const projectFields: FieldDefs = {
  title: { type: 'string', required: true },
  shortDescription: { type: 'string' },
  tech: { type: 'string', required: true },
  githubURL: { type: 'string', required: true },
  livePreviewURL: { type: 'string' }
}

const JavaScriptProject = defineDocumentType(() => ({
  name: 'JSProject',
  filePathPattern: 'projetos/javascript/*.mdx',
  bodyType: 'mdx',
  fields: projectFields,
  computedFields
}))

const ReactNextProject = defineDocumentType(() => ({
  name: 'RNProject',
  filePathPattern: 'projetos/react-next/*.mdx',
  bodyType: 'mdx',
  fields: projectFields,
  computedFields
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Snippet, JavaScriptProject, ReactNextProject],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
})

export default contentLayerConfig
