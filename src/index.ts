import express from "express";
import cors from "cors";
import { env } from "./configs/env.js";
import { connectDB } from "./configs/db.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { projectPublicRouter } from "./modules/project/routes/project.public.routes.js";
import { projectPrivateRouter } from "./modules/project/routes/project.private.routes.js";
import { profilePublicRouter } from "./modules/profile/routes/profile.public.routes.js";
import { profilePrivateRouter } from "./modules/profile/routes/profile.private.routes.js";
import { errorHandler } from "./common/errors/errorHandler.js";
import { requireAuth } from "./common/middleware/requireAuth.js";

async function init() {
  await connectDB();
  const app = express();

  app.use(cors({
    origin: ["http://localhost:4200", "http://localhost:4201"],
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.static("public"));

  app.use("/api/v1/auth", authRouter);

  app.use("/api/v1/public/projects", projectPublicRouter);
  app.use("/api/v1/public/profile", profilePublicRouter);

  app.use("/api/v1/private", requireAuth);
  app.use("/api/v1/private/projects", projectPrivateRouter);
  app.use("/api/v1/private/profile", profilePrivateRouter);

  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
  });
}

init();
