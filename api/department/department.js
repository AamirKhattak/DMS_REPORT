import getPool from '../util/db_handler'

const Pool = getPool();

const TABLE_NAME = 'department';

// console.log(getPool)

const getAll = (req, res)=>{
    Pool.query(`SELECT * from ${TABLE_NAME}`, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
        // console.log(results.rows);
      })
}

const getByID = (request, response) => {
  const id = parseInt(request.params.id)

  Pool.query(`SELECT * FROM ${TABLE_NAME} WHERE department_id = $1`, [id], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows)
      response.status(200).json(results.rows)
    else
      response.status(404).end();
  })
}


const createMany = (request, response) => {
  console.log(request.body)
  const {data} = request.body;
  let query = `INSERT INTO ${TABLE_NAME} (department_name) VALUES `;
  data.forEach( (design, indx, design_arr) => {
    
      if(indx !== design_arr.length-1)
        query+=`('${design}'),`
      else
        query+=`('${design}');`
  });

  Pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${query}, ${results}`)
  })
}

export default {
    getAll, getByID, createMany
}
