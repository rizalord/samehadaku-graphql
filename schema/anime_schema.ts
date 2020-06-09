import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`
  type GenreType {
    text: String
    link: String
  }

  type DetailType {
    Japanese: String
    Type: String
    Duration: String
    Season: String
    Producers: String
    Status: String
    Source: String
    TotalEpisode: String
    Studio: String
    Rilis: String
  }

  type EpisodeType {
    episode: String
    title: String
    date_uploaded: String
    link: String
    id: String
  }

  type YoutubeType {
    link: String
    id: String
  }

  type RecommendType {
    link: String
    image: String
    title: String
    genre: [String]
  }

  type LatestType {
    title: String
    image: String
    episode: String
    postedBy: String
    release_time: String
    link: String
    genre: [String]
  }

  type ReadType {
    title: String
    sinopsis: String
    image: String
    genre: [GenreType!]!
    ratingValue: String
    ratingCount: String
    detail: DetailType
    youtube: YoutubeType
    list_episode: [EpisodeType]
    recommend: [RecommendType]
    latest: [LatestType]
  }

  type Query {
    getData(id: String): ReadType!
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { id }: any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/anime/${id}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/anime",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
