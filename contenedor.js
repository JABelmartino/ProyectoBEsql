const {options} = require('./mariadb/conexiondb')
const knex = require('knex') (options)

class Contenedor{
    constructor(productos){
        
        this.tabla = productos
    }
    
}

module.exports = Contenedor

