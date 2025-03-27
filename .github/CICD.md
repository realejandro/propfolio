# PropFolio CI/CD Documentation

This document explains the continuous integration and deployment (CI/CD) setup for PropFolio using GitHub Actions and Render.

## Workflow Overview

The GitHub Actions workflow defined in `.github/workflows/deploy.yml` automates the testing and deployment process:

1. Triggers on:
   - Pushes to the `main` branch
   - Manual triggers via the "workflow_dispatch" event

2. Job Steps:
   - Checkout the code from the repository
   - Set up Node.js environment
   - Install dependencies
   - Run tests
   - Deploy to Render

## Required Secrets

Configure these secrets in your GitHub repository settings (Settings > Secrets and variables > Actions):

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `RENDER_SERVICE_ID` | The ID of your Render service | Go to your Render dashboard, select your service, and find the ID in the URL or settings page |
| `RENDER_API_KEY` | API key for Render deployments | Generate from the Render dashboard under Account Settings > API Keys |
| `JWT_SECRET_KEY` | Secret key for JWT token generation | Same value as your server's environment variable |
| `GITHUB_TOKEN` | GitHub access token | Automatically provided by GitHub Actions |

## Setting Up Render

1. Create a web service on Render
2. Connect it to your GitHub repository
3. Configure environment variables:
   - `NODE_ENV=production`
   - `JWT_SECRET_KEY` (same as in GitHub secrets)
   - MongoDB connection string
   - Any other required variables
4. Set up build and start commands

## Modifying the Workflow

If you need to customize the workflow:

- To change Node.js version: Update the `node-version` parameter
- To add more tests: Expand the testing step
- To deploy to a different environment: Duplicate the job with different conditions
- To add notifications: Add a step for Slack/Discord notifications

## Troubleshooting

If deployments fail, check:

1. GitHub Actions logs in the repository's Actions tab
2. Render deployment logs in the Render dashboard
3. Verify all secrets are correctly configured
4. Check if the Render service ID is valid
