import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { OTPModel } from '../models/opt.model.js'

dotenv.config()

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
})

const defaultFromEmail = process.env.DEFAULT_FROM_EMAIL

const sendOTP = async (operationType, id, email) => {
	const otp = Math.floor(1000 + Math.random() * 9000)

	const mailOptions = {
		from: defaultFromEmail,
		to: email,
		subject: 'Código OTP para acceso',
		text: `Tu código OTP es: ${otp}`,
	}

	const expires = new Date()
	expires.setMinutes(expires.getMinutes() + 10)
	mailOptions.expires = expires

	transporter.sendMail(mailOptions, async (error, info) => {
		if (error) {
			console.log('Error al enviar correo:', error)
		} else {
			console.log('Correo enviado:', info.response)
			console.log('Código OTP:', otp)
			console.log('Válido hasta:', expires)

			try {
				await OTPModel.create({ operation_type: operationType, id_user_fk: id, code: otp })
				console.log('Código OTP almacenado en la base de datos.')
			} catch (err) {
				console.error('Error al almacenar el código OTP en la base de datos:', err)
			}
		}
	})
}

const sendEmailApprovedArticle = async (owner_email, owner_name, articleTitle, status) => {
	return new Promise((resolve, reject) => {
		const subject = status === 'aprobado' ? 'Tu artículo ha sido aprobado' : 'Tu artículo ha sido cambiado a pendiente'
		const html = `
		<div style="max-width: 600px; margin: auto; padding: 20px;">
			<div style="background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
				<img src="https://i.postimg.cc/HnV5N8Vk/Whats-App-Image-2024-06-08-at-20-17-47.jpg" alt="Imagen de saludo" style="width: 50%; margin-bottom: 20px;">
				<h2 style="color: #354e80;">Hola, ${owner_name} 👋</h2>
				<h3 style="color: #333333; font-weight: 500;">Nos complace informarte que tu artículo <strong>${articleTitle}</strong> ha sido revisado y ${
			status === 'aprobado' ? 'aprobado' : 'cambiado a pendiente'
		} con éxito.</h3>
			</div>
		</div>
		`

		const mailOptions = {
			from: defaultFromEmail,
			to: owner_email,
			subject: subject,
			html: html,
		}

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('Error al enviar correo:', error)
				reject(error)
			} else {
				console.log('Correo enviado:', info.response)
				resolve(true)
			}
		})
	})
}

const sendResetPasswordEmail = async (email, token) => {
	const resetLink = `${process.env.CORS_ORIGIN}/#/reset-password/${token}`

	const mailOptions = {
		from: defaultFromEmail,
		to: email,
		subject: 'Restablecer contraseña',
		text: `Utiliza el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
		html: `<p>Utiliza el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">Restablecer contraseña</a></p>`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error al enviar correo:', error)
		} else {
			console.log('Correo enviado:', info.response)
			console.log(resetLink)
		}
	})
}

export { sendOTP, sendEmailApprovedArticle, sendResetPasswordEmail }
