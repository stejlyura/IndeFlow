name: fullstack-backend
description: Use for writing core backend business logic, database schema design, ORM/query builder integrations, and background job processing.

Backend & Database Architecture

Goal

Build secure, ACID-compliant, and highly performant server-side architectures.

Checklists

Database Access: Use connection pooling. Ensure all user inputs are sanitized or use parameterized queries via ORM/Query Builders (e.g., Prisma, Drizzle, Kysely).

Business Logic: Isolate business logic from HTTP request handlers. HTTP handlers should only parse input, call a service layer, and format the output.

Transactions: Wrap multiple dependent database write operations in a single transaction.

Security: Implement rate limiting, CORS, and robust JWT/Session validation.

Validation Loop

Verify database migrations apply cleanly.

Test endpoints for SQL injection and XSS vulnerabilities.

Constraints

FORBIDDEN to store plain-text passwords. Always hash using Argon2 or bcrypt.

FORBIDDEN to perform heavy synchronous operations that block the Node.js event loop.