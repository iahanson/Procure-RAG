# Procure-RAG Modernization Notes

This document captures the deliberate decisions made during the 2025 dependency
refresh, plus known deviations from the upstream `Azure-Samples/azure-search-openai-demo`
that this repo is based on.

## Version targets

| Component        | Target                                                        |
|------------------|---------------------------------------------------------------|
| Python           | 3.12 (upgrade `cs-rag` conda env to 3.12)                     |
| Node             | >= 22.12.0 (dev on 24.x is fine)                              |
| React            | 19.x                                                          |
| react-router-dom | 7.x                                                           |
| MSAL             | `@azure/msal-browser` 5.x / `@azure/msal-react` 5.x           |
| Fluent UI v9     | `@fluentui/react-components` 9.x (primary)                    |
| Fluent UI v8     | `@fluentui/react` 8.123.x (retained transitionally — see below) |
| Vite             | 8.x                                                           |
| TypeScript       | 6.x                                                           |
| openai (Python)  | >= 1.109.1                                                    |
| azure-search-documents | 12.1.0b1                                                |
| azure-ai-documentintelligence | 1.0.2                                            |
| Dependency lock  | `pip-compile` (pip-tools) on `requirements.in`               |

## Deliberate deviations from upstream

1. **Fluent UI v8 retained.** Upstream has migrated entirely to `@fluentui/react-components`
   (v9). Several bespoke RBKC components in `app/frontend/src/components/` still depend on
   v8 primitives (`Checkbox`, `Panel`, `DefaultButton`, `Spinner`, `TextField`, `Dropdown`,
   `initializeIcons`, `useId`, etc.). We keep `@fluentui/react` alongside v9 as a
   transitional dependency. A follow-up task should migrate these to v9 and drop v8.

2. **Docker artifacts retained as legacy.** `.devcontainer/` and any `Dockerfile` remain in
   place for users who want that path, but the primary local-dev and `azd deploy` flow
   does **not** use Docker (`azure.yaml` uses `host: appservice` with `language: py`).

3. **`infra/` folder untouched.** Existing Bicep is deployed and stable; not touched by
   this refresh.

4. **RBKC bespoke code preserved.** System prompts in `app/backend/approaches/`, contents of
   `data/`, RBKC UI layout components, i18n copy, and custom branding are unchanged.

5. **Backend code alignment is surgical.** Only changes required by API drift in `openai`,
   `azure-search-documents`, `azure-ai-documentintelligence`, `msgraph-sdk`, and
   `python-jose` → `PyJWT` are applied. The RAG approach implementations are otherwise
   left as-is.

## Known follow-ups (not done in this refresh)

- Migrate bespoke frontend components from Fluent v8 → v9.
- Re-sync `app/backend/approaches/*.py` with upstream once upstream stabilizes on GA
  versions of `azure-search-documents`.
- Consider migrating backend dependency management to `uv` once the wider team standardizes.
- Rebuild `infra/` from upstream if a future feature requires it.
