// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "**/node_modules/*",
      "**/out/*",
      "**/.next/*",
      "**/.vercel/*",
      "**/*.config.js",
      "**/*.config.ts"
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-no-duplicate-props": "off",
      "react-hooks/exhaustive-deps": "off",
      "prefer-const": "off",
      "@next/next/no-script-component-in-head": "off",
      "@typescript-eslint/no-unused-expressions": "off"
    }
  }
];