const http = require("http");

const PORT = process.env.SMOKE_PORT ? parseInt(process.env.SMOKE_PORT, 10) : 8085;
const opts = { hostname: "127.0.0.1", port: PORT, path: "/", timeout: 5000 };

console.log("Running smoke test on port", PORT);

const req = http.get(opts, (res) => {
  const ok = res.statusCode >= 200 && res.statusCode < 400;
  if (ok) {
    console.log("Smoke test OK, status", res.statusCode);
    process.exit(0);
  } else {
    console.error("Smoke test FAILED, status", res.statusCode);
    process.exit(1);
  }
});

req.on("error", (err) => {
  console.error("Smoke test FAILED, error:", err.message || err);
  process.exit(1);
});