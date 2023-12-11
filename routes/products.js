const express = require("express");
const router = express.Router();

const controllers = require("../controllers/products");

router.route("/").get(controllers.getAllTasks).post(controllers.createTask);
router
  .route("/:id")
  .get(controllers.getSingleTask)
  .patch(controllers.updateTask)
  .delete(controllers.deleteTask);

module.exports = router;
