import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-html-encoder'
})
export class AppHtmlEncoder {

  @State() value

  transform(e) {
    this.value =  String(e.detail)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  }

  render() {
    return (
      <div>
        <app-info
          title="HTML Encoder"
        >
        </app-info>

        <app-input
          label="HTML"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Output"
          value={this.value}
        >
        </app-output>
        
        
      </div>
    )
  }
}
