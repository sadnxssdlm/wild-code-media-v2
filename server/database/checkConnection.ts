import databaseClient from "./client";

async function checkDatabaseConnection() {
  try {
    await databaseClient.query("SELECT 1");
    console.info(`Using database ${process.env.DB_NAME}`);
  } catch (error) {
    if (error instanceof Error) {
      console.warn(
        "Warning: Failed to establish a database connection.",
        "Please ensure your database is running and your .env file is configured correctly.",
      );
      console.warn(error.message);
    }
  }
}

export default checkDatabaseConnection;
