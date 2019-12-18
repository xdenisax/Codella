/*GET /keywords -> afisare toate cuvintele cheie
GET /keywords/note_id -> afisare toate cuvintele cheie pt o notita
POST /keywords/note_id -> adaugare cuvant cheie la notita*/

const {Models} = require("./../models/models.js");

//GET /keywords -> afisare toate cuvintele cheie
const getAllKeywords = async(req,res) => { 
    try{
        const keywords = await Models.Keywords.findAll();
        res.status(200).send(keywords);
    }catch(err){
        res.status(400).send({message:"Bad request: server unable to process the request"});
    }
}


//GET /keywords/note_id -> afisare toate cuvintele cheie pt o notita

const getAllKeywordsForANote = async(req, res) => {
    try{
        const note_id = req.body.note_id;
        if(note_id){
            try{
                const keywords = await Models.Keywords.findAll({where: {id:note_id}});
                res.status(200).send(keywords);
            }
            catch(err){
                res.status(500).send(err);
            }
        }else{
            res.status(400).send({message:"Bad request: server unable to process the request"});
        }
    }catch(err){
        res.status(500).send(err);
    }
}

//POST /keywords/note_id -> adaugare cuvant cheie la notita
const addKeywordToNote = (req,res) => {
    const keyword = req.body; 
    if(keyword.id && keyword.word){
        const result = await Models.Keywords.create(keyword);
        res.status(201).send({message:"Keyword added successfully."});
    }
    else{
        res.status(400).send({message:"Invalid payload"});
    }
}


