import { Component, State, h } from '@stencil/core';
import { describeTimestamp, parseTimestamp } from '../../utils/timestamp';
import { BUTTON_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-timestamp'
})
export class AppTimestamp {
  @State() input = ''
  @State() value = ''

  componentWillLoad() {
    this.now()
  }

  now() {
    this.transform(String(Math.floor(Date.now() / 1000)))
  }

  transform(input: string) {
    this.input = input
    if (!input.trim()) {
      this.value = ''
      return
    }
    const date = parseTimestamp(input)
    this.value = date ? describeTimestamp(date) : 'Not a timestamp or date'
  }

  render() {
    return (
      <div>
        <app-info
          title="Unix Timestamp Converter"
          description="Enter epoch seconds, epoch milliseconds or a date"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="w-1/2"
            label="Timestamp or date"
            value={this.input}
            placeholder="1700000000 or 2023-11-14T22:13:20Z"
            onTransform={(e) => this.transform(e.detail)}
          >
          </app-field>
          <button type="button" class={BUTTON_CLASS} onClick={() => this.now()}>
            Now
          </button>
        </div>

        <app-output
          label="Result"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
