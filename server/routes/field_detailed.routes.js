import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { field_detailed_Controller } from '../controllers/field_detailed.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', field_detailed_Controller.getAllField_detailed)
router.post('/', Auth, isAdmin, field_detailed_Controller.createField_detailed)
router.put('/:id', Auth, isAdmin, field_detailed_Controller.updateField_detailed)
router.get('/:id', Auth, isAdmin, field_detailed_Controller.getByIdField_detailed)
router.delete('/:id', Auth, isAdmin, field_detailed_Controller.deleteField_detailed)

export default router
