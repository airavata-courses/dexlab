const express = require('express');
const router = express.Router();

const userService = require('../models/activity');
const validator = require('../middlewares/validator').validator
const db = require('../utils/db').services

router.use('/', async (req, res, next) => {
    try {
        let auth = await validator(req.headers)
        if (auth.validated) {
            next()
        } else {
            res.status(auth.status).send(auth.message)
        }
    } catch (error) {
        console.log(error)
    }
})

/**
 * @openapi
 * /get:
 *   get:
 *     tags:
 *       - User activities
 *     description: Get a user's activity
 *     parameters:
 *       - in: header
 *         name: uniqueid
 *         description: Identifier for identifying users
 *     responses:
 *       200:
 *         description: Returns user logs
 */
router.get('/get', async (req, res) => {
    try {
        let tokens = await db.get(req.headers.uniqueid);
        tokens = JSON.parse(tokens)
        userService.getActivity(req.headers, tokens.orm_token)
            .then(result => {
                if (result.history) {
                    res.status(200).send(JSON.parse(result.userLogs));
                } else {
                    res.status(200).send({
                        data: []
                    });
                }
            })
            .catch(err => {
                console.log(err)
                res.status(503).send(err)
            });
    } catch (error) {
        console.log(error)
        res.status(503).send(error)
    }

});

/**
 * @openapi
 * /set:
 *   post:
 *     tags:
 *       - User activities
 *     description: Set a user's activity
 *     parameters:
 *       - in: header
 *         name: uniqueid
 *         description: Identifier for identifying users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   default: "success"
 *       400:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   default: "failure"
 */
router.post('/set', async (req, res) => {
    try {
        let tokens = await db.get(req.headers.uniqueid);
        tokens = JSON.parse(tokens)
        let userActivity = await userService.getActivity(req.headers, tokens.orm_token);

        req.body.timestamp = new Date().getTime()
        if (userActivity.history) {
            userActivity.userLogs = JSON.parse(userActivity.userLogs);
            userActivity.userLogs = userActivity.userLogs.userLogs;
            console.log(userActivity.userLogs)
            if (userActivity.userLogs.data.length > 100) {
                userActivity.userLogs.data.pop()
            }
            let len = userActivity.userLogs.data.length
            req.body.id = len + 1
            userActivity.userLogs.data.unshift(req.body);
        } else {
            userActivity = {
                userLogs: {
                    data: []
                }
            }
            req.body.id = 1
            userActivity.userLogs.data.push(req.body);
        }

        let data = await userService.setActivity(req.headers, JSON.stringify(userActivity), user_token.orm_token);
        let set = data.flag
        if (set) {
            res.status(200).send({
                "message": "success"
            })
        } else if (data.status == 401) {
            res.status(401).send({
                "message": "Token expired"
            })
        } else {
            res.status(400).send({
                "message": "Failed to update activity"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(503).send({
            error: error,
            status: "Something went wrong"
        })
    }
});

module.exports = router;