import { parsers as tailwindPluginParsers } from 'sort-classes';
import pluginSortImports from 'tidy-imports';

/**
 * resolve conflict giữa prettier-plugin-tailwindcss và @trivago/prettier-plugin-sort-imports
 * @refs  https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1195411734
 */
/** @type {import("prettier").Parser}  */
const bothParser = {
  ...tailwindPluginParsers.typescript,
  preprocess: pluginSortImports.parsers.typescript.preprocess,
};

/** @type {import("prettier").Plugin}  */
const mixedPlugin = {
  parsers: {
    typescript: bothParser,
  },
  options: {
    ...pluginSortImports.options,
  },
};

export default {
  plugins: [mixedPlugin],
  semi: true,
  singleQuote: true,
  printWidth: 140,
  importOrder: [  // thứ tự sắp xếp import
    '<THIRD_PARTY_MODULES>',  // các thư viện bên thứ 3
    '^@/(.*)$',               // các import từ thư mục có config alias @
    '^[./]'                   // các import tương đối
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
