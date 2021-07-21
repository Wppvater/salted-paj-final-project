var express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { root } = require('../src/controllers/')
const { addResolversToSchema } = require('@graphql-tools/schema') ;
const schema = loadSchemaSync('./src/controllers/schema.graphql', {  // load from a single schema file
  loaders: [
      new GraphQLFileLoader()
  ]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: root,
})

var router = express.Router();

/* GET home page. */
router.use('/',graphqlHTTP({
  schema: schemaWithResolvers,
  // rootValue: root,
  graphiql: true,
  }))
router.get('/', function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
