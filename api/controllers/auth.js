import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"
export const register = async (req, res, next) => {
    try {
        // mã hoá passwords
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("Tạo thành công user.")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "Không tìm tháy user này."))

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password)
        if (!isPasswordCorrect) return next(createError(400, "Sai tên đăng nhập hoặc mật khẩu."))

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;

        res
        .
        cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ ...otherDetails, isAdmin, token })
    } catch (err) {
        next(err)
    }
}