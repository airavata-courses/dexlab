const express = require('express');
const router = express.Router();

const userService = require('../models/activity');

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
router.get('/get', function (req, res) {
    userService.getActivity(req.headers)
        .then(result => {
            if (result.history) {
                res.status(200).send(JSON.parse(result.userLogs))
            } else {
                res.status(200).send({
                    data: []
                })
            }
        })
        .catch(err => res.status(503).send(err));
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
        let userActivity = await userService.getActivity(req.headers);
        console.log(userActivity)
        req.body.timestamp = new Date().getTime()
        if (userActivity.history) {
            if (userActivity.data.length > 20) {
                userActivity.data.pop()
            }
            userActivity.data.unshift(req.body);
        } else {
            userActivity = {
                data: []
            }
            userActivity.data.push(req.body);
        }

        let set = await userService.setActivity(req.headers, JSON.stringify(userActivity));
        console.log(set)
        if (set) {
            res.status(200).send({
                "message": "success"
            })
        } else {
            res.status(400).send({
                "message": "failure"
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