import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { facultyController } from '../controllers/faculty.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', Auth, isAdmin, facultyController.getAllFaculty)
router.post('/', Auth, isAdmin, facultyController.createFaculty)
router.put('/:id', Auth, isAdmin, facultyController.updateFaculty)
router.get('/:id', Auth, isAdmin, facultyController.getFacultyById)
router.delete('/:id', Auth, isAdmin, facultyController.deleteFaculty)

export default router
