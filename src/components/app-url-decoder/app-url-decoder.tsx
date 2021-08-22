import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-url-decoder'
})
export class AppUrlDecoder {
  @State() value

  transform(e) {
    this.value = decodeURIComponent(e.detail)
  }

  render() {
    return (
      <div>
        <app-info
          title="URL Decoder"
        >
        </app-info>

        <app-input
          label="Encoded"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Decoded"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
