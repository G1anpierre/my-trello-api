import {Router} from 'express'
import {body} from 'express-validator'
import {getTasks, createTask, deleteTask, moveTask} from './handlers/task'

const router = Router()
// * Task

// GET /api/tasks
router.get('/tasks', getTasks)
// POST /api/tasks
router.post(
  '/task',
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('status').isIn(['PLANNED', 'DOING', 'COMPLETED']),
  createTask,
)
// UPDATE /api/task/:id
router.put(
  '/task/:id',
  body('status').isIn(['PLANNED', 'DOING', 'COMPLETED']),
  moveTask,
)

// DELETE /api/tasks/:id
router.delete('/tasks/:id', deleteTask)

export default router
