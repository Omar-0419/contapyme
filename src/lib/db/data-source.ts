//Configura la conexión entre TypeORM y la base de datos PostgreSQL de Supabase. También define cómo se gestionarán las entidades y migraciones, evitando que TypeORM modifique automáticamente la estructura de la base de datos.



import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

import { Tenant } from "../../entities/Tenant";
import { User } from "../../entities/User";
import { Membership } from "../../entities/Membership";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Falta DATABASE_URL en el archivo .env");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  entities: [Tenant, User, Membership],
  migrations: ["src/lib/db/migrations/*.ts"],
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  migrationsTableName: "typeorm_migrations",
});
