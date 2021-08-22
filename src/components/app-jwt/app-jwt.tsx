import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-jwt'
})
export class AppJwt {
  @State() value: any

  transform(e) {
    if (!e.detail) {
      this.value = ''
      return
    }
    try {
      this.value ='Header: Algorithm & token type\n' +  e.detail.split('.')
        .filter((_, i) => i < 2)
        .map(atob)
        .map(JSON.parse)
        .map(p => JSON.stringify(p, null, 2))
        .join('\n\nPayload: The data section\n');
    } catch(e) {
      this.value = e.message
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="JWT Debugger"
          description="Parse a JWT, does not validate"
        >
        </app-info>

       <div class="flex">
       <app-input
          class="w-1/2 mr-4"
          side={true}
          label="JWT"
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