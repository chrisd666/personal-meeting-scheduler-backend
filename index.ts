import express from "express";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { MeetingRoutes } from "./meeting/meeting.routes.config";

const app = express();
const port = process.env.PORT || 3000;
const routes: CommonRoutesConfig[] = [];

app.use(express.json());
app.use(cors());

routes.push(new MeetingRoutes(app));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the meeting scheduler server");
});

app.listen(port, () => {
  routes.forEach((route) => {
    console.log(`Routes configured for ${route.getName()}`);
  });

  console.log(`Server running on port ${port}`);
});
