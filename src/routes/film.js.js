const router = require("express").Router();
const MovieCtrl = require("../controllers/movie.controller");

/*
create blog post
*/
router.get("/list/", MovieCtrl.list);



/*
post coment on a movie
*/
router.post("/comment", MovieCtrl.comment);
/*
get all comment
*/

router.get("/get-comment", MovieCtrl.getComment);
/*
fetch characters filter by gender
*/
router.get("gender/:filter_by", MovieCtrl.characterByGender);
/*
fetch characters by  gender || name || height
*/
router.get("/:sort/:filter_by", MovieCtrl.characterSortBy);
module.exports = router
