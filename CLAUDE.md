# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm start          # Start with Expo Go
pnpm android        # Run on Android
pnpm ios            # Run on iOS

# Code quality (Biome — writes fixes automatically)
pnpm biome:check
```

No test suite is configured.

## Environment

Requires a `.env` file with:

```
EXPO_PUBLIC_API_URL=<AWS Lambda API Gateway base URL>
```

Validated at startup via Zod in [src/app/config/env.ts](src/app/config/env.ts).

## Architecture

### Directory Layout

```
src/
├── app/                    # Business logic layer
│   ├── config/             # Zod-validated env config
│   ├── lib/
│   │   ├── query-options/  # TanStack Query query configs
│   │   ├── mutation-options/  # TanStack Query mutation configs
│   │   └── auth-tokens-manager.ts  # AsyncStorage token persistence
│   ├── navigation/         # React Navigation stacks
│   ├── providers/          # AuthProvider, TanStack QueryProvider
│   ├── services/           # Axios-based API service classes
│   └── types/              # Shared TypeScript types
└── ui/
    ├── components/         # Reusable UI (AppText, Button, Input, modals)
    ├── screens/            # Feature screens (home, meal-details, onboarding)
    ├── styles/             # Theme constants + createVariants() utility
    └── utils/              # Misc helpers
```

Path aliases: `@app/*` → `src/app/*`, `@ui/*` → `src/ui/*`

### Navigation

Root navigator in [src/app/navigation/index.tsx](src/app/navigation/index.tsx) switches between two stacks based on auth state:

- **AuthStack**: Greetings → Onboarding (multi-step signup)
- **AppStack**: Home → MealDetails

### Auth & Token Management

`AuthProvider` ([src/app/providers/auth-provider.tsx](src/app/providers/auth-provider.tsx)) owns all auth state. Tokens are persisted to AsyncStorage under `@foodiary:auth-tokens`. The Axios client in `Service` base class has a 401 interceptor that automatically calls the refresh endpoint before surfacing the error to callers.

Splash screen is held open until the auth token load completes.

### API Layer

All services extend the abstract `Service` base class ([src/app/services/service.ts](src/app/services/service.ts)), which owns a shared Axios instance. Endpoints:

- `AuthService` — sign-in, sign-up, refresh-token
- `MealsService` — list by date, get by ID, create (with S3 presigned upload)
- `AccountService` — fetch user profile + nutrition goals

File upload flow: create meal entry → receive presigned POST URL → decode base64 and upload directly to S3 → backend processes asynchronously. Meal `status` field (`PENDING → QUEUED → PROCESSING → SUCCESS | FAILED`) tracks this async pipeline.

### Server State

TanStack Query v5 with `staleTime: Infinity` for meals (no background refetch — only on pull-to-refresh or date change). Query/mutation configs live in `src/app/lib/query-options/` and `src/app/lib/mutation-options/`.

### Screen Pattern

Each screen follows this structure:

- A controller hook (`use-*-controller.ts`) that owns the screen's logic and returns values to the view
- A context file under `context/` when state needs to be shared across sub-components
- Sub-components in a `components/` subfolder

### Styling

No CSS framework. Styles use React Native `StyleSheet` with a central theme ([src/ui/styles/theme/](src/ui/styles/theme/)) for colors, font families, and sizes. The `createVariants()` utility ([src/ui/styles/utils/](src/ui/styles/utils/)) provides type-safe style composition for component variants (similar to CVA).

### Forms

Multi-step onboarding uses React Hook Form with a `FormProvider` at the stack root, allowing each step to call `useFormContext()`. Zod v4 schemas in `schema.ts` with PT-BR error messages.

### Conventions

- **Files**: kebab-case
- **Components/Types**: PascalCase
- **Hooks**: camelCase `use` prefix
- **Enums**: string literals in SCREAMING_SNAKE_CASE (`'PENDING' | 'SUCCESS'`)
- **Formatting**: Biome — single quotes, no semicolons, CRLF
