const expressGraphQL = require("express-graphql");
const HomeSchema = require("./../schemas/HomeSchema");
const BlogSchema = require("./../schemas/BlogSchema");

const router = {
  use: function (app) {
    app.use("/blog", expressGraphQL({ graphiql: true, schema: BlogSchema }));
    app.use("/", expressGraphQL({ graphiql: true , schema: HomeSchema }));
  },
};

module.exports = router;
