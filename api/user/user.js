import getPool from '../util/db_handler'

const Pool = getPool();

const TABLE_NAME = `public."user"`;
const TABLE_VIEW_NAME = `public."v_user"`;

// console.log(getPool)

const getAll = (req, res, next)=>{

    let query = '';
    let username = '';
    if(req.query.username){
      username = req.query.username;
      console.log('username', username);
      // res.status(200).json(results.rows);
      query = `SELECT * from ${TABLE_NAME} where user_name = '${username}'`
    }else{
      query = `SELECT * from ${TABLE_VIEW_NAME}`;
    }
  
    Pool.query(query,sql_results);
    
    function sql_results(error, results){
        if (error) {
          throw error
        }
        res.status(200).json(results.rows);
        // console.log(results.rows);
      }
}

const getByID = (request, response) => {
  const id = parseInt(request.params.id)

  Pool.query(`SELECT usr.og_number,
    usr.first_name,
    usr.designation_id,
    dsgn.designation_name designation,
    dept.department_name department,
    usr.location_id,
    lc.location_name "location",
    usr.grade_id,
    grd.grade_name grade,
    usr.user_id
   FROM ${TABLE_NAME}  usr
     JOIN designation dsgn ON usr.designation_id = dsgn.designation_id
     JOIN department dept ON usr.department_id = dept.department_id
     JOIN grade grd ON usr.grade_id = grd.grade_id
     JOIN "location" lc ON usr.location_id = lc.location_id
   where is_active <> false and user_id = $1`, [id], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows)
      response.status(200).json(results.rows)
    else
      response.status(404).end();
  })
}

export default {
    getAll, getByID
}
