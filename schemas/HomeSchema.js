const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
var scraperjs = require("scraperjs");

const seasonType = new GraphQLObjectType({
  name: "SeasonType",
  description: "This represent a season of anime",
  fields: () => ({
    title: { type: GraphQLString },
    status: { type: GraphQLString },
    link: { type: GraphQLString },
    linkId: { type: GraphQLString },
    image: { type: GraphQLString },
    rating: { type: GraphQLString },
    sinopsis: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) },
  }),
});

const latestType = new GraphQLObjectType({
  name: "LatestType",
  description: "This represent a Latest Episode of Anime",
  fields: () => ({
    title: { type: GraphQLString },
    episode: { type: GraphQLString },
    postedBy: { type: GraphQLString },
    release_time: { type: GraphQLString },
    link: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const rootType = new GraphQLObjectType({
  name: "RootType",
  fields: () => ({
    season: { type: new GraphQLList(seasonType) },
    latest: { type: new GraphQLList(latestType) },
  }),
});

const getData = async (parent, { page = 1 }) => {
  var newPage = page == 1 ? "" : `page/${page.toString()}/`;

  return await scraperjs.StaticScraper.create(
    `https://samehadaku.vip/${newPage}`
  ).scrape(async function ($) {
    var obj = {};
    obj.season = $(".animposx")
      .map(function () {
        return {
          title: $(this).find(".data .title").text(),
          status: $(this).find(".data .type").text(),
          link: $(this).find("a").attr("href"),
          linkId: $(this)
            .find("a")
            .attr("href")
            .replace("https://samehadaku.vip/anime/", "")
            .replace("/", ""),
          image: $(this)
            .find("a .content-thumb img")
            .attr("src")
            .replace("quality=80", "quality=100"),
          rating: $(this).find("a .content-thumb .score").text().trim(),
        };
      })
      .get()
      .slice(0, 10);

    await Promise.all(
      obj.season.map(async (e, i) => {
        await scraperjs.StaticScraper.create(e.link).scrape(function ($) {
          e.sinopsis = $(".desc .entry-content-single p")
            .map(function () {
              return $(this).text();
            })
            .get()[0];
          e.genre = $(".genre-info a")
            .map(function () {
              return $(this).text();
            })
            .get();
          return e;
        });
        return true;
      })
    );

    obj.latest = $(".post-show ul li")
      .map(function () {
        return {
          title: $(this).find(".dtla .entry-title a").text(),
          episode: $(this).find(".dtla span:first-of-type author").text(),
          postedBy: $(this).find(".dtla span:nth-of-type(2) author").text(),
          release_time: $(this)
            .find(".dtla span:last-of-type")
            .text()
            .replace(" Released on: ", ""),
          link: $(this).find(".dtla .entry-title a").attr("href"),
          image: $(this)
            .find(".thumb a img")
            .attr("src")
            .replace("quality=80", "quality=100"),
        };
      })
      .get();

    return obj;
  });
};

const rootQuery = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
      data: {
        type: rootType,
        args: { page: { type: GraphQLInt } },
        resolve: getData,
      },
    }),
  }),
});

module.exports = rootQuery;
