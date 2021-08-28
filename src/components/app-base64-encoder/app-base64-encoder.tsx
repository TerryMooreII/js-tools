import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-base64-encoder'
})
export class AppBase64Encoder {
  @State() value

  transform(e) {
    try {
      this.value = btoa(encodeURIComponent(e.detail).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(_match, p1) {
        //@ts-ignore
        return String.fromCharCode(`0x${p1}`);
      }));
    } catch (error) {
      this.value = error.message
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="Base64 Encoder"
        >
        </app-info>

        <app-input
          label="Input"
          onTransform={(e) => this.transform(e)}
        >
        </app-input>

        <app-output
          label="Base64 Encoded"
          value={this.value}
        >
        </app-output>
        
        
      </div>
    )
  }
}
