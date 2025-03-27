# PropFolio CI/CD Setup Guide

Hey guys, below are the steps I completed for the GitHub Actions to automate our deployment to Render.

- Created the GitHub Actions workflow file (`.github/workflows/deploy.yml`)
- Set up the workflow to build and deploy our app to Render
- Added documentation for the CI/CD process

## What We Need to Do Next 

### 1. Set Up GitHub Secrets (Alejandro)

Since you created the GitHub repo, please add this secret in the GitHub repository:

1. Go to our repo on GitHub
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret" and add:

| Secret Name | Value to Add | Where to Get It |
|-------------|--------------|-----------------|
| `JWT_SECRET_KEY` | Our JWT secret | Use the same value as in our server's `.env` file |

Note: We're now using a direct deploy hook URL for Render deployments, so the RENDER_SERVICE_ID and RENDER_API_KEY secrets are no longer needed.

### 2. Set Up Render Service (Justin)

1. Create a web service on Render if not already done
2. Connect it to our GitHub repository
3. Set the build command to: `npm install && npm run build`
4. Set the start command to: `npm start`
5. Add these environment variables in Render:
   - `NODE_ENV=production`
   - `JWT_SECRET_KEY` (same as above)
   - `MONGODB_URI` (our database connection string)

Note: We've already configured a deploy hook URL in our GitHub Actions workflow, so your Render service is ready to receive deploy triggers.

### 3. Testing the Deployment

After the above steps are complete:
1. Push any small change to the `main` branch
2. Go to the "Actions" tab in our GitHub repo
3. You should see the workflow running
4. If successful, our app will be deployed to Render automatically!

### 4. Troubleshooting

If something doesn't work:
1. Check the GitHub Actions logs (in the "Actions" tab)
2. Verify all secrets are added correctly in GitHub
3. Check the Render logs for any deployment errors
4. Make sure our build script works locally (`npm run build`)

## How It Works

This setup does the following:
1. When we push to `main` branch, GitHub Actions automatically starts
2. It builds our app to make sure everything compiles correctly
3. If the build succeeds, it triggers a deployment to Render
4. Our latest code is now live on Render!

We can also manually trigger a deployment anytime from the "Actions" tab by clicking on the "Deploy to Render" workflow and selecting "Run workflow".

Let me know if you have any questions or run into any issues!
