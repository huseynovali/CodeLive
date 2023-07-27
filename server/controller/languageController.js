const Language = require("../model/languageSchema");

const languageController = {
    addLanguage: async (req, res) => {
        const { name } = req.body;
        try {
            const newLanguage = new Language({
                name
            })
            await newLanguage.save()
            res.status(201).json(newLanguage)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getLanguage:async(req,res)=>{
        try {
            const language = Language.find()
            res.status(200).json(language);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getLanguageById:async(req,res)=>{
        const id = req.params.id;
        try {
            const language = Language.findById(id)
            res.status(200).json(language);
        } catch (error) {
            res.status(500).json(error);
        }
    }





}


module.exports = languageController