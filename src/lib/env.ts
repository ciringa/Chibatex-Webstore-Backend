import "dotenv/config"
import { z } from "zod"

export const {PORT,salt} = z.object({
    PORT:z.string(),
    salt:z.string()
}).parse(process.env)