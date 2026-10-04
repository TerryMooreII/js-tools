import { Component, Listen, State, h } from '@stencil/core';
import { GROUPS } from './routes';

// The path the site is served from, taken from <base href> in index.html
const ROOT = new URL(document.baseURI).pathname.replace(/\/+$/, '');

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() path = '/';

  componentWillLoad() {
    this.updatePath();
  }

  @Listen('popstate', { target: 'window' })
  updatePath() {
    const path = window.location.pathname;
    this.path = (path.startsWith(ROOT) ? path.slice(ROOT.length) : path).replace(/\/+$/, '') || '/';
  }

  navigate(e: MouseEvent, url: string) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    if (url !== this.path) {
      window.history.pushState(null, '', ROOT + url);
      this.path = url;
    }
    window.scrollTo(0, 0);
  }

  link(url: string) {
    return {
      href: ROOT + url,
      class: { 'link-active': this.path === url },
      onClick: (e: MouseEvent) => this.navigate(e, url),
    };
  }

  renderRoute() {
    if (this.path === '/') {
      return <app-home />;
    }
    for (const group of GROUPS) {
      const tool = group.tools.find(t => t.path === this.path);
      if (tool) {
        return tool.render();
      }
    }
  }

  render() {
    return (
      <div class="flex">
        <nav class="flex flex-col w-80 py-8 bg-gray-100 h-screen border-r border-gray-300 fixed overflow-y-auto">
          <h1 class="text-2xl text-center w-full mb-4">Left-Handed<br /> Monkey Wrench</h1>

          {GROUPS.map(group => [
            <h2>{group.title}</h2>,
            <ul>
              {group.tools.map(tool => (
                <li>
                  <a {...this.link(tool.path)}>
                    {tool.label}
                  </a>
                </li>
              ))}
            </ul>,
          ])}
        </nav>
        <main class="w-full py-8 pr-16 pl-96">
          {this.renderRoute()}
        </main>
        
      </div>
    );
  }
}
