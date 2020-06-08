import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './router/routes.ts';

const app = new Application();

router.use(app);

console.log(`Server listening at http://localhost:8000/`);
app.listen({ port: 8000 });
