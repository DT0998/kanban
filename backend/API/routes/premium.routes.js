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
   * /api/pay-premium/{address}:
   *   post:
   *     security:
   *     - Authorization: []
   *     summary: Buy premium
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
   *         description: Get user profile successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Premium'
   *       404:
   *         description: Premium cant buy
   *       500:
   *         description: Internal Server Error
   */
  app.get(`/${rootUrl}/pay-premium/:address`, verifyToken);

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
  app.get(`/${rootUrl}/history/:address`, verifyToken);
}

module.exports = routes;
