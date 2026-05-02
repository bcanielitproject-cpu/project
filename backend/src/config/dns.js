import dns from "node:dns";

export function configureDns() {
  const servers = (process.env.DNS_SERVERS || "1.1.1.1,8.8.8.8")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  dns.setServers(servers);
  dns.setDefaultResultOrder("ipv4first");
  console.log(`DNS servers: ${servers.join(", ")}`);
}
