//Es un script de prueba que verifica si TypeORM puede conectarse correctamente a Supabase y consultar información de PostgreSQL, sin necesidad de iniciar la aplicación Next.js.

import { AppDataSource } from "../src/lib/db/data-source";

async function main() {
  try {
    await AppDataSource.initialize();

    const result = await AppDataSource.query(`
      SELECT
        current_database() AS database,
        current_schema() AS schema,
        version() AS version
    `);

    console.log("Conexión exitosa con Supabase:");
    console.log(result[0]);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main().catch((error) => {
  console.error("Error al conectar:", error.message);
  process.exitCode = 1;
});