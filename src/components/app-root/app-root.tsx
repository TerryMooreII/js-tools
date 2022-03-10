import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  render() {
    return (
      <div class="flex">
        <nav class="flex flex-col w-80 py-8 bg-gray-100 h-screen border-r border-gray-300 fixed">
          <h1 class="text-2xl text-center w-full mb-4">Left-Handed<br /> Monkey Wrench</h1>

          <h2>Encoder &amp; Decoders</h2>
          <ul>
            <li>
              <stencil-route-link url="/url-encoder">
                URL Encoder
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/url-decoder">
                URL Decoder
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/base64-encoder">
                Base64 Encoder
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/base64-decoder">
                Base64 Decoder
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/html-encoder">
                HTML Encoder
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/html-decoder">
                HTML Decoder
              </stencil-route-link>
            </li>
          </ul>

          <h2>General Tools</h2>
          <ul>
            <li>
              <stencil-route-link url="/query-string-to-json">
                QueryString to JSON
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/jwt-debugger">
                JWT Debugger
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/markdown">
                Markdown
              </stencil-route-link>
            </li>
          </ul>

          <h2>Formatters &amp; Validators</h2>
          <ul>
          <li>
              <stencil-route-link url="/json-formatter">
                JSON Formatter/Validator
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/code-formatter/javascript">
                JavaScript
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/code-formatter/typescript">
                TypeScript
              </stencil-route-link>
            </li>
            {/* <li>
              <stencil-route-link url="/code-formatter/jsx">
                JSX
              </stencil-route-link>
            </li> */}
            <li>
              <stencil-route-link url="/code-formatter/css">
                CSS
              </stencil-route-link>
            </li>
            <li>
              <stencil-route-link url="/code-formatter/scss">
                SCSS
              </stencil-route-link>
            </li>
          </ul>
         
        </nav>
        <main class="w-full py-8 pr-16 pl-96">
          <stencil-router root="/tools/">
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/url-encoder" component="app-url-encoder" />
              <stencil-route url="/url-decoder" component="app-url-decoder" />
              <stencil-route url="/base64-encoder" component="app-base64-encoder" />
              <stencil-route url="/base64-decoder" component="app-base64-decoder" />
              <stencil-route url="/query-string-to-json" component="app-query-string-to-json" />
              <stencil-route url="/json-formatter" component="app-json-parser" />
              <stencil-route url="/html-encoder" component="app-html-encoder" />
              <stencil-route url="/html-decoder" component="app-html-decoder" />
              <stencil-route url="/jwt-debugger" component="app-jwt" />
              <stencil-route url="/markdown" component="app-markdown" />

              <stencil-route url="/code-formatter/:lang" component="app-code-formatter" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        
      </div>
    );
  }
}
