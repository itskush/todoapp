const user = require("../controllers/user.js");
const router = require("express").Router();
router.post("/:username", user.create);
router.put("/:userid", user.update);
router.get("/", user.findUsers);
router.get("/:username", user.findUser);
router.delete("/:userid", user.delete);

module.exports = router;
