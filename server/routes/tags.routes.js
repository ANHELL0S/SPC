import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { getAll, getById, create, update, reactive, remove } from '../controllers/tags.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

// CRUD tags - Requires authentication and administrator privileges
router.get('/:id', Auth, isAdmin, getById)
router.get('/', Auth, isAdmin, getAll)
router.post('/create/', Auth, isAdmin, create)
router.put('/update/:id', Auth, isAdmin, update)
router.put('/reactive/:id', Auth, isAdmin, reactive)
router.delete('/remove/:id', Auth, isAdmin, remove)

export default router
