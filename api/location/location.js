import getPool from '../util/db_handler'

 const Pool = getPool();

// console.log(getPool)

const getAll = (req, res)=>{
    Pool.query('SELECT * from location', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
        // console.log(results.rows);
      })
}

const getByID = (request, response) => {
  const id = parseInt(request.params.id)

  Pool.query('SELECT * FROM location WHERE location_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows)
      response.status(200).json(results.rows)
    else
      response.status(404).end();
  })
}

const create = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}


const createMany = (request, response) => {
  console.log(request.body)
  const {data} = request.body;
  let query = `INSERT INTO location (location_name) VALUES `;
  location.forEach( (loc, indx, loc_arr) => {
    
      if(indx !== loc_arr.length-1)
        query+=`('${loc}'),`
      else
        query+=`('${loc}');`
  });
  
  response.status(201).send(query)
}

export default {
    getAll, getByID, createMany
}
