import eslint from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**", "playwright-report/**", "test-results/**"] },
  eslint.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
