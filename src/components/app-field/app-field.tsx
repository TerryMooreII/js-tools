import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'app-field'
})
export class AppField {
  @Prop() label = 'Input'
  @Prop() value = ''
  @Prop() type = 'text'
  @Prop() placeholder = ''

  @Event() transform: EventEmitter

  render() {
    return (
      <Host>
        <div class="control">
          <label class="block mb-1" htmlFor="">{this.label}</label>
          <input
            type={this.type}
            value={this.value}
            placeholder={this.placeholder}
            onInput={(event:any) => this.transform.emit(event.target.value)}
            class="border border-gray-400 rounded w-full bg-white p-2"
          />
        </div>
      </Host>
    );
  }

}
