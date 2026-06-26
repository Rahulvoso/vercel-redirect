const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

/**
 * Home Route
 */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Redirect API 🚀"
    });
});

/**
 * Health Check
 */
app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

/**
 * Test Route
 */
app.get("/hello", (req, res) => {
    res.json({
        message: "Hello Rahul"
    });
});

/**
 * Redirect Route
 */
app.get("/r/:code", async (req, res) => {

    try {

        const { code } = req.params;

        /**
         * Dummy redirect
         */
        if (code === "google") {
            return res.redirect("https://google.com");
        }

        /**
         * Call your backend API
         */

        const response = await axios.get(
            `https://your-api.com/get-url/${code}`
        );

        if (!response.data.success) {

            return res.status(404).json({
                success: false,
                message: "URL Not Found"
            });

        }

        return res.redirect(response.data.url);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

});

module.exports = app;