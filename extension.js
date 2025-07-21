const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extractEnvVars",
    async function () {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No folder open.");
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const envVars = new Set();

      async function readFiles(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            const skipDirs = [
              "node_modules",
              "dist",
              "build",
              ".vscode",
              ".git",
            ];
            if (skipDirs.includes(file)) {
              continue; // skip these folders
            }
            await readFiles(fullPath);
          } else if (file.endsWith(".js") || file.endsWith(".ts")) {
            const content = fs.readFileSync(fullPath, "utf-8");
            // const matches = [...content.matchAll(/process\.env\.([A-Z0-9_]+)/g)];
            // matches.forEach(match => envVars.add(match[1]));

            const allMatches = [
              ...content.matchAll(/process\.env\.([a-zA-Z0-9_]+)/g), // Node.js & Next.js
              ...content.matchAll(/import\.meta\.env\.([a-zA-Z0-9_]+)/g), // Vite & SvelteKit
            ];

            allMatches.forEach((match) => envVars.add(match[1]));
          }
        }
      }

      await readFiles(rootPath);

      const envText = Array.from(envVars)
        .map((v) => `${v}=`)
        .join("\n");
      const envFile = path.join(rootPath, ".env-HMK_CodeWeb");

      fs.writeFileSync(envFile, envText);

      vscode.window.showInformationMessage(
        `.env file created with ${envVars.size} variables.`
      );
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
