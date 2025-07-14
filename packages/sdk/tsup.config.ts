import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: false,
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
