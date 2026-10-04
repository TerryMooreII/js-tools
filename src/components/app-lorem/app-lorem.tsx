import { Component, State, h } from '@stencil/core';
import { lorem, LoremUnit } from '../../utils/lorem';
import { BUTTON_CLASS, SELECT_CLASS } from '../../utils/ui';

const UNITS: LoremUnit[] = ['paragraphs', 'sentences', 'words']

@Component({
  tag: 'app-lorem'
})
export class AppLorem {
  count = 3
  unit: LoremUnit = 'paragraphs'

  @State() value = ''

  componentWillLoad() {
    this.generate()
  }

  generate() {
    const count = Math.min(Math.max(Math.floor(this.count) || 1, 1), 1000)
    this.value = lorem(this.unit, count)
  }

  render() {
    return (
      <div>
        <app-info
          title="Lorem Ipsum"
          description="Placeholder text"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="w-32"
            label="Count"
            type="number"
            value="3"
            onTransform={(e) => { this.count = Number(e.detail); this.generate() }}
          >
          </app-field>
          <select
            class={SELECT_CLASS}
            onInput={(event:any) => { this.unit = event.target.value; this.generate() }}
          >
            {UNITS.map(unit => <option value={unit} selected={unit === this.unit}>{unit}</option>)}
          </select>
          <button type="button" class={BUTTON_CLASS} onClick={() => this.generate()}>
            Generate
          </button>
        </div>

        <app-output
          label="Text"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
