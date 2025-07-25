import "dotenv/config";
import checkDatabaseConnection from "../database/checkConnection";
import app from "./app";

const port = process.env.APP_PORT;

async function startServer() {
  await checkDatabaseConnection();

  app
    .listen(port, () => {
      console.info(`Server is listening on port ${port}`);
    })
    .on("error", (err: Error) => {
      console.error("Error:", err.message);
    });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
