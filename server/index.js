import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import path from 'path';
import mongooseDbConnect from "./config/database";
import { default as user } from "./route/userRoute";

const app = express();
const port = 4000;

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use('/public', express.static(path.join(process.cwd(), "public")));
app.use(logger("short"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);
mongooseDbConnect();

app.use('/user', user);

app.get('/', (req, res) => res.status(404).send("Not Found"));
app.use('/*', (req, res) => res.status(422).send("Unsupported path entity"));

app.listen(port, () => console.log(`Server started at port ${port}`));