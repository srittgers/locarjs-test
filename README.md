# Simple HTML/CSS/JS Dev Container Template

This is a basic template for creating simple static web projects (like WebXR client-side apps) using a Dev Container. It provides a consistent development environment in GitHub Codespaces or locally using VS Code and Docker.

## Features

*   Simple `index.html`, `style.css`, `script.js` structure.
*   Pre-configured Dev Container (`.devcontainer/devcontainer.json`).
*   Includes Node.js environment (useful for future tooling).
*   Includes VS Code extensions:
    *   **Live Server:** For easy local previewing.
    *   **Prettier:** For code formatting.
*   Auto-forwards port 5500 for Live Server preview.

## How to Use

**1. Use as a GitHub Template:**
   Click the "Use this template" button on the GitHub repository page to create your own repository based on this structure.

**2. Open in Codespaces:**
   *   Navigate to your newly created repository on GitHub.
   *   Click the `<> Code` button.
   *   Go to the "Codespaces" tab.
   *   Click "Create codespace on main". GitHub will build and launch the Dev Container.

**3. Open Locally with VS Code & Docker:**
   *   Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
   *   Ensure you have the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in VS Code.
   *   Clone your repository locally: `git clone <your-repo-url>`
   *   Open the cloned folder in VS Code (`code .`).
   *   VS Code should detect the `.devcontainer` folder and prompt you with a notification: "Folder contains a Dev Container configuration file. Reopen in Container?". Click "Reopen in Container". VS Code will build the container image (first time might take a few minutes) and connect to it.

**4. Start Live Preview:**
   *   Once the container is running (either in Codespaces or locally), open the `index.html` file in VS Code.
   *   Right-click within the `index.html` editor.
   *   Select "Open with Live Server".
   *   A new browser tab should open automatically (or you'll see a notification with the URL) displaying your `index.html`, usually at `http://127.0.0.1:5500`. The port forwarding configured in `devcontainer.json` makes this accessible from your local browser even though the server runs inside the container.
   *   Any changes you save to your HTML, CSS, or JS files should automatically refresh the preview page.

**5. Start Developing!**
   Modify `index.html`, `style.css`, and `script.js` to build your web application or WebXR experience. Remember that for WebXR, you'll need to access the preview URL over **HTTPS**.
   *   **Codespaces:** The forwarded port is automatically available via an HTTPS URL provided by GitHub. Look for it in the "Ports" tab in VS Code.
   *   **Local Docker:** Live Server doesn't provide HTTPS by default. For local WebXR testing requiring HTTPS, you might need more advanced setups like creating self-signed certificates or using a proxy like `mkcert` or `ngrok`.

Happy coding!
