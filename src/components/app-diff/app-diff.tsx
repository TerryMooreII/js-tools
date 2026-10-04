import { Component, State, h } from '@stencil/core';
import { diffLines } from 'diff';
import { PANEL_CLASS } from '../../utils/ui';

@Component({
  tag: 'app-diff'
})
export class AppDiff {
  @State() original = ''
  @State() changed = ''

  render() {
    // A missing newline at the end of one side should not show up as a changed line
    const terminate = (text: string) => (text && !text.endsWith('\n') ? text + '\n' : text)
    const parts = diffLines(terminate(this.original), terminate(this.changed))
    const count = (key: 'added' | 'removed') => parts.filter(part => part[key]).reduce((total, part) => total + part.count, 0)

    return (
      <div>
        <app-info
          title="Text Diff"
          description="Line by line comparison"
        >
        </app-info>

        <div class="flex">
          <app-input
            class="w-1/2 mr-4"
            label="Original"
            onTransform={(e) => this.original = e.detail}
          >
          </app-input>

          <app-input
            class="w-1/2 ml-4"
            label="Changed"
            onTransform={(e) => this.changed = e.detail}
          >
          </app-input>
        </div>

        <label htmlFor="">Difference (+{count('added')} −{count('removed')})</label>
        <pre class={PANEL_CLASS}>
          {parts.map(part => {
            const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
            const clazz = part.added ? 'bg-green-100' : part.removed ? 'bg-red-100' : ''
            return part.value.replace(/\n$/, '').split('\n').map(line => <div class={clazz}>{prefix}{line}</div>)
          })}
        </pre>
      </div>
    )
  }
}
