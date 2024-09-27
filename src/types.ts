export type Task = {
    id: number,
    description: string,
    status: "Completed" | "Open" | "On-Hold",
}