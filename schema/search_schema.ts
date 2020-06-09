import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`

  type ResultType {
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

  type Query {
    getData(title: String!, page: Int): [ResultType]!
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { title , page = 1}: any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/search/${title}/${page}`;
      return await axiod.get(url).then((res) => res.data.results);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/search",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
