const Category = require("../model/categorySchema");


const categoryController = {
    addCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const newCategory = new Category({
                name
            })
            await newCategory.save()
            res.status(201).json(newCategory)
        } catch (error) {
            res.status(500).json(error)
        }



    }




}


module.exports = categoryController