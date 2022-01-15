import mysql from 'mysql2/promise.js'
import makeConnection from './src/connection.js'
import makeTable from './src/table.js'

export const connection = await makeConnection({ mysql })
export const useTable = makeTable({ connection })

export default useTable
