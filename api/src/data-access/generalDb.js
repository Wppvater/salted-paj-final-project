require('dotenv').config()
const faunadb = require("faunadb");
q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnAEOonJQ9ACDG_le2ecoe9Cq01-mXlJ2vq4WMCe"
});

const makeDbService = ({ collection }) => {
  
  const converter = item => {
    return item.data;
  }
  const addToDatabase = async item => {
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
  .then((ret) => ret.data.map(converter))
  .catch((err) => console.error('Error: %s', err))
}

  const getAllFromDatabase = async () => {
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
