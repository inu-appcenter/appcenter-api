import {Router} from "express";
import controller from "../../features/auth/controller";

const authRouter = Router();

authRouter.route('/login')
    .post(controller.login);

authRouter.route('/session')
    .get(controller.getSessionInfo);

export default authRouter;
