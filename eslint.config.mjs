import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    {
        ignores: ["demo/**", "dist/**", "node_modules/**", "coverage/**", "docs/out/**", "*.html"],
    },
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettier,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: "module",
            },
        },
        rules: {
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/naming-convention": ["error", { selector: "variableLike", format: ["camelCase"] }],
        },
    }
);
