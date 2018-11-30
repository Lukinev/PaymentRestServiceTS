import moment from 'moment';
import Router from 'express-promise-router';
import { models } from './models/models_account';
import { checkJWT } from './libs/auth';
import { libs } from './libs/functions';
import { globalPoolAccount } from '../../globals';


const router = Router();

router.post('/account/byAcc', async (req, res) => {
    if ((await checkJWT(req.body)).status === 200) {

        const checkRequiredFields = await libs.checkRequestObjectPattern({ requiredFields: models.accountById.required_fields, request: Object.keys(req.body) });

        //if (checkRequiredFields===false)
        //{
        //    res.status(400).json({ "status": 400, "error": "Bad request. Check request parametrs: " + JSON.stringify(req.body), "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
        //}else{
        //Сначала получим UID из л/с поставщика
        const u = await libs.execQuery(models.accountGetUID, [req.body.account, req.body.kod_org], globalPoolAccount);
        //console.log(u.rows);
        const uid = u.rows[0].ls;
        if (u.rows[0].ls > 0) {
            //теперь получаем данные по uid
            const r = await libs.execQuery(models.accountById, [uid], globalPoolAccount);
            res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
        } else
            res.status(400).json({ "status": 400, "error": "Not find UID", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
        //}

    } else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});

router.post('/account/byProviderId/', async (req, res) => {
    if ((await checkJWT(req.body)).status === 200) {
        if ((req.body.account && typeof (req.body.account) === 'number') && (req.body.provider_id && typeof (req.body.provider_id) === 'number')) {
            const r = await libs.execQuery(models.accountByProvider, [req.body.account, req.body.provider_id], globalPoolAccount);
            res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
        } else
            res.status(400).json({ "status": 400, "error": "Bad request", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
    } else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});


module.exports = router;
