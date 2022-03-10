import { Component, Host, h, Prop, EventEmitter, Event, Watch } from '@stencil/core';

@Component({
  tag: 'app-input'
})
export class AppInput {
  @Prop() side = false
  @Prop() label = 'Input'

  @Event() transform: EventEmitter
  
  onChange(value) {
    this.transform.emit(value)
  }

  render() {
    return (
      <Host>
        <div class="control my-10 w-100" style={{height: `${this.side ? 'calc(100vh - 200px)' : 'auto'}` }}>
          <div class="flex justify-between mb-1">
            <label htmlFor="">{this.label}</label>
          </div>
          <textarea
            onInput={(event:any) => this.onChange(event.target.value)}
            class={`border border-gray-400 rounded w-full  bg-white p-2 overflow-auto ${this.side ? 'h-full': 'h-56'}`}
          >
          </textarea>
        </div>
      </Host>
    );
  }

}
