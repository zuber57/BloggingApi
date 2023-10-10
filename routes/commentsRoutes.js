import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { createcomment, deletecomment, getAllcomments, updatecomment } from "../controllers/commentsController.js";
// import { createcomment, deletecomment, getAllcomments, updatecomment } from "../controllers/commentController.js";

const router =  express.Router()

router.route("/create-comment").post(isAuthenticated , isAdmin , createcomment)
router.route("/update-comment").put(isAuthenticated , isAdmin , updatecomment)
router.route("/get-comments").get(  getAllcomments )
router.route("/delete-comment/:name").delete(isAuthenticated , isAdmin , deletecomment)

export default router