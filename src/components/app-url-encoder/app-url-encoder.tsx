import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-url-encoder'
})
export class AppUrlEncoder {
  @State() value

  transform(e) {
    try {
      this.value = encodeURIComponent(e.detail)
    } catch (error) {
      this.value = error.message
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="URL Encoder"
        >
        </app-info>

        <app-input
          label="Decoded"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Encoded"
          value={this.value}
        >
        </app-output>
        
        
      </div>
    )
  }
}
