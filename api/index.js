import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import swaggerJsdoc  from "swagger-jsdoc";
import swaggerUi  from "swagger-ui-express";
import basicAuth  from "express-basic-auth";


const app = express();
dotenv.config()
// connet database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB...");
    } catch (error) {
        throw (error);
    }
};

mongoose.connection.on('Connected', () => {
    console.log('Connected to MongoDB...')
})

mongoose.connection.on('Disconnected', () => {
    console.log('Disconnected from MongoDB!')
})
// swagger UI
const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Booking Website API with Swagger",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8800",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth:[],
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const swaggerSpecs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// middlewares
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Có gì đó sai sai.";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });

});
app.listen(8800, () => {
    connect()
    console.log("Connected to backend server")
})