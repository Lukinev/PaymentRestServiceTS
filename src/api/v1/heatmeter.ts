import moment from 'moment';
import Router from 'express-promise-router';
import { models } from './models/models_heatmeter';
import { checkJWT } from './libs/auth';
import { libs } from './libs/functions';
import { globalPoolHeatMeter } from '../../globals';


const router = Router();

router.get('/heatmeter/setParams', async (req, res) => {
    const h = await libs.execQuery(models.heatmeterGetId, [req.query.sn], globalPoolHeatMeter);
    const id_heatmeter = h.rows[0].id;
    if (id_heatmeter > 0) {
        console.log(h.rows[0].id);
        const r = await libs.execQuery(models.heatmeterSetPararams, [0,
            id_heatmeter,
            req.query.power,
            req.query.flow,
            req.query.energy,
            req.query.temp1,
            req.query.temp2,
            moment().format('DD.MM.YYYY'),
            moment().format('hh:mm:ss')
        ],
            globalPoolHeatMeter);

        const u = await libs.execQuery(models.hetmeterUpdatePower, [id_heatmeter,
            parseInt(req.query.energy, 10),
            moment().format('DD.MM.YYYY HH:mm:ss')
        ],
            globalPoolHeatMeter);

        res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });

    } else
        res.status(400).json({ "status": 400, "error": "Not find heatmeter: " + req.query.sn, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
    //console.log(req.query.sn);
    //res.send(req.query.id);
});

router.post('/heatmeter/setParams', async (req, res) => {
    var id_heatmeter = 0;
    if ((await checkJWT(req.body)).status === 200) {
        try {
            const h = await libs.execQuery(models.heatmeterGetId, [req.body.sn], globalPoolHeatMeter);
            id_heatmeter = h.rows[0].id;
        } catch (error) {
            console.log("Error read params: " + req.body.sn + "\n");
        }
        if (id_heatmeter > 0) {
            const r = await libs.execQuery(models.heatmeterSetPararams, [req.body.client_id,
                id_heatmeter,
            req.body.power,
            req.body.flow,
            req.body.energy,
            req.body.temp1,
            req.body.temp2,
            moment().format('DD.MM.YYYY'),
            moment().format('hh:mm:ss')
            ],
                globalPoolHeatMeter);

            const u = await libs.execQuery(models.hetmeterUpdatePower, [id_heatmeter,
                parseInt(req.body.energy, 10),
                moment().format('DD.MM.YYYY HH:mm:ss')
            ],
                globalPoolHeatMeter);

            res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });

        } else
            res.status(400).json({ "status": 400, "error": "Not find heatmeter: " + req.body.sn, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
    } else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});

router.post('/heatmeter/getHeatmeter', async (req, res) => {
    if ((await checkJWT(req.body)).status === 200) {
        const r = await libs.execQuery(models.heatmeterGetHeatmeterSN, [req.body.sn], globalPoolHeatMeter);
        if (r.rows[0].id > 0) {
            res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
        } else
            res.status(400).json({ "status": 400, "error": "Not find heatmeter: " + req.body.sn, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
    }
    else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });


});

router.post('/heatmeter/getId', async (req, res) => {

    if ((await checkJWT(req.body)).status === 200) {
        const r = await libs.execQuery(models.heatmeterGetId, [req.body.sn], globalPoolHeatMeter);
        res.status(200).json({ "status": 200, "error": null, "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": r.rows });
    }
    else
        res.status(400).json({ "status": 400, "error": "Bad autorized token", "timestamp": moment().format('DD.MM.YYYY hh:mm:ss.SSS'), "dataset": null });
});

module.exports = router;
