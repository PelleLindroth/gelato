const pool = require('../db/connection')
const Utils = require('../utils/modelUtils')

const getAllMixes = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mixes.name AS mix_name, users.name AS creator_name, mixes.creator AS creator_id, mixes.mix_id, flavours.name AS flavour_name
      FROM mix_flavours
      INNER JOIN flavours USING(flavour_id)
      INNER JOIN mixes USING(mix_id)
      INNER JOIN users ON mixes.creator = users.user_id
      ORDER BY mix_flavours.mix_id`,
      (err, result) => {
        err && reject(err)
        !result.rows.length && resolve({ success: false, message: 'No mixes found' })

        const reply = Utils.buildMixesReply(result.rows)

        resolve(reply)
      }
    )
  })
}

const getSingleMix = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mixes.name AS mix_name, mixes.creator AS creator_id, users.name AS creator_name FROM Mixes
      INNER JOIN users
      ON mixes.creator = users.user_id
      WHERE mixes.mix_id = $1`,
      [id],
      (err, mixResult) => {
        err && reject(err)
        !mixResult.rowCount && resolve({ success: false, message: `Could not find mix with id ${id}` })

        pool.query(
          `SELECT flavours.name
              from mix_flavours
              INNER JOIN flavours
              USING (flavour_id)
              WHERE mix_flavours.mix_id = $1`,
          [id],
          (err, flavourResult) => {
            err && reject(err)

            resolve({ success: true, result: { id, name: mixResult.rows[0].name, flavours: flavourResult.rows.map(row => row.name), creator: { id: mixResult.rows[0].creator_id, name: mixResult.rows[0].creator_name } } })
          }
        )

      }
    )
  })
}

const getAllVotes = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT mixes.name, COUNT(*) AS votes FROM users
      INNER JOIN mixes
      ON mixes.mix_id = users.favorite_mix
      GROUP BY mixes.name
      ORDER BY votes DESC`,
      (err, result) => {
        err && reject(err)

        resolve({ success: true, message: 'Only showing mixes with at least 1 vote', count: result.rowCount, results: result.rows })
      }
    )
  })
}

const getVotes = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) as votes FROM users
      INNER JOIN mixes
      ON users.favorite_mix = $1 AND mixes.mix_id = users.favorite_mix`,
      [id],
      (err, result) => {
        err && reject(err)
        console.log(result);
        resolve({ success: true, votes: result.rows[0].votes })
      }
    )
  })
}

const createEmptyMix = (name, creator) => {
  if (!name || !creator) throw ('Invalid query. Required: name and creator')

  return new Promise((resolve, reject) => {
    pool.query(`
     INSERT INTO Mixes (name, creator)
     VALUES ($1, $2)
      RETURNING *`,
      [name, creator],
      (err, mixResult) => {
        err && reject(err)

        pool.query(
          `SELECT name, user_id FROM Users
          WHERE user_id = $1`,
          [creator],
          (err, userResult) => {
            err && reject(err)

            resolve({ success: true, mix: { name, id: mixResult.rows[0].mix_id }, creator: { name: userResult.rows[0].name, id: userResult.rows[0].user_id } })
          }
        )
      })
  })
}

const addFlavour = ({ mix_id, flavour_id }) => {
  console.log('here');
  if (!mix_id || !flavour_id) throw ('Invalid query. Required: mix_id and flavour_id')

  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO mix_flavours
      VALUES ($1, $2) 
      RETURNING *`,
      [flavour_id, mix_id],
      (err, result) => {

        err && reject(err)
        !result.rowCount && resolve({ success: false, message: `Could not add flavour with id ${flavour_id} to mix with id ${mix_id}` })

        pool.query(
          `SELECT flavours.name as flavour_name, mixes.name as mix_name
          FROM mix_flavours
          INNER JOIN flavours
          ON mix_flavours.flavour_id = flavours.flavour_id
          INNER JOIN mixes
          ON mix_flavours.mix_id = mixes.mix_id
          WHERE mixes.mix_id = $1 and flavours.flavour_id = $2`,
          [mix_id, flavour_id],
          (err, result) => {
            console.log(result)
            err && reject(err)

            resolve({ success: true, mix: { id: mix_id, name: result.rows[0].mix_name }, flavour: { id: flavour_id, name: result.rows[0].flavour_name } })
          }
        )
      }
    )
  })
}

const removeFlavour = ({ mix_id, flavour_id }) => {
  if (!mix_id || !flavour_id) throw ('Invalid query. Required: mix_id and flavour_id')

  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM mix_flavours
      WHERE mix_id = $1 AND flavour_id = $2`,
      [mix_id, flavour_id],
      (err, deleteResult) => {
        err && reject(err)
        !deleteResult.rowCount && resolve({ success: false, message: `Could not remove flavour with id ${flavour_id} from mix with id ${mix_id}` })

        pool.query(
          `SELECT DISTINCT mixes.name AS mix_name, flavours.name AS flavour_name
          FROM mix_flavours
          INNER JOIN flavours
          USING (flavour_id)
          INNER JOIN mixes
          ON mixes.mix_id = $1 AND flavours.flavour_id = $2`,
          [mix_id, flavour_id],
          (err, result) => {
            console.log(result)
            err && reject(err)
            resolve({ success: true, message: `Removed flavour ${result.rows[0].flavour_name} from mix ${result.rows[0].mix_name}` })
          }
        )
      }
    )
  })
}

const deleteMix = id => {
  if (!id) throw ('Invalid query. Required: id')

  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users
      SET favorite_mix = NULL
      WHERE favorite_mix = $1`,
      [id],
      (err) => {
        err && reject(err)

        pool.query(
          `DELETE FROM mix_flavours
            WHERE mix_id = $1`,
          [id],
          (err) => {
            err && reject(err)

            pool.query(
              `DELETE FROM mixes
              WHERE mix_id = $1
              RETURNING *`,
              [id],
              (err, result) => {
                err && reject(err)
                !result.rowCount && resolve({ success: false, message: `Could not find mix with id ${id}` })

                resolve({ success: true, message: `Mix with id ${id} deleted` })
              }
            )
          }
        )
      }
    )
  })
}

module.exports = {
  getAllMixes,
  getSingleMix,
  getAllVotes,
  getVotes,
  createEmptyMix,
  addFlavour,
  removeFlavour,
  deleteMix,
}