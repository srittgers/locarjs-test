This app allows the user to set pins and then see a floating red pin with a label. (It uses local storage to save the pins.)

It uses locar.js, which works on iPhones too (not using WebXR).

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   This uses Vite for local development.

## Build

To build the app for production:

```bash
npm run build
```

The output will be in the `dist` folder.

## Deploy to GitHub Pages

Deployment is automated using GitHub Actions:

- Push your changes to the `main` branch.
- The workflow in `.github/workflows/deploy.yml` will build and deploy the site to GitHub Pages automatically.

No manual deployment steps are needed.
