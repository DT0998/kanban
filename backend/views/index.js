import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import ejs from "ejs";

const renderViews = (app) => {
  // render pages
  app.set('view engine', 'ejs');
  // This was we can keep everything inside our src folder!!
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // set views directory on the server
  app.set('views', `${__dirname}/pages/index`);
  console.log(__dirname);
  // This is to read css
  app.use(express.static(`${__dirname}/public`));
  app.set('view engine', 'ejs');
  app.get("/", (_req, res) => {
    res.render(path.join(__dirname, "pages", "index"));
  });
};

export { renderViews };
