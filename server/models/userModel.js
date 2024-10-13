import pool from "../configs/db.js"

const User = {
  async create({ login, password }) {
    try {
      const result = await pool.query(
        'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *', 
        [login, password]
      )
      return result.rows[0]
    } catch(e) {
      return undefined
    }
  },
  
  async read({login}) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE login = $1`, [login])
      return result.rows[0]
    } catch(e) {
      return undefined
    }
  },
  
  update({login, password, id}) { // Изменить функцию (Убрать использование id)
    return pool.query('UPDATE users SET login = $1, password = $2 WHERE id = $3 RETURNING *', [login, password, id])
  },
  
  delete({ id }) {
    return pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

export default User