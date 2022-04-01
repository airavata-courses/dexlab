const express = require('express');
const router = express.Router();
const {
    v5: uuidv4
} = require('uuid');
const constants = require('../lib/constants')
const createUserToken = require("../models/token").generateToken;
const db = require('../utils/db').services;
const fetch = require('node-fetch')
const bcrypt = require('bcrypt')
const check = require('../controllers/usercheck').check;

/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *       - Account management
 *     requestBody:
 *       description: Register a user on Dexlab
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   default: "Success"
 *       400:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   default: "Email id already exist, Please try with different id"
 */
router.post('/signup', async (req, res) => {
    try {
        req.body.userID = uuidv4(req.body.email, constants.MY_NAMESPACE);
        const userCheck = await check(req.body.email);
        if (userCheck) {
            return res.status(401).send({
                "message": "Email already exist"
            })
        }
        const response = await fetch(`${constants.addUserUrl}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'uniqueid': uuidv4(req.body.email, constants.MY_NAMESPACE)
            },
            body: JSON.stringify(req.body)
        });
        if (response.status == 200) {
            let resToken = await response.json();
            const val = {
                message: "Success",
                userid: req.body.userID,
                email: req.body.email,
                token: createUserToken({
                    uniqueid: req.body.userID,
                    userType: 'ADS'
                })
            }
            // await db.setex(req.body.userID, process.env.user_redis_expiry, JSON.stringify({
            await db.setex(req.body.userID, 1000000000, JSON.stringify({
                user_token: val.token,
                orm_token: resToken.token
            }))
            return res.status(200).send(val)
        } else if (response.status == 400) {
            return res.status(400).send({
                "message": "Bad Request"
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            message: "Something went wrong"
        })
    }
})


/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Account management
 *     requestBody:
 *       description: Login to your Dexlab account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   default: "Success"
 *                 userid:
 *                   type: string
 *                   description: Unique ID for this user
 *                 email:
 *                   type: string
 *                   required: true
 *       400:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   default: "Email id doesn't exist, please signup to access the services"
 */
router.post('/login', async (req, res) => {
    try {
        let uniqueid = uuidv4(req.body.email, constants.MY_NAMESPACE);
        const options = {
            url: `${constants.loginUserUrl}${uniqueid}`,
            method: "GET",
            headers: {
                token: "jbasdjbj"
            }
        }
        const response = await fetch(`${constants.loginUserUrl}${uniqueid}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        const data = await response.json();
        const flag = await bcrypt.compare(req.body.password, data.password)
        if (response.status == 200) {
            if (flag) {
                const value = {
                    message: "Success",
                    userid: uniqueid,
                    email: req.body.email,
                    token: createUserToken({
                        uniqueid: uniqueid,
                        userType: 'ADS'
                    })
                }
                await db.setex(uniqueid, 1000000000, JSON.stringify({
                    user_token: value.token,
                    orm_token: data.token
                }))
                return res.status(200).send(value)
            } else {
                return res.status(401).send({
                    "message": "Invalid emailid/password"
                })
            }
        } else if (response.status == 400) {
            return res.status(400).send({
                "message": "Email id doesn't exist, please signup to access the services"
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(503).send({
            error: e,
            status: "Something went wrong"
        })
    }
})

module.exports = router