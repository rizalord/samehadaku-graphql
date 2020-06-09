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
    getData(page: Int): RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { page = 1 }) {
      const url = `https://samehadaku-rest-api.herokuapp.com/list-anime/${page}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/list-anime",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
