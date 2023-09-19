import { file, serve, spawn } from "bun"

const server = serve({
    fetch(req: Request) {
        const url = new URL(req.url)

        if (url.pathname === "/") {
            return new Response(file("public/index.html"))
        }

        if (url.pathname === "/power-off") {
            spawn(["systemctl", "poweroff"])
            return new Response(
                `<button type="button" disabled>Power Off</button>`
            )
        }

        if (url.pathname === "/sleep") {
            spawn(["systemctl", "suspend"])
            return new Response(`<button type="button" disabled>Sleep</button>`)
        }

        return new Response("404!", { status: 404 })
    },
    port: 11856
})

console.log("laying-down listening on port:", server.port)
