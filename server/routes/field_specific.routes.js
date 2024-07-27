import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { field_specific_Controller } from '../controllers/field_specific.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', field_specific_Controller.getAllField_specific)
router.post('/', Auth, isAdmin, field_specific_Controller.createField_specific)
router.put('/:id', Auth, isAdmin, field_specific_Controller.updateField_specific)
router.get('/:id', Auth, isAdmin, field_specific_Controller.getByIdField_specific)
router.delete('/:id', Auth, isAdmin, field_specific_Controller.deleteField_specific)

export default router
