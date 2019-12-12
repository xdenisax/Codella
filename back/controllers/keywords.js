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



