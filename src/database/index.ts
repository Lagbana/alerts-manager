import { DataSource } from "typeorm";
import { databaseConfig } from "../config";
import { seedDatabase } from "./seeds";

const dataSource = new DataSource(databaseConfig);

export { dataSource, seedDatabase };
