const express = require("express");
const Api = require("../controller/api");
const { auth, checkBlacklist } = require("../middleware/authMiddleware");

const app = express.Router();

/**
 * @swagger
 * /api/retrieve:
 *   get:
 *     summary: Retrieve API list matching specified category
 *     description: |
 *       Retrieves a list of APIs matching the specified category.
 *       This is a protected route requiring a valid Bearer token in the Authorization header.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         description: Category key to filter APIs
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Animals, Anime]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of APIs matching the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the API
 *                   name:
 *                     type: string
 *                     description: Name of the API
 *                   description:
 *                     type: string
 *                     description: Description of the API
 *                   category:
 *                     type: string
 *                     description: Category of the API
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - Token provided does not have access to this resource
 *       '500':
 *         description: Internal Server Error - Failed to retrieve API list
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

app.get("/retrieve", auth, checkBlacklist, Api.retrive);

module.exports = app;
