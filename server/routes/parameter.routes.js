import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { getAll, create, update, remove, reactive } from '../controllers/parameter.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

// CRUD tags - Requires authentication
router.get('/', Auth, isAdmin, getAll)
router.post('/create/', Auth, isAdmin, create)
router.put('/update/:id', Auth, isAdmin, update)
router.delete('/remove/:id', Auth, isAdmin, remove)
router.put('/reactive/:id', Auth, isAdmin, reactive)

export default router
