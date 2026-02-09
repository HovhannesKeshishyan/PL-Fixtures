import {defineConfig, globalIgnores} from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = defineConfig([
    ...nextVitals,
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "coverage/**",
    ]),
    {
        rules: {
            "quotes": ["error", "double", {avoidEscape: true}],
            "camelcase": ["error"],
            "no-multiple-empty-lines": "error",
        }
    }
])

export default eslintConfig;
