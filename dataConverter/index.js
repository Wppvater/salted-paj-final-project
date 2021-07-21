const parse = require('csv-parse/lib/sync')
const fs = require('fs');
const {ingredientsDb} = require('../api/src/data-access');

const parseCSV = () => {
  const input = fs.readFileSync('./LivsmedelsDB.csv')
  const records = parse(input, {
    columns: true,
  });
  convertObject(records[0]);
  console.log(records[0]);
  const convertedObjects = records.map(convertObject)
  console.log(convertObject(records[0]));
  console.log(convertedObjects.length);
  console.log(convertedObjects.slice(0,100).length)
  ingredientsDb.addMultiple(convertedObjects.slice(0,100));
  console.log(convertedObjects[0]);
}
const outsideProperties = [
  'name', 'id', 'group', 'energy', 'carbohydrates', 'fat', 'protein'
]
const convertObject = row => {
  const output = {
    microNutrients: [],
  };
  for(const property in row){
    if(outsideProperties.includes(property)){
      output[property] = row[property].toLowerCase();
    }else{
      const microNutrient = {
        name: property.match(/^[\w\s\d:-]+\b/)[0].toLowerCase(),
        amount: Number(row[property]),
      }
      const preUnit = property.match(/\(\w+\)/);
      if(preUnit === null){
        microNutrient.unit = 'micro';
      } else if(preUnit[0] === '(mg)'){
        microNutrient.unit = 'milli';
      } else {
        microNutrient.unit = 'grams';
      }
      output.microNutrients.push(microNutrient);
    }
  }
  output.energy = Number(output.energy);
  output.carbohydrates = Number(output.carbohydrates);
  output.fat = Number(output.fat);
  output.protein = Number(output.protein);
  return output;
}
parseCSV();
