import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
      },
      jsxImportSource: "@emotion/react",
      composite: false,
      declaration: true,
      declarationMap: true,
    },
  },
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  platform: "browser",
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
    // 配置路径别名
    options.alias = {
      "@": "./src",
    };
  },
  outDir: "dist",
  target: "es2018",
});
