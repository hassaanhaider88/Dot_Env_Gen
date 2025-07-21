# 🌱 Dot Env Gen

**Dot Env Gen** is a lightweight VS Code extension that automatically scans your JavaScript/TypeScript codebase and extracts all `process.env` and `import.meta.env` which are written like this  `process.env.VARIABLE` and `import.meta.env.VARIABLE` usages to generate a ready-to-use `.env` file.

---

## Live Demo 
![Watch the video](https://ik.imagekit.io/hassaan/Dot_Env_Gen_By_Hassaan_Haider_Iyp69txQd)

## ✨ Features

- 🔍 Scans all `.js` and `.ts` files in your workspace
- ⚡ Generates a `.env` file with all detected environment variable keys
- 🧠 Smartly ignores `node_modules`, `build`, and other common folders
- 💼 Perfect for cloning GitHub projects and setting up local environments
- 🪄 One-click command: **Extract ENV Variables**

---

## 📦 Use Case

Ever cloned a project from GitHub and had to guess which `.env` variables are needed?

**Dot Env Gen** solves that in one click — just run the command and get a `.env` file with all the required keys extracted from `process.env` statements.

---

## 🚀 How to Use

1. Open your project folder in VS Code
2. Press `Ctrl + Shift + P` to open Command Palette
3. Run: **Extract ENV Variables**
4. 🎉 `.env` file is created in your project root!

---

## 📁 Output Example

```env
PORT=

