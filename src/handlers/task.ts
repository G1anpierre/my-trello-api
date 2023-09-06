import prisma from '../db'

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()

    res.json({data: tasks})
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({error: 'GetTasks - Something went wrong by getting tasks'})
  }
}

export const createTask = async (req, res) => {
  try {
    const createdTask = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        userId: req.user.id,
      },
    })

    res.json({data: createdTask})
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({error: 'CreateTask - Something went wrong by creating new task'})
  }
}

export const moveTask = async (req, res) => {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: req.params.id,
      },
      data: {
        status: req.body.status,
      },
    })

    res.json({data: updatedTask})
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({error: 'MoveTask - Something went wrong by moving task'})
  }
}

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    })

    res.json({data: deletedTask})
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({error: 'DeleteTask - Something went wrong by deleting task'})
  }
}
