const filiationOptions = [
	{ value: 'si', label: 'Si' },
	{ value: 'no', label: 'No' },
]

const roleOptions = ['admin', 'docente', 'general']

const genderOptions = [
	{ value: 'masculino', label: 'Masculino' },
	{ value: 'femenino', label: 'Femenino' },
]

const dedicationOptions = [
	{ value: 'tiempo completo', label: 'Tiempo completo' },
	{ value: 'medio tiempo', label: 'Medio tiempo' },
]

const employmentRelationshipOptions = [
	{ value: 'Contratado servicios ocasionales', label: 'Contratado servicios ocasionales' },
	{ value: 'Nombramiento permanente', label: 'Nombramiento permanente' },
]

const participationOptions = ['Autor', 'Coautor']

export {
	dedicationOptions,
	filiationOptions,
	genderOptions,
	employmentRelationshipOptions,
	roleOptions,
	participationOptions,
}
