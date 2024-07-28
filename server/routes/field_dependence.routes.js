import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { field_dependenceController } from '../controllers/field_dependence.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', field_dependenceController.getAllField_dependence)
router.post('/', Auth, isAdmin, field_dependenceController.createField_dependence)
router.put('/:id', Auth, isAdmin, field_dependenceController.updateField_dependence)
router.get('/:id', Auth, isAdmin, field_dependenceController.getByIdField_dependence)
router.delete('/:id', Auth, isAdmin, field_dependenceController.deleteField_dependence)

export default router
