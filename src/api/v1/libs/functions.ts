import { Pool } from "pg";

async function execQuery(model: any, params: any[], connection: Pool): Promise<any> {

    return connection.query(model, params); // returns result of query using pool connect from params "connection"
}

// func cheked income data by pattern
// incomeParams = {requiredFields:[], request:[]}
async function checkRequestObjectPattern(incomeParams: any): Promise<boolean> {
    let res = incomeParams.requiredFields.sort().every(function (value: string, index: number) {
        if (value === incomeParams.request.sort()[index])
            return true;
        else
            return false;
    });
    return res;
}

export const libs = { execQuery, checkRequestObjectPattern }