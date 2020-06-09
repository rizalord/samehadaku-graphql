import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type ContentType {
    text: String
    img: String 
  }

  type TagType {
      title: String
      link: String
      active: Boolean
  }

  type ReadType {
    title: String
    author: String
    date_created: String
    image_cover: String
    image_content: String
    content: [ContentType]
    tags: [TagType]
  }

  type Query {
    getData(id: String): ReadType!
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { id }: any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/blog/read/${id}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/blog/read",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
