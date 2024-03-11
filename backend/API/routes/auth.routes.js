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
   * /api/Login:
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
  app.post(`/${rootUrl}/Login`, login);

  /**
   * @swagger
   * /api/Token:
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
  app.post(`/${rootUrl}/Token`, refreshToken);
}

module.exports = routes;
