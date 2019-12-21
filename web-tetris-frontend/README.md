# Tetris Clone

A clone of the popular game tetris, UI is built with javascript canvas 2D while
all the logic is implemented with rust library (rust to wasm)

# Information

Project was created using 

# License
Licensed under MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)


# Contribution
If you come by this project and want to contribute just post an issue, explaining
what feature you would like to add or bug you ran into.




# `create-wasm-app`

> An `npm init` template for kick starting a project that uses NPM packages
> containing Rust-generated WebAssembly and bundles them with Webpack.

This template is designed for depending on NPM packages that contain
Rust-generated WebAssembly and using them to create a Website.

* Want to create an NPM package with Rust and WebAssembly? [Check out
  `wasm-pack-template`.](https://github.com/rustwasm/wasm-pack-template)
* Want to make a monorepo-style Website without publishing to NPM? Check out
  [`rust-webpack-template`](https://github.com/rustwasm/rust-webpack-template)
  and/or
  [`rust-parcel-template`](https://github.com/rustwasm/rust-parcel-template).

## 🚴 Usage

```
npm init wasm-app
```

## 🔋 Batteries Included

- `.gitignore`: ignores `node_modules`
- `LICENSE-APACHE` and `LICENSE-MIT`: most Rust projects are licensed this way, so these are included for you
- `README.md`: the file you are reading now!
- `index.html`: a bare bones html document that includes the webpack bundle
- `index.js`: example js file with a comment showing how to import and use a wasm pkg
- `package.json` and `package-lock.json`:
  - pulls in devDependencies for using webpack:
      - [`webpack`](https://www.npmjs.com/package/webpack)
      - [`webpack-cli`](https://www.npmjs.com/package/webpack-cli)
      - [`webpack-dev-server`](https://www.npmjs.com/package/webpack-dev-server)
  - defines a `start` script to run `webpack-dev-server`
- `webpack.config.js`: configuration file for bundling your js with webpack
