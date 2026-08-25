import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const projectRoot = import.meta.dirname;
const logDirectory = path.join(projectRoot, ".manus-logs");
const maximumLogBytes = 1024 * 1024;

function writeBrowserLogs(source, entries) {
  if (!entries?.length) return;
  fs.mkdirSync(logDirectory, { recursive: true });
  const logPath = path.join(logDirectory, `${source}.log`);
  const content = entries.map((entry) => `[${new Date().toISOString()}] ${JSON.stringify(entry)}`).join("\n") + "\n";
  fs.appendFileSync(logPath, content, "utf-8");
  if (fs.statSync(logPath).size > maximumLogBytes) {
    const trimmed = fs.readFileSync(logPath, "utf-8").slice(-Math.floor(maximumLogBytes * 0.6));
    fs.writeFileSync(logPath, trimmed, "utf-8");
  }
}

function debugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") return html;
      return { html, tags: [{ tag: "script", attrs: { src: "/__manus__/debug-collector.js", defer: true }, injectTo: "head" }] };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (request, response, next) => {
        if (request.method !== "POST") return next();
        let body = "";
        request.on("data", (chunk) => { body += chunk.toString(); });
        request.on("end", () => {
          try {
            const payload = JSON.parse(body);
            writeBrowserLogs("browserConsole", payload.consoleLogs);
            writeBrowserLogs("networkRequests", payload.networkRequests);
            writeBrowserLogs("sessionReplay", payload.sessionEvents);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ success: true }));
          } catch {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ success: false }));
          }
        });
      });
    },
  };
}

function storageProxy() {
  return {
    name: "manus-storage-proxy",
    configureServer(server) {
      server.middlewares.use("/manus-storage", async (request, response) => {
        const key = request.url?.replace(/^\//, "");
        const baseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const apiKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!key || !baseUrl || !apiKey) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Storage proxy not configured");
          return;
        }
        try {
          const target = new URL("v1/storage/presign/get", `${baseUrl}/`);
          target.searchParams.set("path", key);
          const result = await fetch(target, { headers: { Authorization: `Bearer ${apiKey}` } });
          const { url } = await result.json();
          if (!result.ok || !url) throw new Error("Storage backend error");
          response.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          response.end();
        } catch {
          response.writeHead(502, { "Content-Type": "text/plain" });
          response.end("Storage backend error");
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [vitePluginManusRuntime(), debugCollector(), storageProxy()],
  envDir: projectRoot,
  root: path.join(projectRoot, "client"),
  build: { outDir: path.join(projectRoot, "dist/public"), emptyOutDir: true },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [".manuspre.computer", ".manus.computer", ".manus-asia.computer", ".manuscomputer.ai", "localhost", "127.0.0.1"],
  },
});
