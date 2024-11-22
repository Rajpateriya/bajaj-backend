import { app } from "./src/app.js";

import { envProvider } from "./src/constants.js";


    app.listen(envProvider.PORT, ()=>{
        console.log(`server is running at port ${envProvider.PORT}`)
    })
