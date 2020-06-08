import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type SeasonType {
    title: String
    status: String
    link: String
    linkId: String
    image: String
    rating: String
    sinopsis: String
    genre: [String]
  }

  type LatestType {
    title: String
    episode: String
    postedBy: String
    release_time: String
    link: String
    image: String
  }

  type RootType {
    season: [SeasonType!]!
    latest: [LatestType!]!
  }

  type Query {
    getData(page: Int): RootType
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { page = 1 }) {
      const url = `https://samehadaku-rest-api.herokuapp.com/page/${page}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
