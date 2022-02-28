import ibmdb from "ibm_db"
// let ibmdb = require("ibm_db")
let connStr = "DATABASE=TOS;HOSTNAME=172.16.0.35;PORT=50000;PROTOCOL=TCPIP;UID=db2admin;PWD=Oracle18c";

let startDate = '2022-02-20';
let endDate = '2022-02-28';

// console.log(getPool)

const getAll = (req, res)=>{

    ibmdb.open(connStr, function (err, connection) {
        if (err)
        {
          console.log(err);
          return;
        }
        
        let qry  = `
        SELECT DEPARTMENT,SUBSECTION, count(doc.CREATOR) AS doc_count, YEAR(doc.CREATE_DATE) "YEAR", MONTHNAME(doc.CREATE_DATE) "MONTHNAME", MONTH(doc.CREATE_DATE) "MONTH" FROM TOSSA.OGDCL_USERS_INFO usr
        FULL JOIN TOSSA.DOCVERSION doc
        ON usr.USER_LOGIN = doc.CREATOR
        WHERE doc.CREATE_DATE BETWEEN '${startDate}' AND '${endDate}' AND doc.CREATOR <> 'p8admin' AND usr.DEPARTMENT  <> 'NULL'
        GROUP BY DEPARTMENT,SUBSECTION,  YEAR(doc.CREATE_DATE), MONTHNAME(doc.CREATE_DATE), MONTH(doc.CREATE_DATE)
        ORDER BY DEPARTMENT, SUBSECTION
        `;
    
        connection.query(qry, function (err1, rows) {
          if (err1) {
            console.log(err1);
          }
          else {
            // console.log(rows);
            DB_DATA = rows;
            console.log('-0----------------');
           console.log(DB_DATA)
            //pdf(DB_DATA);
            // excel(DB_DATA);
          }
          connection.close(function(err2) {
            if(err2) console.log(err2);
            res.status(200).json(DB_DATA);
          });
        });
    });
}

export default {
    getAll
}
