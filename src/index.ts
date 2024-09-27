import { readFile, writeFile } from "node:fs";
import { serve } from "bun";
import { Tasks } from "./classes";

import type { Task } from "./types";

const FILE_PATH: string = "./tasks.json";

const tasks = new Tasks(FILE_PATH);

const apiHandler=  async (req: Request) => {
    const url: URL = new URL(req.url);
    const path: string = url.pathname;
    const method: string = req.method;

    // GET /api/tasks
    if (method === "GET" && path === "/api/tasks") {
        const allTasks = await tasks.loadAll();
        return new Response(JSON.stringify(allTasks), { status: 200, headers: { "Content-Type:": "application/json" } });
    }

    // POST /api/tasks
    if (method === "POST" && path === "/api/tasks") {
        const body = await req.json();
        const allTasks = await tasks.loadAll();
        const newTask: Task = { id: Date.now(), description: body.description, status: "Open" };
        allTasks.push(newTask);
        await tasks.save(allTasks);
        return new Response(JSON.stringify(newTask), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // PUT /api/tasks/:id
    if (method === "PUT" && path.startsWith("/api/tasks/")) {
        const id: number = parseInt(path.split("/").pop()!);
        const allTasks = await tasks.loadAll();
        const task = allTasks.find(task => task.id === id);
        if (task) {
            task.status = "Completed";
            await tasks.save(allTasks);
            return new Response(JSON.stringify(allTasks), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        return new Response(`Task "${id}" not found`, { status: 404 });
    }
}