import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  render() {
    return (
      <div class="app-home flex justify-center w-full">
        <h1 class="text-2xl">
          Collection of tools to help web developers.
        </h1>
      </div>
    );
  }
}
