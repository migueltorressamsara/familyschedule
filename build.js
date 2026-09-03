// Injects Supabase config from Vercel environment variables at build time
// so the real URL/key never live in the git repo.
const fs = require("fs");
const path = require("path");

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_KEY || "";

if (!url || !key) {
  console.warn(
    "SUPABASE_URL / SUPABASE_KEY not set — deploying with placeholders (page will run in local-only fallback mode)."
  );
}

const src = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const out = src
  .replace("__SUPABASE_URL__", url)
  .replace("__SUPABASE_KEY__", key);

fs.mkdirSync(path.join(__dirname, "public"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "public", "index.html"), out);
console.log("Built public/index.html");
