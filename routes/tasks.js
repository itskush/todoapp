const router = require("express").Router();
const taskController = require("../controllers/task");

router.get("/", taskController.get);
router.post("/:userid", taskController.add);
router.put("/:taskid", taskController.updateTask);
router.delete("/:taskid", taskController.delete);
router.put("/task-state/:taskId", taskController.updateTaskState);
router.get("/user-tasks/:userId", taskController.getByUserId);

module.exports = router;
