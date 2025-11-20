const http = require("http");

const PORT = process.env.SMOKE_PORT || 8085; // port hôte que tu vas mapper

const options = {
  host: "localhost",
  port: PORT,
  timeout: 2000,
};

console.log("Running smoke test on port:", PORT);

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log("Smoke test OK");
    process.exit(0);
  } else {
    console.log("Smoke test FAILED, status:", res.statusCode);
    process.exit(1);
  }
});

req.on("error", () => {
  console.log("Smoke test FAILED: cannot reach server");
  process.exit(1);
});

req.end();
