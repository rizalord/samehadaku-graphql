import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const types = gql`

  type DetailType {
    title: String
    image: String
    sinopsis: String
    genres : [String]
  } 

  type LinkType {
      zippyshare: String
      gdrive: String
      reupload: String
  }

  type QualityType {
      quality: String
      link: LinkType
  }

  type DownloadType {
      format: String
      data: [QualityType]
  }

  type RecommendType {
    link: String
    image: String
    title: String
  }

  type ReadType {
    title: String
    eps: String
    uploader: String
    date_uploaded: String
    detail_anime: DetailType
    downloadEps: [DownloadType]
    recommend: [RecommendType]
  }

  type Query {
    getData(id: String): ReadType!
  }
`;

const resolvers = {
  Query: {
    getData: async function getRootData(parent: any, { id }: any) {
      const url = `https://samehadaku-rest-api.herokuapp.com/anime/eps/${id}`;
      return await axiod.get(url).then((res) => res.data);
    },
  },
};

const GraphqlService = await applyGraphQL({
  path: "/anime/eps",
  typeDefs: types,
  resolvers,
});

export default GraphqlService;
