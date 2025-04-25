# VSCode Settings Documentation

This document outlines the Visual Studio Code settings configured in the `settings.json` file, organized by category with explanations for each setting. Relevant extensions are noted where applicable.

---

## 🖌️ Editor: General Settings

General settings for the VSCode editor, controlling formatting, tabs, and code actions.

- **`editor.tabSize`: 2**
  Sets the number of spaces per tab to 2 for consistent indentation.
  _Extension_: Built-in.

- **`editor.insertSpaces`: true**
  Uses spaces instead of tabs for indentation.
  _Extension_: Built-in.

- **`editor.formatOnSave`: true**
  Automatically formats code when saving a file.
  _Extension_: Built-in, enhanced by `esbenp.prettier-vscode`.

- **`editor.defaultFormatter`: "esbenp.prettier-vscode"**
  Sets Prettier as the default formatter for consistent code styling.
  _Extension_: Prettier - Code formatter (`esbenp.prettier-vscode`).

- **`editor.cursorBlinking`: "smooth"**
  Makes the cursor blink smoothly for better visibility.
  _Extension_: Built-in.

- **`editor.cursorStyle`: "line"**
  Sets the cursor to a vertical line style.
  _Extension_: Built-in.

- **`editor.cursorWidth`: 2**
  Sets the cursor width to 2 pixels for better visibility.
  _Extension_: Built-in.

- **`editor.codeActionsOnSave`**:
  Runs ESLint fixes on save to enforce linting rules.
  _Extension_: ESLint (`dbaeumer.vscode-eslint`).

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.cursorBlinking": "smooth",
  "editor.cursorStyle": "line",
  "editor.cursorWidth": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

---

## 🎨 Editor: Appearance

Settings controlling the visual appearance of the editor, including fonts and UI elements.

- **`editor.fontFamily`: "Fira Code"**
  Uses Fira Code, a monospaced font with ligatures, for better readability.
  _Extension_: Built-in (requires Fira Code font installed).

- **`editor.fontLigatures`: true**
  Enables ligatures for supported fonts like Fira Code (e.g., `=>` becomes a single glyph).
  _Extension_: Built-in.

- **`editor.fontSize`: 16**
  Sets the font size to 16px for comfortable reading.
  _Extension_: Built-in.

- **`editor.fontWeight`: "600"**
  Sets the font weight to semi-bold for clarity.
  _Extension_: Built-in.

- **`editor.letterSpacing`: 0**
  Disables extra spacing between characters.
  _Extension_: Built-in.

- **`editor.lineHeight`: 22**
  Sets the line height to 22px for better readability.
  _Extension_: Built-in.

- **`editor.renderWhitespace`: "trailing"**
  Shows trailing whitespace to help identify unnecessary spaces.
  _Extension_: Built-in.

- **`editor.occurrencesHighlight`: "off"**
  Disables highlighting of matching symbols to reduce visual clutter.
  _Extension_: Built-in.

- **`editor.codeLens`: true**
  Displays CodeLens (references, implementations) above code symbols.
  _Extension_: Built-in.

- **`editor.stickyScroll.enabled`: false**
  Disables sticky scroll to keep the editor view clean.
  _Extension_: Built-in.

- **`editor.bracketPairColorization.enabled`: true**
  Colorizes matching brackets for better code navigation.
  _Extension_: Built-in.

- **`editor.guides.bracketPairs`: false**
  Disables bracket pair guides to avoid visual distractions.
  _Extension_: Built-in.

```json
{
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "editor.fontSize": 16,
  "editor.fontWeight": "600",
  "editor.letterSpacing": 0,
  "editor.lineHeight": 22,
  "editor.renderWhitespace": "trailing",
  "editor.occurrencesHighlight": "off",
  "editor.codeLens": true,
  "editor.stickyScroll.enabled": false,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": false
}
```

---

## 💡 Editor: Suggestions

Settings for controlling code suggestion behavior.

- **`editor.suggest.snippetsPreventQuickSuggestions`: true**
  Prevents quick suggestions for snippets to reduce suggestion clutter.
  _Extension_: Built-in.

- **`editor.snippetSuggestions`: "inline"**
  Configures the display of snippet suggestions in the suggestion list. The `"inline"` value shows snippets mixed with other suggestions in alphabetical order.
  _Extension_: Built-in.

```json
{
  "editor.suggest.snippetsPreventQuickSuggestions": true,
  "editor.snippetSuggestions": "inline"
}
```

---

