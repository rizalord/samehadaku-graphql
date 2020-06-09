import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type ResultsType {
    title: String
    sub: String
    date: String
    link: String
    linkId: String
    image: String
  }

  type RootType {
    category: String
    results: [ResultsType]
  }

  type Query {
    getData(category: String!, page: Int): RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { page = 1 , category } : any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/blog-category/${category}/${page}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/blog-category",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
