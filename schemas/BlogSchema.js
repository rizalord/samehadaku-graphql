const scraperjs = require("scraperjs");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const getData = async (parent, { page = 1 }) => {
  page = page == 1 ? "" : `page/${page.toString()}/`;

  return await scraperjs.StaticScraper.create(
    `https://samehadaku.vip/${page}`
  ).scrape(function ($) {
    var blog = $(".box-blog")
      .map(function () {
        return {
          title: $(this).find("h2 a").text(),
          sub: $(this).find(".exp p").text(),
          date: $(this).find(".auth i").text(),
          link: $(this).find(".img a").attr("href"),
          linkId: $(this)
            .find(".img a")
            .attr("href")
            .replace("https://samehadaku.vip/blog/", "")
            .replace("/", "")
            .trim(),
          image: $(this).find(".img a img").attr("src"),
        };
      })
      .get();

    return blog;
  });

  
};

const blogType = new GraphQLObjectType({
  name: "BlogType",
  description: "This represent a single blog data (minimal)",
  fields: () => ({
    title: { type: GraphQLString },
    sub: { type: GraphQLString },
    date: { type: GraphQLString },
    link: { type: GraphQLString },
    linkId: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQuery",
    description: "Root Query",
    fields: () => ({
      data: {
        type: new GraphQLList(blogType),
        args: { page: { type: GraphQLInt } },
        resolve: getData
      },
    }),
  }),
});

module.exports = rootQuery;
