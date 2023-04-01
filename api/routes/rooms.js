import express from "express";
import {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
// swagger chemas for rooms
/**
 * @swagger
 * components:
*   schemas:
*     Room:
*       type: object
*       required:
*         - title
*         - price
*         - maxPeople
*         - desc
*         - roomNumbers
*       properties:
*         title:
*           type: string
*           description: The title of the room.
*         price:
*           type: number
*           description: The price of the room per night.
*         maxPeople:
*           type: integer
*           description: The maximum number of people allowed in the room.
*         desc:
*           type: string
*           description: A description of the room.
*         roomNumbers:
*           type: array
*           description: An array of room numbers and their unavailable dates.
*           items:
*             type: object
*             properties:
*               number:
*                 type: integer
*                 description: The room number.
*               unavailableDates:
*                 type: array
*                 description: An array of unavailable dates for the room.
*                 items:
*                   type: string
*                   format: date
*       example:
*         title: Deluxe Room
*         price: 150
*         maxPeople: 2
*         desc: This room is perfect for couples looking for a romantic getaway.
*         roomNumbers:
*           - number: 101
*             unavailableDates: ['2023-04-01', '2023-04-02']
*           - number: 102
*             unavailableDates: []

 */

//CREATE

/**
 * @swagger
 * /api/rooms/{hotelid}:
 *   post:
 *     summary: Tạo một Phòng khách sạn mới.
 *     description: Tạo một Phòng khách sạn mới với thông tin được cung cấp trong thân yêu cầu và trả về Phòng khách sạn được tạo thành công.
 *     tags:
 *       - Phòng khách sạn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Phòng khách sạn đã được tạo thành công và được trả về.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Dữ liệu yêu cầu không hợp lệ hoặc bị thiếu.
 *       500:
 *         description: Lỗi hệ thống.
 */
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Cập nhật thông tin của một Phòng khách sạn.
 *     description: Cập nhật thông tin của Phòng khách sạn có ID được cung cấp trong URL với thông tin được cung cấp trong thân yêu cầu và trả về Phòng khách sạn đã được cập nhật thành công.
 *     tags:
 *       - Phòng khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của Phòng khách sạn cần cập nhật thông tin.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Phòng khách sạn đã được cập nhật thành công và được trả về.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Dữ liệu yêu cầu không hợp lệ hoặc bị thiếu.
 *       404:
 *         description: Không tìm thấy Phòng khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */


router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE

/**
 * @swagger
 * /api/rooms/{id}/{hotelid}:
 *   delete:
 *     summary: Xoá một Phòng khách sạn.
 *     description: Xoá Phòng khách sạn có ID được cung cấp trong URL và trả về thông báo đã xoá thành công.
 *     tags:
 *       - Phòng khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của Phòng khách sạn cần xoá.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Phòng khách sạn đã được xoá thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Không tìm thấy Phòng khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Lấy thông tin của một Phòng khách sạn.
 *     description: Trả về thông tin của Phòng khách sạn có ID được cung cấp trong URL.
 *     tags:
 *       - Phòng khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của Phòng khách sạn cần lấy thông tin.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin của Phòng khách sạn đã được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Không tìm thấy Phòng khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */
router.get("/:id", getRoom);
//GET ALL
/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Lấy tất cả danh sách các Phòng khách sạn.
 *     description: Trả về danh sách tất cả các Phòng khách sạn.
 *     tags:
 *       - Phòng khách sạn
 *     responses:
 *       200:
 *         description: Danh sách các Phòng khách sạn đã được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Lỗi hệ thống.
 */

router.get("/", getRooms);

export default router;
