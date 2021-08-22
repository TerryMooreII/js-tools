import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-info',
})
export class AppInfo {
  @Prop() title = 'Title'
  @Prop() description = ''

  render() {
    return (
      <Host>
        <div>
          <div class="title text-2xl">
            {this.title}
          </div>
          <div class="description h-4">
            {this.description}
          </div>
        </div>
      </Host>
    );
  }

}
