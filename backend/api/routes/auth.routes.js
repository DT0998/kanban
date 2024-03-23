const { login, refreshToken } = require("../controllers/auth.controller");

// User routes
function routes(app, rootUrl) {
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Auth APIs
   */

  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Login with wallet
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Login'
   *     responses:
   *       200:
   *         description: Login successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Auth'
   *       500:
   *         description: Some server error
   */
  app.post(`/${rootUrl}/login`, login);

  /**
   * @swagger
   * /api/token:
   *   post:
   *     summary: Refresh token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequest'
   *     responses:
   *       200:
   *         description: Get new access token successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshTokenResponse'
   *       500:
   *         description: Some server error
   */
  app.post(`/${rootUrl}/token`, refreshToken);
}

module.exports = routes;
