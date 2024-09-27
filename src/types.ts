export type Task = {
    id: string,
    description: string,
    status: "Completed" | "Open" | "On-Hold",
}