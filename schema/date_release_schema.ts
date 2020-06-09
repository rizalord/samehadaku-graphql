import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type DateType {
    title: String
    image: String
    score: String
    genres: [String]
    link: String
    linkId: String
  }

  type ResultType {
    day: String
    list: [DateType]
  }

  type RootType {
    title: String
    results: [ResultType]
  }

  type Query {
    getData: RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData() {
      const url = `https://samehadaku-rest-api.herokuapp.com/date-release`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/date-release",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
