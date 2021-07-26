module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "client",
  },
  plugins: ["gatsby-plugin-sass", 
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "SaltedPAJ",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "saltedpaj",
        // Url to query from
        url: "http://localhost:3000/api/",
        
      },
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'http://localhost:3000/api/'
      }
    }
  ],
    // Simple config, passing URL
    
};
