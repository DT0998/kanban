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
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfileRequest:
 *       type: object
 *       required:
 *         - address
 *       properties:
 *         address:
 *           type: string
 */