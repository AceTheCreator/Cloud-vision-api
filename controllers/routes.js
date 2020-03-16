const router = require('express').Router();
const Clarifai = require('clarifai');
const init = new Clarifai.App({apiKey:process.env.API_KEY});

router.post('/demographics', async (req, res) => {
    //The ‘Demographics’ model analyzes images and returns information on age, gender, 
    //and multicultural appearance for each detected face based on facial characteristics.
    // This model is great for anyone building an app that relies on demographic information to understand users.
    const {
        image
    } = req.body;
    const analyze = await init.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", image);
    if (analyze){
        try{
            const result = analyze.outputs[0].data;
            // performing a check wheather the data returned is empty
            function isEmpty(obj) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop)){
               try{
                            // incase you wanna add a bounty box, uncomment this
                        // const bounding_box = result.regions[0].region_info.bounding_box;
                        const concept_based_data = result.regions[0].data.concepts;
                        const face_based_data = result.regions[0].data.face;
                        const age_appearance = face_based_data.age_appearance;
                        const gender_appearance = face_based_data.gender_appearance;
                        const multicultural_appearance = face_based_data.multicultural_appearance;
                        // filtering data by header req
                       const query = req.query.appearance;
                       if(query){
                        if(query === 'age') res.status(200).send(age_appearance);
                        if(query === 'gender') res.status(200).send(gender_appearance);
                        if(query === 'culture')res.status(200).send(multicultural_appearance);
                        if(!query) res.status(200).send(concept_based_data);
                        if(query !== 'age' || 'gender' || 'culture') res.status(400).send('something is wrong with you\'re params')
                       }else{
                           res.status(400).send('Ooops seems you\'ve inserted the wrong parameter')
                       }
               }catch(err){
                   res.status(401).send('Something went wrong somewhere')
               }
                    }
                }
                return res.status(401).send('The image uploaded could not be analyzed, maybe because it\'s not a demographic image based ');
            }
           isEmpty(result);
        }catch(err){
            res.status(400).send('sorryt could\'nt process your request')
        }
    }else{
        console.log('error')
    }
});


module.exports = router;