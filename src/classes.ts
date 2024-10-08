import { existsSync } from "node:fs";

import type { Task } from "./types";

export class Tasks {

    FILE_PATH: string = "";
    tasks: Task[] = [];

    constructor(filePath: string) {
        this.FILE_PATH = filePath;
        this.#ensureFileExists();
        this.#updateTaskProp();
    }

    #ensureFileExists(): void {
        if (!existsSync(this.FILE_PATH)) {
            console.log(`"${this.FILE_PATH}" does not exist, creating new file...`);
            Bun.write(this.FILE_PATH, "[]");
        } else {
            console.log(`"${this.FILE_PATH}" found!`);
        }
    }

    async #updateTaskProp() {
        this.tasks = await this.loadAll();
    }

    async loadAll(): Promise<Task[]> {
        const data = Bun.file(this.FILE_PATH);
        const tasks = await data.json() as Task[];
        this.tasks = tasks
        return tasks;
    }

    async save(tasks: Task[]): Promise<void> {
        try {
            this.tasks = tasks;
            const data = JSON.stringify(tasks, null, 4);
            await Bun.write(this.FILE_PATH, data);
        } catch (error) {
            console.error("Error saving tasks:", error);
        }
    }

    async total(): Promise<number> {
        const allTasks = await this.loadAll();
        return allTasks.length;
    }

}