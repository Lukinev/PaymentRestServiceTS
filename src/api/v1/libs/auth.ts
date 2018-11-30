import jwt from 'jsonwebtoken';
import { conf } from '../../../config';

export const checkJWT = async function (inputParams: any): Promise<any> {
    let res = {};
    jwt.verify(inputParams.user_token, conf.jwt_params.jwt_secret, conf.jwt_params.jwt_options, function (err: any, decoded: any) {
        if (err) {

            res = { status: 400 };
        }
        else {
            if (JSON.stringify(decoded.client_name) == JSON.stringify(inputParams.client_name) && JSON.stringify(decoded.client_id) === JSON.stringify(inputParams.client_id)) {
                res = { status: 200 }
            }
            else res = { status: 400 }
        }
    });
    return res;
}