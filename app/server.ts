import express from 'express';

import { LoginController } from './controllers';

const app: express.Application = express();

const port = process.env.PORT || 3000;

app.use('/hfut/login', LoginController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
