import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký một tài khoản mới.
 *     description: Đăng ký tài khoản mới với thông tin người dùng và mã hóa mật khẩu sử dụng bcrypt.
 *     tags:
 *       - Tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên đăng nhập của người dùng.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Địa chỉ email của người dùng.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu của người dùng.
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Tạo tài khoản mới thành công.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Thông báo thành công.
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ hoặc tài khoản đã tồn tại.
 *       500:
 *         description: Lỗi hệ thống.
 */

router.post("/register", register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập vào tài khoản hiện có.
 *     description: Đăng nhập vào tài khoản hiện có bằng cách xác minh tên đăng nhập và mật khẩu và trả về một token truy cập cho các yêu cầu xác thực.
 *     tags:
 *       - Tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên đăng nhập của người dùng.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu của người dùng.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về thông tin người dùng và token truy cập.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID của người dùng.
 *                 username:
 *                   type: string
 *                   description: Tên đăng nhập của người dùng.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Địa chỉ email của người dùng.
 *               required:
 *                 - _id
 *                 - username
 *                 - email
 *       400:
 *         description: Sai tên đăng nhập hoặc mật khẩu.
 *       404:
 *         description: Không tìm thấy người dùng với tên đăng nhập đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */

router.post("/login", login)

export default router