import { Component, State, h } from '@stencil/core';
import { uuid } from '../../utils/uuid';
import { BUTTON_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-uuid'
})
export class AppUuid {
  count = 1

  @State() value = ''

  componentWillLoad() {
    this.generate()
  }

  generate() {
    const count = Math.min(Math.max(Math.floor(this.count) || 1, 1), 100)
    this.value = Array.from({ length: count }, uuid).join('\n')
  }

  render() {
    return (
      <div>
        <app-info
          title="UUID Generator"
          description="Random version 4 UUIDs, up to 100 at a time"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="w-32"
            label="Count"
            type="number"
            value="1"
            onTransform={(e) => this.count = Number(e.detail)}
          >
          </app-field>
          <button type="button" class={BUTTON_CLASS} onClick={() => this.generate()}>
            Generate
          </button>
        </div>

        <app-output
          label="UUIDs"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
