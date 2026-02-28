# Mysuru Marga - Sovereign Backend

This directory contains the serverless backend logic for the Mysuru Marga application, primarily focused on secure API proxying and AI operations.

## Technology Stack

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

## Directory Structure

```text
server/
└── api/

```

## Security Protocols

### API Proxying
The backend acts as a secure intermediary for:
- **Input Validation**: Incoming requests are validated before being processed.

## Deployment

The backend is designed to run as **Vercel Serverless Functions**. 
- Configuration is handled via the root `vercel.json`.
- Routing: All requests to `/api/*` are routed to `server/api/*.js`.

## Local Testing

To test API points locally:
1. The frontend development server (`npm run dev`) proxies requests to the backend logic.

---

*Securing the digital gates of Mysuru.*
