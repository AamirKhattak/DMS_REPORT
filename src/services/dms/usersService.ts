
import getIBMDBConn from "../../utils/db_handler";



const getEntries = async () => {
  let conn = await getIBMDBConn();
  // console.log(conn);
  
  let data = await conn.query("select * from TOSSA.OGDCL_USERS_INFO");
  // console.log(data);

  conn.close();
  
  return data;
};

export default {
  getEntries,
};
