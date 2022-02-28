const Pool = require('pg').Pool

const getPool = () =>{
    const pool = new Pool({
    user: 'postgres',
    host: '172.16.0.26',
    database: 'TEST_OGDCL_Helpdesk',
    password: 'helpdesk.db.12#$',
    port: 5432,
    })

    return pool;
}

export default getPool;