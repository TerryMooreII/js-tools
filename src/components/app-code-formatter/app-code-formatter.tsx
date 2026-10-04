
import { Component, State, Prop, h, Watch } from '@stencil/core';
import * as prettier from 'prettier/standalone'

// Plugins are loaded on demand so each language only downloads the parsers it needs
const babel = () => [import('prettier/plugins/babel'), import('prettier/plugins/estree')]
const postcss = () => [import('prettier/plugins/postcss')]

const LANGUAGES = {
  javascript: { label: 'JavaScript', parser: 'babel', highlight: 'javascript', plugins: babel },
  typescript: { label: 'TypeScript', parser: 'typescript', highlight: 'typescript', plugins: () => [import('prettier/plugins/typescript'), import('prettier/plugins/estree')] },
  css: { label: 'CSS', parser: 'css', highlight: 'css', plugins: postcss },
  scss: { label: 'SCSS', parser: 'scss', highlight: 'scss', plugins: postcss },
  html: { label: 'HTML', parser: 'html', highlight: 'markup', plugins: () => [import('prettier/plugins/html'), ...postcss(), ...babel()] },
  yaml: { label: 'YAML', parser: 'yaml', highlight: 'yaml', plugins: () => [import('prettier/plugins/yaml')] },
  markdown: { label: 'Markdown', parser: 'markdown', highlight: 'markdown', plugins: () => [import('prettier/plugins/markdown')] },
  graphql: { label: 'GraphQL', parser: 'graphql', highlight: 'graphql', plugins: () => [import('prettier/plugins/graphql')] },
}

@Component({
  tag: 'app-code-formatter'
})
export class AppCodeFormatter {
  source = ''
  request = 0

  @State() value: any
  @State() reset: any

  @Prop() language: string;

  @Watch('language')
  languageWatcher() {
    this.format()
  }

  get config() {
    return LANGUAGES[this.language] || LANGUAGES.javascript
  }

  async format() {
    const request = ++this.request
    if (!this.source) {
      this.value = ''
      return
    }
    const { parser, plugins } = this.config
    let value: string
    try {
      value = await prettier.format(this.source, { parser, plugins: await Promise.all(plugins()) });
    } catch(error) {
      value = error.toString()
    }
    // Ignore results that were overtaken by newer input
    if (request === this.request) {
      this.value = value
    }
  }

  transform(e) {
    this.source = e.detail
    this.format()
  }

  render() {
    return (
      <div>
        <app-info
          title={`${this.config.label} Code Formatter`}
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="Code"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label="Output"
          value={this.value}
          highlight={this.config.highlight}
        >
        </app-output>
       </div>
      </div>
    )
  }
}
