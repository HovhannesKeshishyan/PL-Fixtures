# views

FSD normally names this layer `app/`, but this project uses Next.js App Router
which already owns the `app/` directory for routing (layout.tsx, page.tsx, etc.).

To avoid the collision, this layer is renamed to `views/`.

Each slice here is a page-level composition — it assembles widgets and has
no business logic of its own.

Reference: https://feature-sliced.design/docs/reference/layers