import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
} from "../controllers/user.js";
import {
    verifyAdmin,
    verifyToken,
    verifyUser
} from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })
/**
 * @swagger
 *  components:
*   schemas:
*     User:
*       type: object
*       required:
*         - username
*         - email
*         - password
*       properties:
*         username:
*           type: string
*           description: The username of the user.
*           uniqueItems: true
*         email:
*           type: string
*           description: The email of the user.
*           format: email
*           uniqueItems: true
*         country:
*           type: string
*           description: The country of the user.
*         img:
*           type: string
*           description: The image URL of the user.
*         city:
*           type: string
*           description: The city of the user.
*         phone:
*           type: string
*           description: The phone number of the user.
*         password:
*           type: string
*           description: The password of the user.
*           format: password
*         isAdmin:
*           type: boolean
*           description: The user's admin status.
*           default: false
*       example:
*         username: johndoe
*         email: johndoe@example.com
*         country: USA
*         img: https://example.com/johndoe.jpg
*         city: New York
*         phone: +1-555-1234567
*         password: P@ssw0rd!
*         isAdmin: false

 */


//UPDATE

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin của một người dùng.
 *     description: Sửa đổi thông tin của một người dùng với ID chỉ định.
 *     tags:
 *       - Người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần sửa đổi.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Thông tin mới của người dùng.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Thông tin người dùng đã được cập nhật thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng với ID chỉ định.
 *       500:
 *         description: Lỗi hệ thống.
 */

router.put("/:id", verifyUser, updateUser);

//DELETE

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xoá một người dùng.
 *     description: Xoá một người dùng với ID chỉ định.
 *     tags:
 *       - Người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần xoá.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Người dùng đã được xoá thành công.
 *       404:
 *         description: Không tìm thấy người dùng với ID chỉ định.
 *       500:
 *         description: Lỗi hệ thống.
 */

router.delete("/:id", verifyUser, deleteUser);

//GET

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin một người dùng.
 *     description: Lấy thông tin một người dùng với ID chỉ định.
 *     tags:
 *       - Người dùng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của người dùng cần lấy thông tin.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin của người dùng được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Không tìm thấy người dùng với ID chỉ định.
 *       500:
 *         description: Lỗi hệ thống.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get("/:id", verifyUser, getUser);

//GET ALL
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy tất cả danh sách các người dùng.
 *     description: Trả về danh sách tất cả các người dùng.
 *     tags:
 *       - Người dùng
 *     responses:
 *       200:
 *         description: Danh sách các người dùng đã được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Lỗi hệ thống.
 */


router.get("/", verifyAdmin, getAllUsers);

export default router;
