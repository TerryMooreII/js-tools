import { h } from '@stencil/core';

export interface Tool {
  path: string;
  label: string;
  render: () => any;
}

export interface Group {
  title: string;
  tools: Tool[];
}

const formatter = (language: string, label: string): Tool => ({
  path: `/code-formatter/${language}`,
  label,
  render: () => <app-code-formatter language={language} />,
});

export const GROUPS: Group[] = [
  {
    title: 'Encoder & Decoders',
    tools: [
      { path: '/url-encoder', label: 'URL Encoder', render: () => <app-url-encoder /> },
      { path: '/url-decoder', label: 'URL Decoder', render: () => <app-url-decoder /> },
      { path: '/base64-encoder', label: 'Base64 Encoder', render: () => <app-base64-encoder /> },
      { path: '/base64-decoder', label: 'Base64 Decoder', render: () => <app-base64-decoder /> },
      { path: '/html-encoder', label: 'HTML Encoder', render: () => <app-html-encoder /> },
      { path: '/html-decoder', label: 'HTML Decoder', render: () => <app-html-decoder /> },
    ],
  },
  {
    title: 'Generators',
    tools: [
      { path: '/uuid', label: 'UUID Generator', render: () => <app-uuid /> },
      { path: '/hash', label: 'Hash Generator', render: () => <app-hash /> },
      { path: '/password', label: 'Password Generator', render: () => <app-password /> },
      { path: '/lorem-ipsum', label: 'Lorem Ipsum', render: () => <app-lorem /> },
    ],
  },
  {
    title: 'Converters',
    tools: [
      { path: '/query-string-to-json', label: 'QueryString to JSON', render: () => <app-query-string-to-json /> },
      { path: '/timestamp', label: 'Unix Timestamp', render: () => <app-timestamp /> },
      { path: '/json-yaml', label: 'JSON ↔ YAML', render: () => <app-json-yaml /> },
      { path: '/color', label: 'Color Converter', render: () => <app-color /> },
      { path: '/case', label: 'Case Converter', render: () => <app-case /> },
    ],
  },
  {
    title: 'General Tools',
    tools: [
      { path: '/jwt-debugger', label: 'JWT Debugger', render: () => <app-jwt /> },
      { path: '/markdown', label: 'Markdown Previewer', render: () => <app-markdown /> },
      { path: '/regex', label: 'Regex Tester', render: () => <app-regex /> },
      { path: '/diff', label: 'Text Diff', render: () => <app-diff /> },
      { path: '/url-parser', label: 'URL Parser', render: () => <app-url-parser /> },
      { path: '/cron', label: 'Cron Explainer', render: () => <app-cron /> },
    ],
  },
  {
    title: 'Formatters & Validators',
    tools: [
      { path: '/json-formatter', label: 'JSON Formatter/Validator', render: () => <app-json-parser /> },
      formatter('javascript', 'JavaScript'),
      formatter('typescript', 'TypeScript'),
      formatter('css', 'CSS'),
      formatter('scss', 'SCSS'),
      formatter('html', 'HTML'),
      formatter('yaml', 'YAML'),
      formatter('markdown', 'Markdown'),
      formatter('graphql', 'GraphQL'),
    ],
  },
];
