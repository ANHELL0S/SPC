import { Router } from 'express'
import {
	login,
	register,
	logout,
	verifyToken,
	renewToken,
	updateUser,
	requestOTP,
	validateOTP,
	requestPasswordReset,
	resetPassword,
} from '../controllers/auth.controller.js'

const router = Router()

router.post('/logout', logout)
router.get('/verify', verifyToken)
router.post('/renew-token', renewToken)
router.post('/login', login)
router.post('/register', register)
router.put('/update', updateUser)
router.post('/validate-otp', validateOTP)
router.post('/request-otp', requestOTP)

router.post('/request-password-reset', requestPasswordReset)
router.put('/reset-password/:id', resetPassword)

export default router
