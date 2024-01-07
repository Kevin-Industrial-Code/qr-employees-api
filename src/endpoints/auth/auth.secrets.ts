import { config } from "dotenv";
config()

export const { JWT_SECRET, JWT_DURATION }  = process.env;