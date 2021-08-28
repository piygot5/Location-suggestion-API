function letterCountMap(str){
    
    let letterCount = {};
    [...str].forEach((w)=>{
        letterCount[w] = (letterCount[w] || 0) +1;

    });
return letterCount;
}

function addlettersToDictionary(letterCountmap, dict){
    for(let key in letterCountmap){
        dict[key] = true;
    }
}
function letterMapToVector(map,dict){
    let wordCountVector = [];
    for (let term in dict){
        wordCountVector.push(map[term] || 0);
    }
    return wordCountVector;
}

function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

exports.cosineSimilarity = (vecA,vecB) => {
    let similarityResult = dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
    return similarityResult.toFixed(2);
}

exports.textCosineSimilarity = (txtA,txtB) => {
    const letterCountA = letterCountMap(txtA);
    const letterCountB = letterCountMap(txtB);
    let dict = {};
    addlettersToDictionary(letterCountA,dict);
    addlettersToDictionary(letterCountB,dict);
    const vectorA = letterMapToVector(letterCountA,dict);
    const vectorB = letterMapToVector(letterCountB,dict);
    let similarityResultText = dotProduct(vectorA,vectorB)/ (magnitude(vectorA) * magnitude(vectorB));;
    return similarityResultText.toFixed(2);
}


