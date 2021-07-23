require('dotenv').config()
const faunadb = require("faunadb");
q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET
});

const makeDbService = ({ collection }) => {
  
  const converter = item => {
    return item.data;
  }
  const addToDatabase = async item => {
    console.log(`Adding multiple data in ${collection} to database`);
    return await client.query( 
      q.Create(
        q.Collection(collection),
        { data: item },
      )
    )
    .then((ret) => converter(ret))
    .catch((err) => console.error('Error: %s', err));
  } 

  const addMultipleToDatabase = async mappedItems => {
    console.log(`Adding multiple data in ${collection} to database`);
    return await client.query(
      q.Map(
        mappedItems, 
      q.Lambda(
        'addedObject', 
        q.Create(
          q.Collection(collection),
          { data: q.Var('addedObject') },
          )
        )
      )
    )
    .then((ret) => ret.data.map(converter))
    .catch((err) => console.error('Error: %s', err));
  }  

  const getByIdsFromDatabase = async ids => {
    console.log(`Fetching ${collection} by id from database`);
    console.log(ids);
    return await client.query(
      q.Map(
        ids,
        q.Lambda(
          'id',
          q.Get(
            q.Match(
              q.Index(`${collection}ID`), q.Var('id'))
          )
        )
      )
    )
  .then((ret) => ret.map(converter))
  .catch((err) => console.error('Error: %s', err))
}

  const getAllFromDatabase = async () => {
  console.log(`Fetching all ${collection} from database`);
  return await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection(`${collection}`)),{size:5000}),
      q.Lambda(x => q.Get(x))
    )
  )
  .then((ret) => ret.data.map(converter))
  .catch((err) => console.error('Error: %s', err))
  }

  return Object.freeze({
    add: item => addToDatabase(item),
    addMultiple: items => addMultipleToDatabase(items),
    getByIds: ids => getByIdsFromDatabase(ids),
    getAll: () => getAllFromDatabase(),
    update: (id, item) => "2",
    delete: id => "2",
  });  
}

module.exports = { makeDbService };
