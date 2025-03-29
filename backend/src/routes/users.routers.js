import { Router } from "express";
import {addHistory, login , register, getUserHistory} from "../controllers/user.controller.js";



const router= Router();

router.route('/login').post(login)
router.route('/register').post(register)
router.route("/add_to_activity").post(addHistory)
router.route('/get_all_activity').get(getUserHistory)

export default router;