# Deployment & Security Operations

## 1. Cloudflare WAF Rate Limiting
To prevent spam attacks on the form submission endpoint, configure a Rate Limiting rule in the Cloudflare Dashboard.

### Instructions:
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Select your site.
3. Go to **Security > WAF > Rate limiting rules**.
4. Click **Create rate limiting rule**.
5. Fill in the following details:
   - **Rule name**: `Limit Form Submissions`
   - **Expression**: `(http.request.uri.path eq "/api/submit")`
   - **Action**: `Managed Challenge` (recommended) or `Block`.
   - **Rate limit**: e.g., `5` requests per `1 minute`.
6. Click **Deploy**.
