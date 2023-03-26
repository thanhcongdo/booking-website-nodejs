import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();
//swagger schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - city
 *         - address   
 *         - distance
 *         - title
 *         - desc  
 *         - cheapestPrice 
  *       properties:
 *         name:
 *           type: string
 *           deafault: Example Hotel
 *         type:
 *           type: string
 *           deafault: Example Hotel
 *         city:
 *           type: string
 *         address:
 *           type: string
 *         distance:
 *           type: integer
 *         title:
 *           type: string
 *         desc:
 *           type: string
 *         cheapestPrice:
 *           type: number 
 *        
 */

//CREATE
/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Tạo một khách sạn mới.
 *     description: Tạo một khách sạn mới với thông tin được cung cấp trong thân yêu cầu và trả về khách sạn được tạo thành công.
 *     tags:
 *       - Khách sạn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Khách sạn đã được tạo thành công và được trả về.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Dữ liệu yêu cầu không hợp lệ hoặc bị thiếu.
 *       500:
 *         description: Lỗi hệ thống.
 */


router.post('/', async (req, res) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});
//UPDATE
/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     summary: Cập nhật thông tin của một khách sạn.
 *     description: Cập nhật thông tin của khách sạn có ID được cung cấp trong URL với thông tin được cung cấp trong thân yêu cầu và trả về khách sạn đã được cập nhật thành công.
 *     tags:
 *       - Khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của khách sạn cần cập nhật thông tin.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Khách sạn đã được cập nhật thành công và được trả về.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Dữ liệu yêu cầu không hợp lệ hoặc bị thiếu.
 *       404:
 *         description: Không tìm thấy khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */



router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, { $set: req.body },
            { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
});
//DELETE

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     summary: Xoá một khách sạn.
 *     description: Xoá khách sạn có ID được cung cấp trong URL và trả về thông báo đã xoá thành công.
 *     tags:
 *       - Khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của khách sạn cần xoá.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Khách sạn đã được xoá thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Không tìm thấy khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */


router.delete("/:id", async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Khách sạn đã bị xoá!!");
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET
/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     summary: Lấy thông tin của một khách sạn.
 *     description: Trả về thông tin của khách sạn có ID được cung cấp trong URL.
 *     tags:
 *       - Khách sạn
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID của khách sạn cần lấy thông tin.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin của khách sạn đã được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Không tìm thấy khách sạn với ID đã cung cấp.
 *       500:
 *         description: Lỗi hệ thống.
 */


router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GETALL

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Lấy tất cả danh sách các khách sạn.
 *     description: Trả về danh sách tất cả các khách sạn.
 *     tags:
 *       - Khách sạn
 *     responses:
 *       200:
 *         description: Danh sách các khách sạn đã được trả về thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Lỗi hệ thống.
 */

router.get("/", async (req, res, next) => {

    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
});

export default router