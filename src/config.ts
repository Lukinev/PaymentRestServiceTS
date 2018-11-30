export const conf = {
    version: 'v1',
    api_port: 9911,
    api_port_ssl: 9919,
    coreNum: 0,
    jwt_params: {// options for JWT authorization
        jwt_secret: 'kbv)yfhbq',
        jwt_options: {
            algorithms: [
                'HS512', 'JWT'
            ]
        }
    },
    pg_pool_conn_param_payments: {
        user: 'heatmeter',
        host: 'server.citypay.org.ua',
        database: 'payments',
        password: 'P@ssw0rd',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,// number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded
        // default is 10000 (10 seconds) - set to 0 to disable auto-disc 
    },
    pg_pool_conn_param_accounts: {
        user: 'heatmeter',
        host: 'server.citypay.org.ua',
        database: 'terminal',
        password: 'P@ssw0rd',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,// number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded
        // default is 10000 (10 seconds) - set to 0 to disable auto-disc 
    },
    pg_pool_conn_param_heatmeter: {
        user: 'heatmeter',
        host: 'server.citypay.org.ua',
        database: 'terminal',
        password: 'P@ssw0rd',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,// number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded
        // default is 10000 (10 seconds) - set to 0 to disable auto-disc 
    }
}