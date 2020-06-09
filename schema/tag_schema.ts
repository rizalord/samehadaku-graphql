import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type ResultsType {
    title: String
    view: String
    image: String
    sinopsis: String
    status: String
    link: String
    linkId: String
  }

  type RootType {
    tag: String
    results: [ResultsType]
  }

  type Query {
    getData(tag: String!): RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { tag }: any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/tag/${tag}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/tag",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
