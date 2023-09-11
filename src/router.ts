import {Router} from 'express'
import {body, param} from 'express-validator'
import {
  getTasks,
  createTask,
  deleteTask,
  moveTask,
  updateTask,
  getFilterTasks,
} from './handlers/task'
import {getAppUser, getCreatorCard} from './handlers/user'

const router = Router()
// * Task

// GET /api/tasks
router.get('/tasks', getTasks)

router.get(
  '/tasks/:filter',
  param('filter').isIn(['PLANNED', 'DOING', 'COMPLETED']),
  getFilterTasks,
)
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
  body('status').exists().isIn(['PLANNED', 'DOING', 'COMPLETED']),
  moveTask,
)

router.put(
  '/task/:id/edit',
  body('title').exists().isString(),
  body('description').isString(),
  updateTask,
)

// DELETE /api/tasks/:id
router.delete('/tasks/:id', deleteTask)

// * Users

// GET /api/user
router.get('/user', getAppUser)

router.get('/usercard/:id', getCreatorCard)

export default router
