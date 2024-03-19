const {
  getHistoryPremium,
  subscribeMonthlyPremium,
} = require("../controllers/premium.controller");
const verifyToken = require("../middleware/auth");

// User routes
function routes(app, rootUrl) {
  /**
   * @swagger
   * tags:
   *   name: Premium
   *   description: Premium APIs
   */

  /**
   * @swagger
   * /api/subscribe-premium:
   *   post:
   *     security:
   *     - Authorization: []
   *     summary: Subscribe premium
   *     tags: [Premium]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PremiumRequest'
   *     responses:
   *       200:
   *         description: Get user profile successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PremiumReponse'
   *       404:
   *         description: Premium cant buy
   *       500:
   *         description: Internal Server Error
   */
  app.post(`/${rootUrl}/subscribe-premium`, verifyToken, subscribeMonthlyPremium);

  /**
   * @swagger
   * /api/history/{address}:
   *   get:
   *     security:
   *     - Authorization: []
   *     summary: Get history premium
   *     tags: [Premium]
   *     parameters:
   *       - in: path
   *         name: address
   *         schema:
   *           type: string
   *         required: true
   *         description: Address of the user
   *     responses:
   *       200:
   *         description: Get history premium successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/History'
   *       404:
   *         description: History not found
   *       500:
   *         description: Internal Server Error
   */
  app.get(`/${rootUrl}/history/:address`, verifyToken, getHistoryPremium);
}

module.exports = routes;
