import models from '../models/index.js';

export const getAllFlowers = async (req, res) => {
    try {
        const flowers = await model.Flower.findAll();

        res.status(200).json({ success: true, data: flowers });
    } catch (error) {
        console.log('Error in getAllFlowers:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const updateFlower = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, image } = req.body;

    try {
        const flower = await models.Flower.findByPk(id);
        if (!flower) {
            return res.status(404).json({ success: false, message: 'Flower not found' });
        }

        flower.name = name;
        flower.description = description;
        flower.price = parseFloat(price);
        flower.stock = parseInt(stock);
        flower.image = image || '';

        await flower.save();

        res.status(200).json({ success: true, data: flower });
    } catch (error) {
        console.error('Error updating flower:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const addFlower = async (req, res) => {
    const { name, description, price, stock, image } = req.body;

    try {
        const newFlower = await models.Flower.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image: image || ''
        });

        res.status(201).json({ success: true, data: newFlower });
    } catch (error) {
        console.error('Error adding flower:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const deleteFlower = async (req, res) => {
    const { id } = req.params;

    try {
        const flower = await models.Flower.findByPk(id);
        if (!flower) {
            return res.status(404).json({ success: false, message: 'Flower not found' });
        }

        await flower.destroy();

        res.status(200).json({ success: true, message: 'Flower deleted successfully' });
    } catch (error) {
        console.error('Error deleting flower:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};