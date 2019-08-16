# Dapplet Extension: Examples of Using

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

This repository is built as a mono-repository. Lerna is used to assemble packages inside.

### Solution Structure

```
$/
  dist/
  docs/
  packages/
    common-lib/
    dapplet-extension-types/
    twitter-adapter/
    twitter-adapter-legacy/
    twitter-adapter-new/
    twitter-feature-1/
    twitter-feature-2/
  src/
    client/
    server/
```

- `dist` - Build results. This directory is locally accessible at http://localhost:8080/dist
- `dist\index.json` - Config file for modules declaration and binding beetwen them and hostnames
- `docs` - Documentation
- `packages` - Examples of modules for Dapplet Extension
- `packages\dapplet-extension-types` - Global types of dapplet extension
- `packages\common-lib` - CommonLib for adapters
- `packages\twitter-adapter` - Resolver of Adapter for twitter.com
- `packages\twitter-adapter-legacy` - Content adapter for legacy design of twitter.com
- `packages\twitter-adapter-new` - Content adapter for new design of twitter.com
- `packages\twitter-feature-1` - First Feature injecting controls for twitter.com
- `packages\twitter-feature-2` - Second Feature injecting controls for twitter.com
- `src` - Dev server sources
- `src\client` - Overlay sources
- `src\server` - It serves dist folder and generates dev config dynamically

### Building

1.  Clone repo
2.  `npm install` to install all dependencies and symbolic linking of adjacent packages 
3.  `npm run start` to run the dev task in watch mode or `npm run build` to build a production version

### Attaching Bundles to Extension
During `npm run start`, connect to Dev Server via Extension Dev Tab

Dev Config URL: `http://localhost:8080/index.json`

### [NOT RELEVANT] How to create a new module?

1. Add path to your package inside `tsconfig.json` file like below:
```json
{
  "references": [
    {
      "path": "./packages/{YOUR_PACKAGE_NAME}"
    }
  ]
}
```
2. Create a new folder inside `packages` directory.
3. Run `npm init` for package.json file creation.
4. Add `build`, `watch` and `clean` scripts to package.json like below (do not forget replace `{YOUR_BUNDLE_NAME}` to name of your package/folder):
```json
"scripts": {
  "build": "browserify -e src/index.ts -p tsify -o ../../dist/{YOUR_BUNDLE_NAME}.js",
  "watch": "watchify -v -e src/index.ts -p tsify -o ../../dist/{YOUR_BUNDLE_NAME}.js",
  "clean": "(if exist lib rd /q /s lib) & (if exist dist rd /q /s dist)"
}
```
5. Run `npm install @dapplets/dapplet-extension-types` from your package directory to add types of extension.
6. Create a `tsconfig.json` file inside your package directory, which contains configuration of TypeScript compilation.
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "lib",
    "rootDir": "src"
  },
  "include": ["./src/**/*"]
}
```
7. Create `src` folder inside your package directory.
8. Create `index.ts` file inside `src` like below:
```typescript
// ==UserScript==
// @name {YOUR_PACKAGE_TITLE}
// @type feature
// @description {YOUR_PACKAGE_DESCRIPTION}
// @author Dapplets Team
// @version 1.0.0
// @familyId {YOUR_PACKAGE_NAME}
// @icon {YOUR_PACKAGE_ICON}
// ==/UserScript==

import { IFeature } from '@dapplets/dapplet-extension-types'

@Feature("{YOUR_PACKAGE_NAME}.dapplet-base.eth", "1.0.0")
export default class Feature implements IFeature {

    public activate() {
        
    }

    public deactivate() {
        
    }
}
```
9. [Additionaly] If you want to use (inject) existing module to your package, then run `npm install {PACKAGE_NAME}` to add dependency and do next step.
10. [Additionaly] Add decorated property to your main class, where module will be injected like below:
```typescript
@Inject("twitter-adapter.dapplet-base.eth", "1.0.0")
public adapter: any;
```
11. Run `npm run bootstrap` from root directory of current repository to add symbolic linking of adjacent packages.
12. Run `npm run watch` to start development!

## Built With

* [TypeScript](https://www.typescriptlang.org/)

## Authors

* **Dmitry Palchun** - *Initial work* - [ethernian](https://github.com/ethernian)
* **Alexander Sakhaev** - *Initial work* - [alsakhaev](https://github.com/alsakhaev)

