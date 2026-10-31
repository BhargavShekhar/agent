import dns from "node:dns/promises";
import net from "node:net";
import "dotenv/config";

const { hostname, port } = new URL(process.env.DATABASE_URL);
const addrs = await dns.lookup(hostname, { all: true });

for (const { address, family } of addrs) {
  await new Promise((resolve) => {
    const t = performance.now();
    const s = net.connect({ host: address, port: Number(port) || 5432, timeout: 8000 });
    const ms = () => Math.round(performance.now() - t);
    s.on("connect", () => { console.log(`IPv${family} ${address} OK ${ms()}ms`); s.destroy(); resolve(); });
    s.on("timeout", () => { console.log(`IPv${family} ${address} TIMEOUT`); s.destroy(); resolve(); });
    s.on("error", (e) => { console.log(`IPv${family} ${address} ${e.code}`); resolve(); });
  });
}