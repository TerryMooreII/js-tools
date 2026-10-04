import { Component, State, h } from '@stencil/core';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';

const DEFAULT = '*/15 9-17 * * 1-5'

@Component({
  tag: 'app-cron'
})
export class AppCron {
  @State() value = ''

  componentWillLoad() {
    this.transform(DEFAULT)
  }

  transform(expression: string) {
    if (!expression.trim()) {
      this.value = ''
      return
    }
    try {
      const description = cronstrue.toString(expression)
      const runs = CronExpressionParser.parse(expression).take(5).map(date => date.toDate().toLocaleString())
      this.value = `${description}\n\nNext runs (local time):\n${runs.join('\n')}`
    } catch(error) {
      this.value = error.message || String(error)
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="Cron Explainer"
          description="Describes a cron expression and lists its next run times"
        >
        </app-info>

        <div class="mt-10">
          <app-field
            class="block w-1/2"
            label="Cron expression"
            value={DEFAULT}
            onTransform={(e) => this.transform(e.detail)}
          >
          </app-field>
        </div>

        <app-output
          label="Schedule"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
