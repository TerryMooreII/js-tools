import { Component, State, h } from '@stencil/core';
import { parse, stringify } from 'yaml';

@Component({
  tag: 'app-json-yaml'
})
export class AppJsonYaml {
  @State() value: any
  @State() highlight = 'yaml'

  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    // Valid JSON becomes YAML, anything else is read as YAML and becomes JSON
    try {
      const yaml = stringify(JSON.parse(e.detail))
      this.highlight = 'yaml'
      this.value = yaml
    } catch(_) {
      try {
        const json = JSON.stringify(parse(e.detail), null, 2)
        this.highlight = 'json'
        this.value = json
      } catch(error) {
        this.value = error.message
      }
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="JSON ↔ YAML"
          description="Paste JSON to get YAML, or YAML to get JSON"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="JSON or YAML"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label={this.highlight === 'json' ? 'JSON' : 'YAML'}
          highlight={this.highlight}
          value={this.value}
        >
        </app-output>
       </div>
      </div>
    )
  }
}
