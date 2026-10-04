import { Component, State, h } from '@stencil/core';
import { parseUrl } from '../../utils/url';

@Component({
  tag: 'app-url-parser'
})
export class AppUrlParser {
  @State() value: any

  transform(e) {
    if (!e.detail.trim()) {
      this.value = ''
      return
    }
    try {
      this.value = JSON.stringify(parseUrl(e.detail), null, 2)
    } catch(_) {
      this.value = 'Not a valid URL (include the scheme, e.g. https://)'
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="URL Parser"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="URL"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          side={true}
          class="w-1/2 ml-4"
          label="Parts"
          value={this.value}
          highlight="json"
        >
        </app-output>
       </div>
      </div>
    )
  }
}
