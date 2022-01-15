
export default ({ connection }) => (table) => {

  async function query(sql, bindings) {
    const result = await connection.query(sql, bindings)
    return result[0]
  }
  
  return {
    
    async findMany() {
      const result = await query('SELECT * FROM ??', [table])
      return result
    },
  
    async findOne({ id }) {
      const result = await query('SELECT * FROM ?? WHERE `id` = ? LIMIT 1', [table, id])
      return result[0]
    },

  }  
}
