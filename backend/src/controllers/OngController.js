const crypto = require('crypto');
const connection = require('../database/conection');

module.exports = {
    // Método Listar ONG
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    // Método de criação de ONG
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
};