## 🛠️ Linting & Validation

Settings for linting and code validation, primarily using ESLint.

- **`eslint.format.enable`: true**
  Enables ESLint as a formatter for supported languages.
  _Extension_: ESLint (`dbaeumer.vscode-eslint`).

- **`eslint.validate`**:
  Specifies languages for ESLint validation: `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `html`, `json`.
  _Extension_: ESLint (`dbaeumer.vscode-eslint`).

```json
{
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "json"
  ]
}
```

---

## ✂️ Prettier: Code Formatting

Settings for Prettier, the code formatter, to enforce consistent styling.

- **`prettier.useTabs`: false**
  Uses spaces instead of tabs for formatting.
  _Extension_: Prettier - Code formatter (`esbenp.prettier-vscode`).

- **`prettier.tabWidth`: 2**
  Sets the tab width to 2 spaces.
  _Extension_: Prettier.

- **`prettier.printWidth`: 80**
  Sets the maximum line length to 80 characters.
  _Extension_: Prettier.

- **`prettier.singleQuote`: false**
  Uses double quotes instead of single quotes.
  _Extension_: Prettier.

- **`prettier.trailingComma`: "es5"**
  Adds trailing commas where valid in ES5 (objects, arrays).
  _Extension_: Prettier.

- **`prettier.semi`: false**
  Adds semicolons at the end of statements.
  _Extension_: Prettier.

- **`prettier.bracketSpacing`: true**
  Adds spaces between brackets in object literals.
  _Extension_: Prettier.

- **`prettier.arrowParens`: "always"**
  Includes parentheses around arrow function parameters.
  _Extension_: Prettier.

- **`prettier.htmlWhitespaceSensitivity`: "strict"**
  Enforces strict whitespace handling in HTML.
  _Extension_: Prettier.

```json
{
  "prettier.useTabs": false,
  "prettier Sliding tabWidth": 2,
  "prettier.printWidth": 80,
  "prettier.singleQuote": false,
  "prettier.trailingComma": "es5",
  "prettier.semi": false,
  "prettier.bracketSpacing": true,
  "prettier.arrowParens": "always",
  "prettier.htmlWhitespaceSensitivity": "strict"
}
```

---

## 🌐 HTML: Formatting

Settings for formatting HTML files.

- **`html.format.wrapAttributes`: "force-aligned"**
  Wraps and aligns HTML attributes for better readability.
  _Extension_: Built-in.

```json
{
  "html.format.wrapAttributes": "force-aligned"
}
```

---

## 🖥️ Terminal Settings

Settings for the integrated terminal in VSCode.

- **`terminal.integrated.fontFamily`: "Hack"**
  Uses Hack font for the terminal.
  _Extension_: Built-in (requires Hack font installed).

- **`terminal.integrated.fontSize`: 16**
  Sets the terminal font size to 16px.
  _Extension_: Built-in.

- **`terminal.integrated.defaultProfile.windows`: "Git Bash"**
  Sets Git Bash as the default terminal on Windows.
  _Extension_: Built-in.

```json
{
  "terminal.integrated.fontFamily": "Hack",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.defaultProfile.windows": "Git Bash"
}
```

---

## 📁 File & Explorer Settings

Settings for file handling and the file explorer.

- **`explorer.compactFolders`: false**
  Displays folders in expanded form in the explorer.
  _Extension_: Built-in.

- **`explorer.confirmDragAndDrop`: false**
  Disables confirmation prompts for drag-and-drop in the explorer.
  _Extension_: Built-in.

- **`files.trimTrailingWhitespace`: true**
  Removes trailing whitespace from files on save.
  _Extension_: Built-in.

```json
{
  "explorer.compactFolders": false,
  "explorer.confirmDragAndDrop": false,
  "files.trimTrailingWhitespace": true
}
```

---

## 🐞 Debugging

Settings for debugging in VSCode.

- **`debug.openDebug`: "openOnDebugBreak"**
  Opens the debug view when a breakpoint is hit.
  _Extension_: Built-in.

```json
{
  "debug.openDebug": "openOnDebugBreak"
}
```

---

## 📡 Git Settings

Settings for Git integration in VSCode.

- **`git.ignoreMissingGitWarning`: true**
  Suppresses warnings when Git is not detected.
  _Extension_: Built-in.

- **`git.openRepositoryInParentFolders`: "never"**
  Prevents VSCode from opening Git repositories in parent folders.
  _Extension_: Built-in.

- **`git.autofetch`: true**
  Automatically fetches Git updates in the background.
  _Extension_: Built-in.

```json
{
  "git.ignoreMissingGitWarning": true,
  "git.openRepositoryInParentFolders": "never",
  "git.autofetch": true
}
```

---

## 🌍 Live Server Settings

Settings for the Live Server extension.

- **`liveServer.settings.donotShowInfoMsg`: true**
  Disables info messages from Live Server.
  _Extension_: Live Server (`ritwickdey.LiveServer`).

- **`liveServer.settings.donotVerifyTags`: true**
  Disables tag verification in Live Server.
  _Extension_: Live Server.

```json
{
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true
}
```

---

## 📦 Import Settings

Settings for managing imports in JavaScript and TypeScript.

- **`typescript.updateImportsOnFileMove.enabled`: "always"**
  Automatically updates TypeScript imports when files are moved.
  _Extension_: Built-in.

- **`javascript.updateImportsOnFileMove.enabled`: "always"**
  Automatically updates JavaScript imports when files are moved.
  _Extension_: Built-in.

```json
{
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

---

## ⚡ Emmet Settings

Settings for Emmet, which enhances HTML/CSS workflows.

- **`emmet.showSuggestionsAsSnippets`: true**
  Shows Emmet suggestions as snippets for faster coding.
  _Extension_: Built-in.

```json
{
  "emmet.showSuggestionsAsSnippets": true
}
```

---

## 🎨 Theme & Appearance

Settings for the overall VSCode theme and icons.

- **`workbench.colorTheme`: "GitHub Dark Default"**
  Sets the editor theme to GitHub Dark Default.
  _Extension_: Built-in.

- **`workbench.iconTheme`: "material-icon-theme"**
  Uses Material Icon Theme for file and folder icons.
  _Extension_: Material Icon Theme (`PKief.material-icon-theme`).

- **`material-icon-theme.folders.theme`: "specific"**
  Uses specific folder icons from Material Icon Theme.
  _Extension_: Material Icon Theme.

- **`material-icon-theme.folders.color`: "#90a4ae"**
  Sets folder icon color to a light blue-gray.
  _Extension_: Material Icon Theme.

- **`material-icon-theme.activeIconPack`: "angular_ngrx"**
  Uses Angular/NgRx-specific icons for relevant files.
  _Extension_: Material Icon Theme.

- **`breadcrumbs.enabled`: false**
  Disables breadcrumbs to reduce UI clutter.
  _Extension_: Built-in.

- **`workbench.colorCustomizations`**:
  Customizes colors for the GitHub Dark Default theme.
  _Extension_: Built-in.

```json
{
  "workbench.colorTheme": "GitHub Dark Default",
  "workbench.iconTheme": "material-icon-theme",
  "material-icon-theme.folders.theme": "specific",
  "material-icon-theme.folders.color": "#90a4ae",
  "material-icon-theme.activeIconPack": "angular_ngrx",
  "breadcrumbs.enabled": false,
  "workbench.colorCustomizations": {
    "[GitHub Dark Default]": {
      "gitDecoration.untrackedResourceForeground": "#9ff747",
      "gitDecoration.modifiedResourceForeground": "#fcff4a",
      "terminal.ansiYellow": "#fffb13"
    }
  }
}
```

---

## 🌈 Syntax Highlighting

Customizes syntax highlighting for the GitHub Dark Default theme.

- **`editor.tokenColorCustomizations`**:
  Defines custom colors for specific code scopes.
  _Extension_: Built-in.

- **`editor.semanticTokenColorCustomizations`**:
  Disables semantic token highlighting for the GitHub Dark Default theme.
  _Extension_: Built-in.

```json
{
  "editor.tokenColorCustomizations": {
    "[GitHub Dark Default]": {
      "textMateRules": [
        {
          "scope": "text.html.derivative",
          "settings": { "foreground": "#f1f1cc" }
        },
        {
          "scope": [
            "variable.parameter",
            "punctuation.definition.tag.begin.html",
            "punctuation.definition.tag.end.html",
            "support.type.property-name.css",
            "entity.name.type.module"
          ],
          "settings": { "foreground": "#e6edf3" }
        },
        {
          "scope": [
            "keyword.control.import",
            "keyword.control.from",
            "keyword.control.export",
            "keyword.control.flow",
            "keyword.control.conditional",
            "keyword.control.trycatch"
          ],
          "settings": { "foreground": "#f75992" }
        },
        {
          "scope": [
            "support.type.primitive",
            "support.type.builtin",
            "support.class"
          ],
          "settings": { "foreground": "#ffa657" }
        },
        {
          "scope": ["variable.parameter"],
          "settings": { "foreground": "#32f0ca" }
        },
        {
          "scope": ["string"],
          "settings": { "foreground": "#f1fa8c" }
        },
        {
          "scope": ["constant.language.boolean"],
          "settings": { "foreground": "#fa8cd0" }
        }
      ]
    }
  },
  "editor.semanticTokenColorCustomizations": {
    "[GitHub Dark Default]": {
      "enabled": false,
      "rules": {}
    }
  }
}
```

---

## 🧩 Extension Settings

Settings for specific VSCode extensions.

- **`hediet.vscode-drawio.resizeImages`: null**
  Disables image resizing in the Draw.io extension.
  _Extension_: Draw.io Integration (`hediet.vscode-drawio`).

```json
{
  "hediet.vscode-drawio.resizeImages": null
}
```

---

## 📜 Language-Specific Settings

Settings tailored for specific programming languages.

### Dart

- **`editor.defaultFormatter`: "Dart-Code.dart-code"**
  Uses Dart formatter for Dart files.
  _Extension_: Dart (`Dart-Code.dart-code`).
- **`editor.formatOnType`: true**
  Formats Dart code while typing.
  _Extension_: Dart.
- **`editor.rulers`: [80]**
  Adds a vertical ruler at 80 characters.
  _Extension_: Built-in.
- **`editor.selectionHighlight`: false**
  Disables selection highlighting.
  _Extension_: Built-in.
- **`editor.suggest.snippetsPreventQuickSuggestions`: false**
  Allows snippet suggestions.
  _Extension_: Built-in.
- **`editor.suggestSelection`: "first"**
  Selects the first suggestion by default.
  _Extension_: Built-in.
- **`editor.tabCompletion`: "off"**
  Disables tab completion.
  _Extension_: Built-in.
- **`editor.wordBasedSuggestions`: "off"**
  Disables word-based suggestions.
  _Extension_: Built-in.

```json
{
  "[dart]": {
    "editor.defaultFormatter": "Dart-Code.dart-code",
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "off",
    "editor.wordBasedSuggestions": "off"
  }
}
```

### Go

- **`editor.insertSpaces`: true**
  Uses spaces for indentation in Go files.
  _Extension_: Built-in.
- **`editor.formatOnSave`: true**
  Formats Go code on save.
  _Extension_: Go (`golang.go`).
- **`editor.defaultFormatter`: "golang.go"**
  Uses Go formatter for Go files.
  _Extension_: Go (`golang.go`).

```json
{
  "[go]": {
    "editor.insertSpaces": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "golang.go"
  }
}
```

---

## ⚙️ Miscellaneous

Additional settings for various VSCode features.

- **`security.workspace.trust.untrustedFiles`: "open"**
  Automatically opens untrusted files without prompting.
  _Extension_: Built-in.

- **`http.proxyAuthorization`: null**
  Disables proxy authorization.
  _Extension_: Built-in.

- **`turboConsoleLog.insertEnclosingClass`: false**
  Disables adding class names to console logs.
  _Extension_: Turbo Console Log (`ChakrounAnas.turbo-console-log`).

- **`turboConsoleLog.insertEnclosingFunction`: false**
  Disables adding function names to console logs.
  _Extension_: Turbo Console Log.

- **`turboConsoleLog.logMessagePrefix`: ""**
  Removes prefixes from console log messages.
  _Extension_: Turbo Console Log.

- **`turboConsoleLog.delimiterInsideMessage`: ""**
  Removes delimiters from console log messages.
  _Extension_: Turbo Console Log.

- **`redhat.telemetry.enabled`: true**
  Enables telemetry for Red Hat extensions (e.g., YAML).
  _Extension_: YAML (`redhat.vscode-yaml`).

```json
{
  "security.workspace.trust.untrustedFiles": "open",
  "http.proxyAuthorization": null,
  "turboConsoleLog.insertEnclosingClass": false,
  "turboConsoleLog.insertEnclosingFunction": false,
  "turboConsoleLog.logMessagePrefix": "",
  "turboConsoleLog.delimiterInsideMessage": "",
  "redhat.telemetry.enabled": true
}
```

---

This configuration is optimized for a productive development environment with a focus on JavaScript, TypeScript, HTML, and Dart development, using popular extensions like Prettier, ESLint, and Material Icon Theme.
