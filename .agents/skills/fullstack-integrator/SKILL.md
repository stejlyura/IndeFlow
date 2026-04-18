name: fullstack-integrator
description: Use for tasks involving frontend and backend integration, creating API routes, database operations, authentication setup, or full-stack architectural refactoring.

Fullstack Integration & Architecture

Goal

Create a secure, scalable, and efficient bridge between the client side and the database/API server.

Checklists

API Endpoints: API routes must return strict JSON responses.

Error Handling:

Never return raw database stack traces to the client.

Use standardized HTTP status codes (400, 401, 403, 404, 500).

Log actual errors on the server.

Database:

Encapsulate DB query logic into separate service functions. Do not write direct SQL queries inside API controllers.

Use parameterized queries to prevent SQL injections.

Validation Loop

Before removing a task from IN_WORK.md, you must test the API route using curl with a test JSON payload and verify a 200 OK response.

Constraints

FORBIDDEN to hardcode passwords, tokens, or API keys in the codebase. Always use environment variables (.env).