// controllers/UserController.js
const Imc = require('../models/Imc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async insertImcUser(req, res) {
        try {
            const { user_id, height, age, weight } = req.body;

            // Verificar se o usuário já existe
            const existingImc = await Imc.findOne({ user_id });

            if (existingImc) {
                // O usuário já possui um registro IMC, então atualize os dados
                existingImc.height = height;
                existingImc.age = age;
                existingImc.weight = weight;

                await existingImc.save();

                return res.status(200).json({ message: 'IMC atualizado com sucesso' });
            } else {
                // O usuário não possui um registro IMC, então insira um novo
                const newImc = new Imc({
                    user_id,
                    height,
                    age,
                    weight,
                });

                await newImc.save();

                return res.status(201).json({ message: 'IMC inserido com sucesso' });
            }
        } catch (error) {
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    async getImcUser(req, res) {
        try {
            const { user_id } = req.query;

            // Verificar se o imc existe
            const imc = await Imc.findOne({ user_id });
            if (!imc) {
                return res.status(404).json({ erro: 'Informações sobre Imc não encontradas' });
            }

            return res.json({ imc });
        } catch (error) {
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }
};
