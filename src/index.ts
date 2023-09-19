import { file, serve, spawn } from "bun"

const server = serve({
    fetch(req: Request) {
        const path = new URL(req.url).pathname

        if (path === "/") {
            return new Response(file("public/index.html"))
        }

        if (path === "/power-off") {
            spawn(["systemctl", "poweroff"])
            return new Response(
                `<button type="button" disabled>Power Off</button>`
            )
        }

        if (path === "/suspend") {
            spawn(["systemctl", "suspend"])
            return new Response(
                `<button type="button" disabled>Suspend</button>`
            )
        }

        return new Response(file("public" + path))
    },
    error() {
        return new Response("404!", { status: 404 })
    },
    port: 11856
})

console.log("laying-down listening on port:", server.port)
