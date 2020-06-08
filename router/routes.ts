import HomeSchema from './../schema/home_schema.ts';
import BlogSchema from './../schema/blog_schema.ts';
import BlogReadSchema from "./../schema/blog_read_schema.ts";

export default {
    use : function(app : any){
        app.use(HomeSchema.routes(), HomeSchema.allowedMethods()) // route: /
        app.use(BlogSchema.routes(), BlogSchema.allowedMethods()) // route: /blog
        app.use(BlogReadSchema.routes(), BlogReadSchema.allowedMethods()) // route: /blog/read
    }
}