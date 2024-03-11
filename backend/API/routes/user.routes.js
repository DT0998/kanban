const { getUser } = require("../controllers/user.controller");
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
   * /api/Profile:
   *   get:
   *     security:
   *     - Authorization: []
   *     summary: Get User Profile
   *     tags: [User]
   *     responses:
   *       200:
   *         description: User Profile
   *       500:
   *         description: Some server error
   */
  app.get(`/${rootUrl}/Profile`, verifyToken, getUser);
}

module.exports = routes;
