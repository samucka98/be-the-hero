const connection = require('../database/conection');

module.exports = {
    // Rota de login(Criar sessão ONG)
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
};