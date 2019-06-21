import fs from 'fs-extra'

import typescript from 'rollup-plugin-typescript2'

const clean = () => ({
  name: 'clean',
  buildStart: () => fs.remove('./dist')
})

export default {
  external: ['@hapi/joi', 'fs-extra', 'lodash.get', 'path'],
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [clean(), typescript()]
}
