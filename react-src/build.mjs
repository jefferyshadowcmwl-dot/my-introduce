import { build } from 'esbuild';

await build({
  entryPoints: ['react-src/index.jsx'],
  outfile: 'assets/lzy-react.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  jsx: 'automatic',
  legalComments: 'none',
  logLevel: 'info'
});
