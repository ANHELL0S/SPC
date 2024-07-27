import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import {
	getCount,
	getAll,
	getById,
	create,
	update,
	updateUserWithRole,
	updateUsername,
	updateEmail,
	updatePassword,
	remove,
	reactive,
} from '../controllers/users.controller.js'
import { isAdmin, is_Teacher_General_Admin } from '../middlewares/admin.middleware.js'

const router = Router()

// CRUD users - Requires authentication and administrator privileges
router.get('/getCount', getCount)
router.get('/:id', Auth, is_Teacher_General_Admin, getById)
router.get('/', Auth, isAdmin, getAll)
router.post('/create/', Auth, isAdmin, create)
router.put('/update/:id', Auth, is_Teacher_General_Admin, update)
router.put('/updateUserWithRole/:id', Auth, isAdmin, updateUserWithRole)
router.put('/updateUsername/:id', Auth, is_Teacher_General_Admin, updateUsername)
router.put('/updateEmail/:id', Auth, is_Teacher_General_Admin, updateEmail)
router.put('/updatePassword/:id', Auth, is_Teacher_General_Admin, updatePassword)
router.put('/reactive/:id', Auth, isAdmin, reactive)
router.delete('/remove/:id', Auth, isAdmin, remove)

export default router
