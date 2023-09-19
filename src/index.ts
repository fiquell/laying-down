import { file, serve, spawn } from "bun"

const server = serve({
    fetch(req: Request) {
        const baseURL = "public" + new URL(req.url).pathname
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

        if (url.pathname === "/suspend") {
            spawn(["systemctl", "suspend"])
            return new Response(
                `<button type="button" disabled>Suspend</button>`
            )
        }

        return new Response(file(baseURL))
    },
    error() {
        return new Response("404!", { status: 404 })
    },
    port: 11856
})

console.log("laying-down listening on port:", server.port)
