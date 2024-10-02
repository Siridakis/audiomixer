import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'es2020', // Keep your target as is
  entry: ['src/main.ts', 'src/Util.ts', 'src/Types.ts', 'src/index.ts'], // Entry files
  format: ['cjs', 'esm'], // Output formats
  splitting: false, // Keep it as is (single output file)
  sourcemap: true, // Generate source maps
  clean: true, // Clean output directory before build
  dts: true, // Generate type declaration files
  minify: true, // Optional: Minify the output
  external: ['ws'], // Don't exclude any dependencies, include `ws`
});
