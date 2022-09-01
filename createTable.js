const {options} = require('./mariadb/conexiondb')

const knex = require('knex') (options)

knex.schema.createTable('productos', table =>{
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('password')
    table.string('edad')
})
.then(() => console.log('table created'))
.catch((err) => {console.log(err); throw err})
.finally(() => knex.destroy())