import { Component, State, h } from '@stencil/core';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

@Component({
  tag: 'app-markdown'
})
export class AppMarkdown {
  @State() value: any



  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    this.value = md.render(e.detail)
  }

  render() {
    return (
      <div>
        <app-info
          title="Markdown Previewer"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="Markdown"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label="Output"
          value={this.value}
          html={true}
        >
        </app-output>
       </div>
      </div>
    )
  }
}
