import { file, serve, spawn } from "bun";

const server = serve({
  async fetch(req) {
    const { pathname } = new URL(req.url);

    switch (pathname) {
      case "/":
        return new Response(file("src/pages/index.html"));
      case "/shutdown":
        spawn(["systemctl", "poweroff"]);
        return new Response("<button type='button' disabled>Shutdown</button>");
      case "/restart":
        spawn(["systemctl", "reboot"]);
        return new Response("<button type='button' disabled>Restart</button>");
      case "/suspend":
        spawn(["systemctl", "suspend"]);
        return new Response("<button type='button' disabled>Suspend</button>");
      case "/command":
        spawn(["sh", "-c", new URLSearchParams(await req.text()).get("command")!]);
        return new Response("<i>done</i>");
      default:
        return new Response(file("src/styles" + pathname));
    }
  },
  error() {
    return new Response("Not Found", { status: 404 });
  },
  port: 11856,
});

console.log("Server ID:", server.id);
