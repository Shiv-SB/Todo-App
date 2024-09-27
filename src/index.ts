import { readFile, writeFile } from "node:fs";
import { existsSync } from "node:fs";
import { serve } from "bun";

const FILE_PATH: string = "./tasks.json";