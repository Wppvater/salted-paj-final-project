const getAllCaches = {
  Ingredients: null,
  Recipes: null,
  Schedules: null,
}

const getByIdCaches = {
  Ingredients: {},
  Recipes: {},
  Schedules: {}
}

const readAllCache = (collection) => {
  return getAllCaches[collection];
}
const writeAllCache = (collection, data) => {
  getAllCaches[collection] = data;
}
const readIdCache = (collection, id) => {
  try{
    const cached = getByIdCaches[collection][id];
    if(cached === undefined){
      return null;
    }
    return cached;
  } catch(err){
    return null;
  }
}
const writeIdCache = (collection, id, data) => {
  console.log(collection,id);
  getByIdCaches[collection][id] = data;
}

module.exports = {readAllCache, writeAllCache, readIdCache, writeIdCache};