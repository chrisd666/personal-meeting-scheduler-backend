import { Application } from "express";

export abstract class CommonRoutesConfig {
  constructor(public app: Application, private name: string) {
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): Application;
}
