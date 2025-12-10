import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "src/plugin.ts",
  output: {
    file: "com.powertoys.controller.sdPlugin/bin/plugin.js",
    format: "esm",
    sourcemap: true
  },
  external: [
    "node:child_process",
    "node:util",
    "node:path",
    "node:fs",
    "node:http",
    "node:https",
    "node:zlib",
    "node:stream",
    "node:buffer",
    "node:events",
    "node:url",
    "node:net",
    "node:crypto",
    "node:tls",
    "@nut-tree-fork/nut-js"
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
      exportConditions: ["node"]
    }),
    commonjs({
      ignoreDynamicRequires: true
    }),
    json(),
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
};
