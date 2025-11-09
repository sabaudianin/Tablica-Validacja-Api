# React + TypeScript + Vite

Termin realizacji zadan rekrutacyjnych (piątek 07.11.25) i commit
f5aa38cc47b01c9d2b61cb0d6c405f04b2710b6d spełniał wszystkie założone wymagania, także prosze pod uwage brać stan projektu z tego terminu i commita .
Po tym terminie realizuje dalsze ulepszanie aplikacji i refaktoryzacje kodu do stanu który będzie mnie zadowalał.

## LIVE DEMO Projektu dostepne (latest version) : https://peselchecker.netlify.app/

### Prosta aplikacja składająca się z trzech części:

# LITEROPRZESTAWIACZ -

Pozwala na wpisanie dowolnego tekstu za pomocą formularza lub załadowanie pliku tekstowego, po wciśnięciu buttona losowo przestawia szyk liter w każdym wyrazie, oprócz pierwszej i ostatniej litery. Bazuje na metodach tablicowych.

# PESELCHECKER -

Aplikacja validująca poprawność numeru PESEL, po podaniu prawidłowego PESELU podaje datę urodzenia i płeć. Aplikacja przetestowana testami jednostkowymi przy pomocy VITEST.

# Obsługa API -

APlikacja obsługująca operacje CRUD na API z GoRest. Celowo nie zastosowano żadnej biblioteki.

###

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
