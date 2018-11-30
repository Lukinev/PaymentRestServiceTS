import moment from 'moment';
import Router from 'express-promise-router';
import { models } from './models/models_payment';
import { checkJWT } from './libs/auth';
import { libs } from './libs/functions';
import { globalPoolPayment } from '../../globals';

const router = Router();

router.get('/payment/', (req: any, res: any) => {
    res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS') });
});

router.post('/payment/create', async (req: any, res: any) => {
    const checkRequiredFields = await libs.checkRequestObjectPattern({ requiredFields: models.paymentNewPackage.required_fields, request: Object.keys(req.body) });
    if ((await checkJWT(req.body)).status === 200) {
        if (checkRequiredFields === false) {// if not valid request parametrs
            res.status(400).json({ "status": 400, "error": "Bad request. Check request parametrs: " + JSON.stringify(req.body), "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
        }
        else {
            if (req.body.terminal_id && typeof (req.body.terminal_id) === 'number') {
                const r = await libs.execQuery(models.paymentNewPackage, [req.body.terminal_id, req.body.service_id, req.body.amount], globalPoolPayment);
                res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
            } else
                res.status(400).json({ "status": 400, "error": "Bad request", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
        }
    } else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});

router.post('/payment/byid', async (req: any, res: any) => {
    //chech for valid token
    if ((await checkJWT(req.body)).status === 200) {
        if (req.body.payment_id && typeof (req.body.payment_id) === 'number') {
            const r = await libs.execQuery(models.paymentById, [req.body.payment_id], globalPoolPayment);
            res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
        } else
            res.status(400).json({ "status": 400, "error": "Bad request", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
    } else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});

module.exports = router;
