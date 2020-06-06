const expressGraphQL = require("express-graphql");
const HomeSchema = require("./../schemas/HomeSchema");

const router = {
  use: function (app) {
    app.use("/", expressGraphQL({ graphiql: true , schema: HomeSchema }));
  },
};

module.exports = router;
