import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-html-decoder'
})
export class AppHtmlDecoder {
  @State() value

  transform(e) {
    this.value = String(e.detail)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
  }

  render() {
    return (
      <div>
        <app-info
          title="HTML Decoder"
        >
        </app-info>

        <app-input
          label="Encoded"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Output"
          value={this.value}
          highlight="html"
        >
        </app-output>
        
        
      </div>
    )
  }
}
