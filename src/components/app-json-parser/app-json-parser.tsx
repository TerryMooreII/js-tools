import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-json-parser'
})
export class AppJsonParser {
  @State() value: any

  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    try {
      const o = JSON.parse(e.detail)
      this.value = JSON.stringify(o, null, 2)
    } catch(e) {
      this.value = e.message
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="JSON Beautifier"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="JSON"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label="Output"
          value={this.value}
          highlight="json"
        >
        </app-output>
       </div>
      </div>
    )
  }
}
