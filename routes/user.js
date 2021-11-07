const user = require("../controllers/user.js");
const router = require("express").Router();
router.post("/:username", user.create);
router.put("/:userid", user.update);
router.get("/", user.findUsers);
router.delete("/:userid", user.delete);

module.exports = router;
