import { Component, State, h } from '@stencil/core';
import { SELECT_CLASS } from '../../utils/ui';

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

@Component({
  tag: 'app-hash'
})
export class AppHash {
  text = ''
  algorithm = 'SHA-256'

  @State() value = ''

  async hash() {
    if (!this.text) {
      this.value = ''
      return
    }
    if (!crypto.subtle) {
      this.value = 'Hashing is only available on secure (https) pages'
      return
    }
    const text = this.text
    const algorithm = this.algorithm
    const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text))
    // Ignore results that were overtaken by newer input
    if (text === this.text && algorithm === this.algorithm) {
      this.value = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
    }
  }

  render() {
    return (
      <div>
        <app-info
          title="Hash Generator"
          description="Hashes the text as UTF-8"
        >
        </app-info>

        <div class="mt-10">
          <label class="block mb-1" htmlFor="">Algorithm</label>
          <select
            class={SELECT_CLASS}
            onInput={(event:any) => { this.algorithm = event.target.value; this.hash() }}
          >
            {ALGORITHMS.map(name => <option value={name} selected={name === this.algorithm}>{name}</option>)}
          </select>
        </div>

        <app-input
          label="Text"
          onTransform={(e) => { this.text = e.detail; this.hash() }}
        >
        </app-input>

        <app-output
          label="Hash"
          value={this.value}
        >
        </app-output>
      </div>
    )
  }
}
