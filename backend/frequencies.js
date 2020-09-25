//Calculates the frequency of each data.
function simpleFrequencies(varValues) {
    let simpleFrequencies = {};

    varValues.forEach(value => {
        !(value in simpleFrequencies) ? simpleFrequencies[value] = 1 :  simpleFrequencies[value] += 1
    });

    return simpleFrequencies;
}

function variableData(varName, varType, varValues, valuesFi) {    
    let frequencies = [];
    let accumulated = 0;
    let numberOfValues = varValues.length;

    if (varType === 'quantitativaContinua') {
        //Max and Min values
        let xMin = Math.min(...varValues);
        let xMax = Math.max(...varValues);

        //Calculating the classInterval
        let amplitude = xMax - xMin       
        let k = Math.round(Math.sqrt(numberOfValues)); 
        let classInterval = Math.ceil(amplitude/k);

        //Constructing the new valuesFi values, counting how many values are in each classInterval
        let countinuousFi = {}
        
        for(let i = 0; i <= xMax; i += classInterval){
            let key = `${i} &vdash; ${i + classInterval}`;
            countinuousFi[key] = varValues.filter(value => value >= i && value < i + classInterval).length
        }

        valuesFi = countinuousFi;
    }

    for (key in valuesFi) {
        let fi = valuesFi[key];
        accumulated += fi;

        frequencies.push({
            value: key,
            fi: fi,
            percentualFi: `${(100*fi/numberOfValues).toFixed(2)}%`,
            fac: accumulated,
            percentualFac: 100*accumulated/numberOfValues > 99.5 ? `100.00%` : `${(100*accumulated/numberOfValues).toFixed(2)}%`
        });
    }

    return {name: varName, type: varType, data: frequencies}
}