import { Pool } from "pg";
import { conf } from "./config";

export const globalPoolAccount: Pool = new Pool(conf.pg_pool_conn_param_accounts);
export const globalPoolPayment: Pool = new Pool(conf.pg_pool_conn_param_payments);
export const globalPoolHeatMeter: Pool = new Pool(conf.pg_pool_conn_param_heatmeter);

