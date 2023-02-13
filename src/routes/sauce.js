const express = require('express')

const { sauceCollection } = require('../models/index')

const sauceRoutes = express();
sauceRoutes.get('/sauce', getSauces) // Retrieve All
sauceRoutes.get('/sauce/:id', getSauce) // Retrieve One
sauceRoutes.post('/sauce', createSauce) // Create
sauceRoutes.put('/sauce/:id', updateSauce) // Update
sauceRoutes.delete('/sauce/:id', deleteSauce) // Delete

const getSauce = async (_, res) => {
    const allSauce = await sauceCollection.read()
    res.json(allSauce)
}

const getSauce = async (req, res, next) => {
    const id = req.params.id
    const sauce = await Sauce.findOne({
        where: { id:id },
        include: Sauce,
    });
    if (user === null) {
        next();
    } else {
        const rawSauce = {
            id: sauce.id,
            sauce: user.Sauce.map((sauce) => sauce.name),
        };
        res.json(rawSauce);
    }
    }    sauce === null ? next() : res.json(sauce)
}

const deleteSauce = async (req, res, next) => {
    const id = req.params.id
    const sauce = await sauceCollection.delete(id)
    if (sauce === null) {
        next()
    } else {
        await sauce.destroy();
        res.json({})
    }
}
const createSauce = async (req, res) => {
    const sauceItemName = req.body.name
    const sauceGroup = req.body.group
    const sauce = await sauceCollection.create({
        name: sauceItemName,
        group: sauceGroup,
    })
    const sauce = req.body.sauce ?? [];
    for (const name of sauce) {
        await user.createHobby({ name });
    }
    res.json(sauce);
}


const updateSauce = async (req, res, next) => {
    const id = req.params.id
    let sauce;

    const sauceItemName = req.body.name ?? sauce.name
    const sauceGroup = req.body.group ?? user.group
    // console.log(req.body.group)
    let updatedSauce = {
        name: sauceItemName,
        group: sauceGroup,
    }

    sauce = await sauceCollection.update(updatedSauce, id)

    res.json(sauce)
}
sauceRoutes.get('/sauce', getSauces) // Retrieve All
sauceRoutes.get('/sauce/:id', getSauce) // Retrieve One
sauceRoutes.post('/sauce', createSauce) // Create
sauceRoutes.put('/sauce/:id', updateSauce) // Update
sauceRoutes.delete('/sauce/:id', deleteSauce) // Delete
module.exports = {
    sauceRoutes,
}