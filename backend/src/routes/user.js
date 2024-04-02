const express = require("express");
const User = require("../controller/user");
const { auth } = require("../middleware/authMiddleware");

const app = express.Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                     name:
 *                       type: string
 *                       description: User's name
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       '400':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
app.post("/login", User.login);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register user
 *     description: Registers a new user with the provided name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP status code (201)
 *                 msg:
 *                   type: string
 *                   description: Message indicating successful registration
 *       '409':
 *         description: User already registered
 *       '500':
 *         description: Internal Server Error
 */
app.post("/register", User.register);

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout user
 *     description: Logs out the user by blacklisting the provided token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Token invalidated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful token invalidation
 *       '400':
 *         description: No token provided
 *       '500':
 *         description: Internal Server Error
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
app.get("/logout", auth, User.logout);

module.exports = app;
