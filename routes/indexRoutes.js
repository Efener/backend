const express = require('express');
const router = express.Router();
const JWTmiddleware = require('../middlewares/auth');
const authController = require('../controllers/authController');

const billingController = require('../controllers/billingController');


/**
 * @swagger
 * /addUsage:
 *   post:
 *     summary: Kullanıcının kullanım verisini ekler
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriberNo:
 *                 type: string
 *               month:
 *                 type: number
 *               phoneUsageMinutes:
 *                 type: number
 *               internetUsageGB:
 *                 type: number
 *     responses:
 *       201:
 *         description: Kullanım eklendi ve fatura oluşturuldu
 */

/**
 * @swagger
 * /calculateBill:
 *   post:
 *     summary: Faturayı hesaplar
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriberNo:
 *                 type: string
 *               month:
 *                 type: number
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Fatura başarıyla hesaplandı
 */

/**
 * @swagger
 * /queryBill:
 *   get:
 *     summary: Fatura detaylarını gösterir
 *     tags: [Billing]
 *     parameters:
 *       - in: query
 *         name: subscriberNo
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         schema:
 *           type: number
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: BillTotal, BillPaid
 */



/**
 * @swagger
 * /queryBillDetailed:
 *   get:
 *     summary: Fatura detaylarını gösterir
 *     tags: [Billing]
 *     parameters:
 *       - in: query
 *         name: subscriberNo
 *         schema:
 *           type: string
 *       - in: query
 *         name: month
 *         schema:
 *           type: number
 *       - in: query
 *         name: year
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: BillTotal, BillPaid, BillDetails(PhoneUsage, InternetUsage)
 */


/**
 * @swagger
 * /payBill:
 *   post:
 *     summary: Fatura detaylarını gösterir
 *     tags: [Billing]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriberNo:
 *                 type: string
 *               month:
 *                 type: number
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Fatura başarıyla ödendi.
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Giriş başarılı, token döner
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Kullanıcı girişi
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kayıt başarılı, token döner
 */



router.post('/addUsage',JWTmiddleware.authenticateToken ,billingController.addUsage);
router.post('/calculateBill',JWTmiddleware.authenticateToken, billingController.calculateBill);
router.get('/QueryBill', billingController.queryBill);
router.get('/QueryBillDetailed',JWTmiddleware.authenticateToken,billingController.queryBillDetailed);
router.post('/PayBill', billingController.payBill);



router.post('/login', authController.login);
router.post('/register', authController.register);


module.exports = router;