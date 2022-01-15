import { describe, it, expect, beforeEach } from "vitest"
import { format } from "mysql2"
import useBuilder from '../src/builder.js'

describe("the build(expression) function", () => {

  let build = useBuilder({ format })

  describe("when the expression contains a $select operation", () => {

    it("returns a select query", () => {
      
      const result = build({ 
        $select: 'article' 
      })
      
      expect(result).toEqual('SELECT * FROM `article`')
    })

    describe("and it also contains a $columns operation", () => {
      
      it("selects only the specified columns", () => {
        
        const result = build({ 
          $select: 'article',
          $columns: [
            'id', 'name', 'value'
          ]
        })

        expect(result).toEqual('SELECT `id`, `name`, `value` FROM `article`')
      })
      
    })
    
  })
  
})

// Example expression
// { 
//   $select: 'article',
//   $join: [
//     { type: 'left', table: 'article_detail', key: 'id', references: 'fkArticle' },
//     { type: 'left', table: 'article_relation', key: 'id', references: 'fkArticle' },
//     { type: 'left', table: 'article_value', key: 'id', references: 'fkArticle' },
//   ],
//   $columns: [
//     'id', 'name', 'value'
//   ]
// }