import { Component, State, h } from '@stencil/core';
import { CASES, convertCase } from '../../utils/case';
import { SELECT_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-case'
})
export class AppCase {
  text = ''
  name = 'camelCase'

  @State() value = ''

  convert() {
    this.value = this.text ? convertCase(this.text, this.name) : ''
  }

  render() {
    return (
      <div>
        <app-info
          title="Case Converter"
          description="Each line is converted separately"
        >
        </app-info>

        <div class="mt-10">
          <label class="block mb-1" htmlFor="">Convert to</label>
          <select
            class={SELECT_CLASS}
            onInput={(event:any) => { this.name = event.target.value; this.convert() }}
          >
            {Object.keys(CASES).map(name => <option value={name} selected={name === this.name}>{name}</option>)}
          </select>
        </div>

        <app-input
          label="Text"
          onTransform={(e) => { this.text = e.detail; this.convert() }}
        >
        </app-input>

        <app-output
          label="Converted"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
