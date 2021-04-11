const pool = require('../db/connection')

const getAllMixes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(
        `SELECT mix_id, mixes.name, users.name AS creator_name, users.user_id AS creator_id
        FROM mixes INNER JOIN users 
        ON mixes.creator = users.user_id
        ORDER BY mix_id`)

      for (let mix of mixResult.rows) {
        const flavourResults = await pool.query(
          `SELECT flavour_id, name FROM flavours 
          INNER JOIN mix_flavours 
          USING(flavour_id)
          WHERE mix_id = $1`, [mix.mix_id]
        )

        const votesResult = await pool.query(
          `SELECT COUNT(*) AS votes FROM users
          INNER JOIN mixes
          ON favorite_mix = mix_id
          WHERE mix_id = $1`, [mix.mix_id]
        )

        mix.creator = { user_id: mix.creator_id, name: mix.creator_name }
        delete mix.creator_name
        delete mix.creator_id
        mix.flavours = flavourResults.rows
        mix.votes = +votesResult.rows[0].votes
      }

      resolve({ success: true, count: mixResult.rowCount, results: mixResult.rows })
    } catch (err) { reject(err) }
  })
}

const getSingleMix = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(
        `SELECT mixes.name AS mix_name, mixes.creator AS creator_id, users.name AS creator_name FROM Mixes
        INNER JOIN users
        ON mixes.creator = users.user_id
        WHERE mixes.mix_id = $1`,
        [id])

      !mixResult.rowCount && resolve({ success: false, message: `Could not find mix with id ${id}` })

      const flavourResult = await pool.query(
        `SELECT flavours.flavour_id, flavours.name
        from mix_flavours
        INNER JOIN flavours
        USING (flavour_id)
        WHERE mix_flavours.mix_id = $1`, [id]
      )

      const votesResult = await pool.query(
        `SELECT COUNT(*) AS votes FROM users
        INNER JOIN mixes
        ON favorite_mix = mix_id
        WHERE mix_id = $1`, [id]
      )

      resolve({
        success: true,
        result: {
          mixes_id: +id,
          name: mixResult.rows[0].mix_name,
          creator: {
            user_id: mixResult.rows[0].creator_id,
            name: mixResult.rows[0].creator_name
          },
          flavours: flavourResult.rows,
          votes: +votesResult.rows[0].votes
        }
      })
    } catch (err) { reject(err) }

  })
}

const createEmptyMix = (name, creator) => {
  if (!name || !creator) throw ('Invalid query. Required: name and creator')

  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(`
      INSERT INTO mixes (name, creator)
      VALUES ($1, $2)
       RETURNING *`, [name, creator]
      )

      const userResult = await pool.query(
        `SELECT user_id, name FROM Users
       WHERE user_id = $1`, [creator]
      )
      console.log(mixResult.rows[0]);
      console.log(userResult.rows[0]);
      resolve({ success: true, mix: mixResult.rows[0], creator: userResult.rows[0] })
    } catch (err) { reject(err) }
  })
}

const addFlavour = ({ mix_id, user_id, flavour_id }) => {
  if (!mix_id || !user_id || !flavour_id) throw ('Invalid query. Required: mix_id, user_id and flavour_id')

  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(
        `SELECT * FROM mixes
        WHERE mix_id = $1`, [mix_id]
      )
      !mixResult.rowCount && reject({ message: `Found no mix with id ${mix_id}` })
      mixResult.rows[0].creator != user_id && reject({ message: 'Access denied' })

      const result = await pool.query(
        `INSERT INTO mix_flavours
        VALUES ($1, $2) 
        RETURNING *`,
        [flavour_id, mix_id])

      !result.rowCount && resolve({ success: false, message: `Could not add flavour with id ${flavour_id} to mix with id ${mix_id}` })

      const nameResult = await pool.query(
        `SELECT flavours.name as flavour_name, mixes.name as mix_name
        FROM mix_flavours
        INNER JOIN flavours
        USING (flavour_id)
        INNER JOIN mixes
        USING (mix_id)
        WHERE mix_id = $1 AND flavour_id = $2`, [mix_id, flavour_id]
      )

      resolve({ success: true, mix: { id: mix_id, name: nameResult.rows[0].mix_name }, flavour: { id: flavour_id, name: nameResult.rows[0].flavour_name } })
    } catch (err) { reject(err) }
  })
}

const removeFlavour = ({ mix_id, user_id, flavour_id }) => {
  if (!mix_id || !user_id || !flavour_id) throw ('Invalid query. Required: mix_id, user_id and flavour_id')

  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(
        `SELECT * FROM mixes
        WHERE mix_id = $1`, [mix_id]
      )
      !mixResult.rowCount && reject({ message: `Found no mix with id ${mix_id}` })
      mixResult.rows[0].creator != user_id && reject({ message: 'Access denied' })

      const deleteResult = await pool.query(
        `DELETE FROM mix_flavours
        WHERE mix_id = $1 AND flavour_id = $2
        RETURNING *`,
        [mix_id, flavour_id])

      !deleteResult.rowCount && resolve({ success: false, message: `Could not remove flavour with id ${flavour_id} from mix with id ${mix_id}` })

      const result = await pool.query(
        `SELECT DISTINCT mixes.name AS mix_name, flavours.name AS flavour_name
            FROM mix_flavours
            INNER JOIN flavours
            USING (flavour_id)
            INNER JOIN mixes
            ON mixes.mix_id = $1 AND flavours.flavour_id = $2`,
        [mix_id, flavour_id]
      )

      resolve({
        success: true,
        message: `Removed flavour ${result.rows[0].flavour_name} from mix ${result.rows[0].mix_name}`
      })
    } catch (err) { reject(err) }
  })
}

const deleteMix = ({ mix_id, user_id }) => {
  if (!mix_id || !user_id) throw ('Invalid query. Required: mix_id and user_id')

  return new Promise(async (resolve, reject) => {
    try {
      const mixResult = await pool.query(
        `SELECT * FROM mixes
        WHERE mix_id = $1`, [mix_id]
      )
      !mixResult.rowCount && reject({ message: `Found no mix with id ${mix_id}` })
      mixResult.rows[0].creator != user_id && reject({ message: 'Access denied' })

      await pool.query(
        `UPDATE users
        SET favorite_mix = NULL
        WHERE favorite_mix = $1`, [mix_id]
      )

      await pool.query(
        `DELETE FROM mix_flavours
        WHERE mix_id = $1`, [mix_id]
      )

      const result = await pool.query(
        `DELETE FROM mixes
        WHERE mix_id = $1
        RETURNING *`, [mix_id]
      )

      !result.rowCount && reject({ message: `Could not find mix with id ${mix_id}` })

      resolve({ success: true, message: `Mix with id ${mix_id} deleted` })
    } catch (err) { reject(err) }
  })
}

module.exports = {
  getAllMixes,
  getSingleMix,
  createEmptyMix,
  addFlavour,
  removeFlavour,
  deleteMix,
}