import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-base64-decoder'
})
export class AppBase64Decoder {
  @State() value

  transform(e) {
    this.value = decodeURIComponent(atob(e.detail).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  render() {
    return (
      <div>
        <app-info
          title="Base64 Decoder"
        >
        </app-info>

        <app-input
          label="Input"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Base64 Decoded"
          value={this.value}
        >
        </app-output>
        
        
      </div>
    )
  }
}
