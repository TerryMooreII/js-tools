import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: '/js-tools/',
      copy: [
        { src: '.htaccess', dest: '.htaccess' }
      ]
    },
  ],
  plugins: [
    postcss({
      plugins: [
        tailwindcss({ optimize: true }),
        autoprefixer()
      ]
    })
  ]
};
