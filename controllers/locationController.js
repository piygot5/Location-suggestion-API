
let locations = require("../data/geoLocation.json");



const { cosineSimilarity, textCosineSimilarity } =  require('../utils/similarity.js');







exports.getlocations = (req, res) => {
    const geoLocation = {"suggestions":[]};
    const geoLocationarr = [];

    let locations = require("../data/geoLocation.json");
 
    const latitude = req.query.latitude;
    const longitude = req.query.longitude
    const name = req.query.q;
    const resPerPage = 10;
    const currentPage = Number(req.query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const startIndex = skip;
    const endIndex = skip + resPerPage;



    console.log(latitude,longitude,name);
    if(name===undefined && longitude === undefined && latitude ===undefined){
        locations.forEach(location => {    
            geoLocationarr.push({
                "name":location["name"],
                "latitude": location["lat"],
                "longitude": location["long"]
            })
        });
        geoLocation["suggestions"] = geoLocationarr.slice(startIndex,endIndex);
           
    }else{


        if(longitude!= undefined && latitude!=undefined){
            
            locations.forEach(location => {
                const locationSimilarity = Number(cosineSimilarity([latitude,longitude],[location["lat"],location["long"]]));
                let score = 0
                if(name!=undefined){
                    const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
                    score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2));
                }
                else{
                    score = locationSimilarity;
                }

                
                geoLocationarr.push({
                    "name":location["name"],
                    "latitude": location["lat"],
                    "longitude": location["long"],
                    "score": score
                })
            });

            geoLocationarr.sort((a, b) => b.score - a.score);
            geoLocation["suggestions"] = geoLocationarr.slice(startIndex,endIndex);
            
            
        }
        else if (longitude!=undefined) {
            locations.forEach(location => {
                const locationSimilarity = Number(cosineSimilarity([longitude],[location["long"]]));
                const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
                const score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2));
                
                geoLocationarr.push({
                    "name":location["name"],
                    "latitude": location["lat"],
                    "longitude": location["long"],
                    "score": score
                })
            });
            geoLocationarr.sort((a, b) => b.score - a.score);
            geoLocation["suggestions"] = geoLocationarr.slice(startIndex,endIndex);
            
            

        }
        else if (latitude!=undefined) {
            locations.forEach(location => {
                const locationSimilarity = Number(cosineSimilarity([latitude],[location["lat"]]));
                const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
                const score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2));
                
                geoLocationarr.push({
                    "name":location["name"],
                    "latitude": location["lat"],
                    "longitude": location["long"],
                    "score": score
                })
            });
            geoLocationarr.sort((a, b) => b.score - a.score);
            geoLocation["suggestions"] = geoLocationarr.slice(startIndex,endIndex);
            
            

        }
        else if (name!=undefined) {
            locations.forEach(location => {
                const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
                const score = Number((nameSimilarity).toFixed(2));
                
                geoLocationarr.push({
                    "name":location["name"],
                    "latitude": location["lat"],
                    "longitude": location["long"],
                    "score": score
                })
            });
            geoLocationarr.sort((a, b) => b.score - a.score);
            geoLocation["suggestions"] = geoLocationarr.slice(startIndex,endIndex);
            
            

        }

        else {
            
            geoLocation["suggestions"] = [];
                   
        }

        if(geoLocation["suggestions"].length!=0 && geoLocation["suggestions"].score<=0.30){
            geoLocation["suggestions"] = [];
        }
        
        


        
    }
    res.status(200).json(geoLocation);
}

