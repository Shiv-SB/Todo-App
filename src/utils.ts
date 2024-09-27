import { parseArgs } from "util";

export function cliParser() {
    const { values, positionals} = parseArgs({
        args: Bun.argv,
        options: {
            env: {
                type: "string",
            },
        },
        strict: true,
        allowPositionals: true,
    });
    return values;
}