import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`

  type ResultsType {
    title: String
    score: String
    view: String
    image: String
    sinopsis: String
    genres: [String]
    status: String
    link: String
    linkId: String
  }

  type RootType {
    title: String
    results: [ResultsType]
  }

  type Query {
    getData : RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData() {
      const url = `https://samehadaku-rest-api.herokuapp.com/season`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/season",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
