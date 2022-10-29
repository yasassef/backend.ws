import { Router } from "express";
import piuRouter from "./pius.routes";
import userRouter from "./user.routes"

const routes = Router();

routes.use('/users', userRouter);
routes.use('/pius', piuRouter);

export default routes;