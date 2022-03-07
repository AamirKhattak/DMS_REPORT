
import { start } from "repl";
import getIBMDBConn from "../../utils/db_handler";

const getEntriesBWDates = async (startDate:string, endDate:string) => {
  
  if(!startDate || !endDate){
    return null;
  }
  
  try {
    let conn = await getIBMDBConn();

    let qry = `SELECT DEPARTMENT,SUBSECTION, count(doc.CREATOR) AS doc_count, YEAR(doc.CREATE_DATE) "YEAR", MONTHNAME(doc.CREATE_DATE) "MONTHNAME", MONTH(doc.CREATE_DATE) "MONTH" FROM TOSSA.OGDCL_USERS_INFO usr
            FULL JOIN TOSSA.DOCVERSION doc
            ON usr.USER_LOGIN = doc.CREATOR
            WHERE doc.CREATE_DATE BETWEEN ${startDate} AND ${endDate} AND doc.CREATOR <> 'p8admin' AND usr.DEPARTMENT  <> 'NULL'
            GROUP BY DEPARTMENT,SUBSECTION,  YEAR(doc.CREATE_DATE), MONTHNAME(doc.CREATE_DATE), MONTH(doc.CREATE_DATE)
            ORDER BY DEPARTMENT, SUBSECTION`;
  
    console.log(qry);
            
    
    let data = await conn.query(qry);
  
    conn.close();
    return data;
    
  } catch (error) {
    console.log(error);
    return null;    
  }

  

};

export default {
  getEntriesBWDates,
};
