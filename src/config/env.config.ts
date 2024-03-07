import * as process from "process";

export const EnvConfig = () => ({
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDatabase: process.env.DB_DATABASE,
    dbUsername: process.env.DB_DATABASE,
    dbPassword: process.env.DB_PASSWORD
});