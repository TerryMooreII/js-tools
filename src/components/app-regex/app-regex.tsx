import { Component, State, h } from '@stencil/core';
import { findMatches, RegexMatch, toSegments } from '../../utils/regex';
import { PANEL_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-regex'
})
export class AppRegex {
  @State() pattern = ''
  @State() flags = 'g'
  @State() text = ''

  render() {
    let matches: RegexMatch[] = []
    let error = ''
    if (this.pattern) {
      try {
        matches = findMatches(this.pattern, this.flags, this.text)
      } catch(e) {
        error = e.message
      }
    }

    return (
      <div>
        <app-info
          title="Regex Tester"
          description="JavaScript regular expressions, first 1000 matches"
        >
        </app-info>

        <div class="flex items-end gap-4 mt-10">
          <app-field
            class="flex-1"
            label="Pattern"
            placeholder="(\w+)@(\w+)\.com"
            onTransform={(e) => this.pattern = e.detail}
          >
          </app-field>
          <app-field
            class="w-24"
            label="Flags"
            value="g"
            onTransform={(e) => this.flags = e.detail}
          >
          </app-field>
        </div>

        <app-input
          label="Test text"
          onTransform={(e) => this.text = e.detail}
        >
        </app-input>

        <label htmlFor="">{error ? 'Error' : `Matches (${matches.length})`}</label>
        <pre class={PANEL_CLASS}>
          {error || toSegments(this.text, matches).map(segment =>
            segment.match ? <mark class="bg-yellow-200">{segment.text}</mark> : segment.text
          )}
        </pre>

        <app-output
          label="Details"
          highlight="json"
          value={matches.length ? JSON.stringify(matches, null, 2) : ''}
        >
        </app-output>
      </div>
    )
  }
}
