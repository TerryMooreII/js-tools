import { Component, State, h } from '@stencil/core';
import { CHARSETS, randomString } from '../../utils/password';
import { BUTTON_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-password'
})
export class AppPassword {
  length = 20
  enabled = new Set(Object.keys(CHARSETS))

  @State() value = ''

  componentWillLoad() {
    this.generate()
  }

  toggle(name: string, checked: boolean) {
    if (checked) {
      this.enabled.add(name)
    } else {
      this.enabled.delete(name)
    }
    this.generate()
  }

  generate() {
    const chars = Object.keys(CHARSETS).filter(name => this.enabled.has(name)).map(name => CHARSETS[name]).join('')
    if (!chars) {
      this.value = 'Select at least one character set'
      return
    }
    const length = Math.min(Math.max(Math.floor(this.length) || 1, 1), 1024)
    this.value = randomString(length, chars)
  }

  render() {
    return (
      <div>
        <app-info
          title="Password Generator"
          description="Random strings from the browser's cryptographic random source"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="w-32"
            label="Length"
            type="number"
            value="20"
            onTransform={(e) => { this.length = Number(e.detail); this.generate() }}
          >
          </app-field>
          {Object.keys(CHARSETS).map(name => (
            <label class="py-2">
              <input
                type="checkbox"
                class="mr-1"
                checked={this.enabled.has(name)}
                onChange={(event:any) => this.toggle(name, event.target.checked)}
              />
              {name}
            </label>
          ))}
          <button type="button" class={BUTTON_CLASS} onClick={() => this.generate()}>
            Generate
          </button>
        </div>

        <app-output
          label="Password"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
