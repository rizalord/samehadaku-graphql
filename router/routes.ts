import HomeSchema from './../schema/home_schema.ts';
import BlogSchema from './../schema/blog_schema.ts';
import BlogReadSchema from "./../schema/blog_read_schema.ts";
import AnimeSchema from "./../schema/anime_schema.ts";
import AnimeEpsSchema from "./../schema/anime_eps_schema.ts";
import SearchSchema from "./../schema/search_schema.ts";
import SeasonSchema from "./../schema/season_schema.ts";
import DateReleaseSchema from "./../schema/date_release_schema.ts";

export default {
    use : function(app : any){
        app.use(HomeSchema.routes(), HomeSchema.allowedMethods())                   // route: /
        app.use(BlogSchema.routes(), BlogSchema.allowedMethods())                   // route: /blog
        app.use(BlogReadSchema.routes(), BlogReadSchema.allowedMethods())           // route: /blog/read
        app.use(AnimeSchema.routes(), AnimeSchema.allowedMethods())                 // route: /anime
        app.use(AnimeEpsSchema.routes(), AnimeEpsSchema.allowedMethods());          // route: /anime/eps
        app.use(SearchSchema.routes(), SearchSchema.allowedMethods());              // route: /search
        app.use(SeasonSchema.routes(), SeasonSchema.allowedMethods());              // route: /season
        app.use(DateReleaseSchema.routes(), DateReleaseSchema.allowedMethods());    // route: /season
    }
}