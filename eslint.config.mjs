// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import prettierPlugin from "eslint-plugin-prettier";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
    // Základní ESLint doporučená pravidla
    eslint.configs.recommended,

    // TypeScript konfigurace
    ...tseslint.configs.recommended,

    // React konfigurace
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            react: reactPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            // Vypnutí pravidla react/react-in-jsx-scope - pro React 17+ již není potřeba importovat React
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off", // TypeScript nahrazuje potřebu PropTypes
            "react/jsx-no-target-blank": "warn", // Pro odkazy, které mohou být použity v <Link>
        },
    },

    // Accessibility (a11y) pravidla
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "jsx-a11y": a11yPlugin,
        },
        rules: {
            "jsx-a11y/alt-text": "warn", // Vyžaduje alt text pro <img>, <area>, <input type="image">, a <object>
            "jsx-a11y/anchor-has-content": "warn", // Vyžaduje obsah v <a> elementech
            "jsx-a11y/anchor-is-valid": "warn", // Vyžaduje platné href pro <a>
            "jsx-a11y/aria-props": "warn", // Kontroluje validní ARIA atributy
            "jsx-a11y/aria-proptypes": "warn", // Kontroluje správné hodnoty ARIA atributů
            "jsx-a11y/aria-role": "warn", // Kontroluje platné hodnoty role
            "jsx-a11y/aria-unsupported-elements": "warn", // Zakazuje ARIA atributy na HTML elementech, které je nepodporují
            "jsx-a11y/heading-has-content": "warn", // Vyžaduje obsah v heading elementech
            "jsx-a11y/img-redundant-alt": "warn", // Zakazuje redundantní slova v alt textu
            "jsx-a11y/interactive-supports-focus": "warn", // Vyžaduje elementy s událostmi myši, aby mohly přijímat focus
            "jsx-a11y/label-has-associated-control": "warn", // Vyžaduje, aby <label> měl asociovaný control
            "jsx-a11y/mouse-events-have-key-events": "warn", // Vyžaduje, aby onMouseOver/onMouseOut měly také onFocus/onBlur
            "jsx-a11y/no-access-key": "warn", // Zakazuje accessKey na elementech
            "jsx-a11y/no-autofocus": "warn", // Zakazuje autofocus atribut
            "jsx-a11y/no-distracting-elements": "warn", // Zakazuje <marquee> a <blink>
            "jsx-a11y/no-interactive-element-to-noninteractive-role": "warn", // Zakazuje změnu interaktivních elementů na neinteraktivní role
            "jsx-a11y/no-noninteractive-element-interactions": "warn", // Zakazuje interakce na neinteraktivních elementech
            "jsx-a11y/no-noninteractive-element-to-interactive-role": "warn", // Zakazuje změnu neinteraktivních elementů na interaktivní role
            "jsx-a11y/no-noninteractive-tabindex": "warn", // Zakazuje tabIndex na neinteraktivních elementech
            "jsx-a11y/no-redundant-roles": "warn", // Zakazuje redundantní role
            "jsx-a11y/role-has-required-aria-props": "warn", // Vyžaduje ARIA atributy pro role, které je vyžadují
            "jsx-a11y/role-supports-aria-props": "warn", // Vyžaduje ARIA atributy, které jsou podporovány pro danou roli
            "jsx-a11y/scope": "warn", // Vyžaduje scope atribut pouze na <th>
            "jsx-a11y/tabindex-no-positive": "warn", // Zakazuje pozitivní hodnoty tabIndex
        },
    },

    // Speciální nastavení pro Cloudflare soubory
    {
        files: [
            "**/*.{ts,tsx}",
            "**/routes/**/*.{ts,tsx}",
            "**/workers/**/*.{ts,tsx}",
            "**/app.ts",
        ],
        rules: {
            // Vypnutí TypeScript pravidel pro Cloudflare kontext
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "off", // Dovolí použít @ts-ignore
        },
    },

    // React Hooks pravidla
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },

    // Import pravidla - nastavení pro lépe organizované importy
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            import: importPlugin,
        },
        rules: {
            "import/no-unresolved": "off", // TypeScript se stará o kontrolu importů
            "import/order": [
                "off", // Dočasně vypnuto, dokud neupravíte importy ručně
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            // Tolerance pro prázdné řádky v import skupinách
            "import/no-empty-named-blocks": "off",
            "import/first": "off", // Dočasně vypnuto
        },
    },

    // React Fast Refresh (Vite) - upravena pravidla pro lepší kompatibilitu
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "react-refresh": reactRefreshPlugin,
        },
        rules: {
            // Méně přísné pravidlo pro Fast Refresh - pouze varování
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                    allowExportNames: ["loader", "action", "meta", "links"], // Povolení React Router exportů
                },
            ],
        },
    },

    // TypeScript specifická pravidla - upravená pro váš styl kódu
    {
        files: ["**/*.{ts,tsx}"],
        rules: {
            "no-undef": "off", // TypeScript to kontroluje lépe
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", disallowTypeAnnotations: false },
            ],
            // Upraveno na 'type' místo 'interface' podle vašich preferencí
            "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
            // Povolení namespace pro typové definice React Routeru - velmi důležité pro generované soubory
            "@typescript-eslint/no-namespace": "off",
            // Povolení prázdných objektů v typech
            "@typescript-eslint/no-empty-object-type": "off",
            // Povolení prázdných vzorů v objektech (pro destructuring)
            "no-empty-pattern": "off",
            // Vypnutí zbytečných varování
            "@typescript-eslint/no-unused-expressions": "off",
        },
    },

    // Integrace s Prettier - nastavení pravidel podobných výchozímu prettier
    {
        files: ["**/*.{js,jsx,ts,tsx,json,css,scss,md}"],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": [
                "warn",
                {
                    semi: true,
                    singleQuote: false,
                    tabWidth: 4,
                    trailingComma: "es5",
                    printWidth: 80,
                    arrowParens: "always",
                    bracketSpacing: true,
                    bracketSameLine: false,
                    endOfLine: "auto",
                },
            ],
            // Vypnutí pravidel ESLint, která by mohla být v konfliktu s Prettier
            "arrow-body-style": "off",
            "prefer-arrow-callback": "off",
        },
    },

    // JSON, CSS a další konfigurační soubory
    {
        files: ["**/*.json", "**/*.css", "**/*.md", "**/*.html"],
        rules: {
            "@typescript-eslint/no-unused-expressions": "off",
        },
    },

    // Globální nastavení
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2025,
                process: "readonly", // Přidání process jako globální proměnné
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            "no-console": "off", // Povolení console.log během vývoje
            "no-debugger": "off", // Varování pro debugger
            "no-undef": "off", // TypeScript kontroluje typy lépe
        },
    },

    // Nastavení pro testovací soubory
    {
        files: [
            "**/*.test.{js,jsx,ts,tsx}",
            "**/*.spec.{js,jsx,ts,tsx}",
            "**/__tests__/**",
        ],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            "no-undef": "off",
        },
    },

    // Ignorování určitých souborů
    {
        ignores: [
            "dist/**",
            "build/**",
            "node_modules/**",
            ".cache/**",
            "public/build/**",
            "coverage/**",
            "worker-configuration.d.ts",
            "README.md",
            "app/app.css",
            ".react-router/**",
        ],
    },
];
