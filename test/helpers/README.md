# Test helpers

Shared helpers for integration tests in this package.

## `integration-teardown.ts`

`printLocalIntegrationTestResult(tag, result)` — prints a stable stdout/stderr
summary after a local CLI integration run (useful to paste into a PR when CI
OOMs). Used by `test/integration/cli-help.test.ts`.

Project register/unregister helpers from the npm template were removed; this
CLI does not need fixture project lifecycle helpers.

<!-- markdownlint-disable MD033 -->
<div align="center">Made with ❤️ for and by the WinCC OA community</div>
