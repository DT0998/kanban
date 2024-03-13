const { getUserProfile } = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth");

// User routes
function routes(app, rootUrl) {
  /**
   * @swagger
   * tags:
   *   name: User
   *   description: User management APIs
   */

  /**
   * @swagger
   * /api/profile/{address}:
   *   get:
   *     security:
   *     - Authorization: []
   *     summary: Get user profile
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: address
   *         schema:
   *           type: string
   *         required: true
   *         description: Address of the user
   *     responses:
   *       200:
   *         description: Get user profile successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'  
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  app.get(`/${rootUrl}/profile/:address`, verifyToken, getUserProfile);
}

module.exports = routes;
