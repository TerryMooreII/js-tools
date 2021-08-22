import { Component, Host, h, Prop, State, Watch} from '@stencil/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'


@Component({ 
  tag: 'app-output',
  styleUrl: 'app-output.css',
  shadow:false
})
export class AppOutput {
  @Prop() side = false
  @Prop() label = 'Output'
  @Prop() value = ''
  @Prop() highlight = null
 
  @State() copyText = 'Copy'

  @Watch('value')
  watchHandler(n) {
    const el = document.querySelector('code')
    if (!this.highlight) {
      el.innerText = n
      return
    }
    el.innerHTML = Prism.highlight(n, Prism.languages[this.highlight], this.highlight)
  }

  async copyToClipboard() {
    await navigator.clipboard.writeText(this.value)
    this.copyText = 'Copied'
    setTimeout(() => {
      this.copyText = 'Copy'
    }, 1000)
  }

  render() {
    return ( 
      <Host>
        <div class="control my-10" style={{height: `${this.side ? 'calc(100vh - 200px)' : 'auto'}` }}>
          <div class="flex justify-between align-bottom">
            <label htmlFor="">{this.label}</label> 
            <button 
              type="button"
              class="border border-gray-400 hover:bg-gray-200 rounded-t px-3  border-b-0 -mt-1"
              onClick={() => this.copyToClipboard()}
            >
              {this.copyText}
            </button>
          </div>
          
            <pre class={`font-sans border border-gray-400 w-full bg-white p-2 rounded-b rounded-tl overflow-auto ${this.side ? 'h-full ': 'min-output-height'}`}>
              <code></code> 
            </pre>
          </div>
        
      </Host>
    );
  }

}