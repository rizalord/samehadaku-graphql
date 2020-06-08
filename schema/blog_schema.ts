import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type BlogType {
    title: String
    sub: String
    date: String
    link: String
    linkId: String
    image: String
  }

  type Query {
    getData(page: Int): [BlogType!]!
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { page = 1 }) {
      const url = `https://samehadaku-rest-api.herokuapp.com/blog/${page}`;
      return await axiod.get(url).then((res) => res.data.blog);
    },
  },
};

const GraphqlService = await applyGraphQL({
    path: '/blog',
    typeDefs: types,
    resolvers
});

export default GraphqlService;