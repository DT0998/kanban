import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import ejs from "ejs";

const router = express();

router.set("view engine", "ejs");

// This was we can keep everything inside our src folder!!
const __dirname = path.dirname(fileURLToPath(import.meta.url));
router.set("views", path.join(__dirname, "pages", "index"));
router.set("view engine", "ejs");
// This is to read csss
router.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "pages", "index"));
});

export default router;
