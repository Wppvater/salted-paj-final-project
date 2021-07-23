const { makeDbService } = require('./generalDb');
const dbTestService = makeDbService({collection: 'Test'});
const ingredientsDb = makeDbService({collection: 'Ingredients'})
const recipesDb = makeDbService({collection: 'Recipes'})
const schedulesDb = makeDbService({collection: 'Schedules'})

// const waitForIt = async () => {
//   const start = Date.now();
//   const result = await dbTestService.getByIds([1,2,3,4,5]);
//   console.log(result)
//   console.log(start, ' end: ', Date.now());
// }
// const waitForIt = async () => {
//   const start = Date.now();
//   const result = await ingredientsDb.getAll();
//   console.log(result.length);
//   console.log(start, ' end: ', Date.now());
// }

// waitForIt();

module.exports = { ingredientsDb, recipesDb, schedulesDb };
