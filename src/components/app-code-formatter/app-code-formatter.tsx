
import { Component, State, Prop, h, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import prettier from 'prettier'
import babel from 'prettier/parser-babel'
// import html from 'prettier/parser-html'
import postcss from 'prettier/parser-postcss'
import typescript from 'prettier/parser-typescript'


@Component({
  tag: 'app-code-formatter'
})
export class AppCodeFormatter {
  prettierConfig
  lang = 'javascript'

  @State() value: any
  @State() reset: any

  @Prop() match: MatchResults;

  @Watch('match')
  historyWatcher(n) {
    this.setLang(n.params.lang)
  }

  componentWillLoad() {
    this.setLang(this.match.params.lang)
  }

  setLang(lang) {
    switch(lang) {
      // case 'jsx':
      //   this.lang = 'jsx'
      //   this.prettierConfig = { parser: "babel", plugins: [babel, html] }
      // break
      case 'css':
        this.lang = 'css'
        this.prettierConfig = { parser: "css", plugins: [postcss] }
      break
      case 'scss':
        this.lang = 'scss'
        this.prettierConfig = { parser: "scss", plugins: [postcss] }
      break
      case 'typescript':
        this.lang = 'typescript'
        this.prettierConfig = { parser: "typescript", plugins: [typescript] }
      break
      default:
        this.lang = 'javascript'
        this.prettierConfig = { parser: "babel", plugins: [babel] }
    }
  }

  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    try {
      this.value = prettier.format(e.detail, this.prettierConfig);
    } catch(error) {
      this.value = error.toString()
    }
  }

  render() {
    return (
      <div>
        <app-info
          title={`${this.lang} Code Formatter`}
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
          highlight={this.lang}
        >
        </app-output>
       </div>
      </div>
    )
  }
}
