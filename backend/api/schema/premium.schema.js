/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - id
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PremiumReponse:
 *       type: object
 *       required:
 *         - premium
 *       properties:
 *         premium:
 *           type: boolean
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     PremiumRequest:
 *       type: object
 *       required:
 *         - address
 *         - name
 *       properties:
 *         address:
 *           type: string
 *         name:
 *           type: string
 */
