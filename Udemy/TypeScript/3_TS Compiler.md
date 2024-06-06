# TS Compiler

### Watch Mode

`tsc {target} -w`

- for single file

`tsc --init`

- compiler wil create ‘tsconfig.json’
- typing `tsc` will compile all TS files in the project
- `tsc -w` to watch the project

### tsconfig.json

- exclude: if there is no exclude option, will exclude ‘node_modules’
- include: whitelist
- compilerOptions
  - target: targeted javascript version
  - lib: default has DOMs and targeted javascript libraries
    - [‘dom’, ‘es6’, ‘dom.iterable’, ‘scripthost’]
  - sourceMap: can see ts files in browser devtools
  - outDir: directory for compiled js files
  - noEmitOnError: if error, no files generated

### Debugging

- sourceMap: true
- /.vscode
  - launch.json