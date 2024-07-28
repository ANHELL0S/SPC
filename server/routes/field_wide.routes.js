import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { field_wide_Controller } from '../controllers/field_wide.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', field_wide_Controller.getAllField_wide)
router.post('/', Auth, isAdmin, field_wide_Controller.createField_wide)
router.put('/:id', Auth, isAdmin, field_wide_Controller.updateField_wide)
router.get('/:id', Auth, isAdmin, field_wide_Controller.getByIdField_wide)
router.delete('/:id', Auth, isAdmin, field_wide_Controller.deleteField_wide)

export default router
