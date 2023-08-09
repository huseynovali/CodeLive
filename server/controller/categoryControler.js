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
    },
    getCategories: async (req, res) => {
        try {
            const categories =await  Category.find()
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCategoriesById: async (req, res) => {
        const id = req.params.id;
        try {
            const categories = Category.findById(id)
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}


module.exports = categoryController