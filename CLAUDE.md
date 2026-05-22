# CLAUDE.md — CocoBongo

## Project Overview

**CocoBongo** is an early-stage e-commerce project. The repository was initialized on 2026-05-17 and currently contains only a README. This file will evolve as the codebase grows; update it whenever new tools, patterns, or workflows are introduced.

## Current Repository State

```
CocoBongo/
├── README.md          # One-line project description
└── CLAUDE.md          # This file
```

No application code, package manager files, or configuration exists yet. The next logical steps are to decide on a tech stack and scaffold the project.

## Git Conventions

- **Development branch**: `claude/claude-md-docs-5Srtn` (active feature branch; all AI-assisted changes go here unless told otherwise)
- **Main branch**: `main` — do not push directly; changes flow through feature branches
- **Commit style**: imperative, present tense ("Add product listing page", not "Added…")
- **Push command**: always use `git push -u origin <branch-name>`

Never amend a published commit. Create a new commit to fix a mistake.

## Available MCP Integrations

This session has access to several MCP servers that are relevant to this project:

### Shopify (`0e488a68-…`)
The primary store management integration. Use these tools for all Shopify work:
- **Products**: `search_products`, `get-product`, `create-product`, `update-product`, `bulk-update-product-status`
- **Collections**: `search_collections`, `get-collection`, `create-collection`, `update-collection`, `add-to-collection`
- **Orders**: `list-orders`, `get-order`
- **Customers**: `list-customers`
- **Inventory**: `get-inventory-levels`, `set-inventory`
- **Analytics**: `run-analytics-query` (ShopifyQL)
- **Discounts**: `create-discount`
- **GraphQL (escape hatch)**: `graphql_query` / `graphql_mutation` for any resource not covered by a dedicated tool (gift cards, metafields, pages, blogs, markets, translations, etc.). Prefer dedicated tools first; fall back to GraphQL when no dedicated tool fits.

### Netlify (`253b3276-…`)
Deployment and hosting. Use for reading/updating deploy config, extensions, and team settings:
- `netlify-deploy-services-reader` / `-updater`
- `netlify-project-services-reader` / `-updater`
- `netlify-extension-services-reader` / `-updater`
- `netlify-team-services-reader`

### GitHub (`mcp__github__*`)
All GitHub interactions must go through the MCP tools — the `gh` CLI is not available.
- Scope is restricted to `qq8nnfs962-sudo/cocobongo`
- Use `mcp__github__push_files` to push file changes when Bash `git push` is unavailable
- Use `mcp__github__create_pull_request` only when the user explicitly requests a PR

### Media Generation (`4732cb00-…`)
- `generate_image` / `generate_video` for creative assets
- `virality_predictor` for engagement/retention analysis
- `media_upload` + `media_confirm` when the user provides a local file

### Canva (`58f51fc1-…`)
Design tooling for marketing materials:
- `generate-design`, `generate-design-structured` for AI-generated designs
- `search-brand-templates`, `get-brand-template-dataset` for brand-consistent output
- `export-design` to download finished assets

## Development Conventions (to adopt as the project is built)

### Code Style
- No comments unless the *why* is non-obvious (a hidden constraint, a workaround, a subtle invariant)
- No docstrings that restate what well-named identifiers already express
- Prefer editing existing files over creating new ones

### Security
- Never commit secrets, API keys, or `.env` files
- Validate all inputs at system boundaries (user input, external API responses); trust internal framework guarantees
- No SQL injection, XSS, command injection — follow OWASP Top 10

### Error Handling
- Only add error handling for scenarios that can actually happen
- Do not add fallbacks or validation for impossible states

### Pull Requests
- Do not open a PR unless the user explicitly asks
- PR title: under 70 characters, imperative mood
- PR body: bullet summary + test plan checklist

## Working with Shopify

When making changes to the Shopify store:
1. Prefer built-in MCP tools over raw GraphQL when a dedicated tool exists
2. Use `graphql_schema` to explore available types before writing a custom mutation
3. Use `validate_graphql_codeblocks` to check queries before executing them
4. Bulk operations (e.g., `bulk-update-product-status`) are preferred over looping single-item calls

## Updating This File

Update CLAUDE.md whenever:
- A new tech stack, framework, or major dependency is introduced
- Build, test, or lint commands are established
- New environment variables or secrets are required
- Architectural decisions that would surprise a future contributor are made

Keep it factual and current — this file is read by AI assistants, not just humans.
