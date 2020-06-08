import HomeSchema from './../schema/home_schema.ts';
import BlogSchema from './../schema/blog_schema.ts';

export default {
    use : function(app : any){
        app.use(HomeSchema.routes(), HomeSchema.allowedMethods()) // route: /
        app.use(BlogSchema.routes(), BlogSchema.allowedMethods()) // route: /blog
    }
}