// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";


// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

export default defineConfig({
  files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  languageOptions: {
    parser: parserTs,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    globals: globals.browser,
  },
  plugins: {
    js,
    "@typescript-eslint": eslintPluginTs,
  },
  // Gabungkan rules JS + TS
  ...tseslint.configs.recommended,
  rules: {
    ...tseslint.configs.recommended.rules,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-require-imports": "warn",
  },
});
