import sirv from "sirv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import sessionFileStore from "session-file-store";
import Gun from "gun";
import * as sapper from "@sapper/server";

const FileStore = sessionFileStore(session);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const app = express();
app.use(
  bodyParser.json(),
  session({
    name: "pokerSession",
    secret: "Ra-:4xJ?89h3!C}5",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 31536000 },
    store: new FileStore({ path: `.sessions` }),
  }),
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  sapper.middleware({ ignore: "gun" })
);
app.use(Gun.serve);
const server = app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});

export const gun = Gun({ file: "data.json", web: server });
