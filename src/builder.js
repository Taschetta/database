
export default ({ format }) => (expression = {}) => {

  const operators = {

    $select: (table) => {
      const columns = expression.$columns

      if(columns) {
        return {
          sql: 'SELECT ?? FROM ??', 
          bindings: [columns, table] 
        }  
      }
      
      return {
        sql: 'SELECT * FROM ??', 
        bindings: [table] 
      }
    }
    
  }

  let result
  
  const sql = []
  const bindings = []

  result = Object.entries(expression)
  
  result = result.forEach(([name, value]) => {
    if(operators[name]) {
      const result = operators[name](value)
      sql.push(result.sql)
      bindings.push(...result.bindings)
    }
  })

  result = sql.join(' ')
  result = format(result, bindings)

  return result
}