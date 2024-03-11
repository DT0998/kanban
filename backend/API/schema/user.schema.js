/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - dateAdded
 *         - premium
 *         - refreshToken
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         dateAdded:
 *           type: string
 *           format: date
 *         premium:
 *           type: boolean
 *         refreshToken:
 *           type: string
 */
