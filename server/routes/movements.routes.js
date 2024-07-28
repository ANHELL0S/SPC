import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { getById, getAll } from '../controllers/movements.controller.js'
import { isAdmin, is_Teacher_General_Admin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/:id', Auth, is_Teacher_General_Admin, getById)
router.get('/', Auth, isAdmin, getAll)

export default router
