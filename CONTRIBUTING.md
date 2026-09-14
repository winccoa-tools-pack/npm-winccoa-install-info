# Contributing

Thank you for contributing to this NPM package.

## Steps

- Fork the repository and create a branch per change: `git checkout -b feat/your-change`
- Install and build: `npm ci` (or `npm install`) then `npm run build`
- Run tests: `npm run test:unit` and `npm run test:integration` (or `npm test` for style + build + unit)
- Ensure TypeScript compiles: `npm run build`
- Commit with clear messages and open a Pull Request against `develop`

## Test the CLI locally

Use this when you change the CLI or want to exercise discovery against **your** machine (installed WinCC OA versions and the host project registry).

From the repository root:

### 1. Build, then run the compiled bin (recommended)

```shell
npm ci
npm run build
node dist/cjs/cli.js --help
node dist/cjs/cli.js versions
node dist/cjs/cli.js projects
node dist/cjs/cli.js versions --no-json
node dist/cjs/cli.js projects --result-file projects.json
```

JSON is the default. Use `--no-json` for a simple TSV table.

When core logs mix with the payload on stdout, use `--result-file <path>` so
scripts can read a clean file. A short “Wrote result to …” line goes to stderr.

### 2. Link the bin (optional)

So `winccoa-install-info` works on your PATH while you iterate:

```shell
npm run build
npm link
winccoa-install-info versions
winccoa-install-info projects --json
```

Unlink when finished:

```shell
npm unlink -g @winccoa-tools-pack/npm-winccoa-install-info
```

Until you `npm link` (or install globally), prefer `node dist/cjs/cli.js …` — a bare `winccoa-install-info` command will not resolve.

### 3. Without a full build (TypeScript via tsx)

```shell
npx tsx src/cli.ts --help
npx tsx src/cli.ts versions
npx tsx src/cli.ts projects
```

### 4. Automated checks

```shell
npm run test:unit
npm run test:integration
```

### Exit codes

| Code | Meaning |
| ------ | --------- |
| 0 | Success |
| 1 | Usage / help (also normal for `--help`) |
| 2 | Runtime failure (e.g. discovery error) |

`versions` / `projects` reflect what core finds on the local host. On a machine without WinCC OA you may get empty lists; that is still a successful run (exit 0).

**Note:** `projects` uses core’s project registry, which opens a short-lived file watcher on `pvssInst.conf`.
The CLI stops that watcher before exit so the process does not hang. If you call `listProjects()` from a long-running app and need a clean shutdown, call core’s `stopWatchingProjectRegistries()` yourself.

## Code style

- Use TypeScript and keep exports stable.
- Add tests for significant logic changes.
- Do not reimplement install/registry discovery — call `@winccoa-tools-pack/npm-winccoa-core`.

Maintainers will review PRs and may request changes. Thanks!
<!-- markdownlint-disable MD033 -->
<div align="center">Made with ❤️ for and by the WinCC OA community</div>
