# bun-react-tailwind-shadcn-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Info

This is a simple web application that fetches cat images from [The Cat API](https://thecatapi.com/) and displays them in a grid layout. 
It also has a detail page for a cat image that shows the image and its data.

## Technologies used

- Bun 
- React.js
- Tailwind CSS
- Shadcn UI
- TypeScript
- React Router
- The Cat API

## Structure

- `src/api` - API client for The Cat API
- `src/components` - Shared UI components (`ui/` for shadcn primitives, `buttons-utils/` for action buttons)
- `src/hooks` - Data-fetching and state hooks
- `src/pages` - Route-level pages
- `src/providers` - Context providers
- `src/lib` - API helpers, constants, and utilities
- `src/types` - Shared TypeScript types
- `build.ts` - Bun build script
