src/
api/ # Single source of truth for ALL data access
clients/ # HTTP client config (axios/fetch)
endpoints/ # API endpoint definitions
hooks/ # React hooks for data fetching
mocks/ # Mock data + MSW setup
types/ # Shared API types
index.ts # Public API exports

data/ # Static JSON mocks (your blog posts, users, etc)
