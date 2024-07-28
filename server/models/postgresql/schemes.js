import { DataTypes } from 'sequelize'
import sequelize from '../../config/sequelize.js'

/* ------------------------------- TABLE USER -----------------------------*/
export const userScheme = sequelize.define('usuarios', {
	id_user: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	identification_card: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},
	filiation: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dedication: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	employmentRelationship: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE ROLES -----------------------------*/
export const rolScheme = sequelize.define(
	'roles',
	{
		id_rol: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		type_rol: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'docente',
			validate: {
				isIn: [['admin', 'docente', 'general']],
			},
		},
		id_user_fk: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: userScheme,
				key: 'id_user',
			},
		},
	},
	{
		timestamps: false,
	}
)

rolScheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

userScheme.hasOne(rolScheme, {
	foreignKey: 'id_user_fk',
	sourceKey: 'id_user',
})

/* ------------------------------- TABLE FACULTY -----------------------------*/

export const facultyScheme = sequelize.define('faculty', {
	id_faculty: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE DB INDEX -----------------------------*/

export const dbIndexScheme = sequelize.define('db_index', {
	id_db_index: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE RELACTION USER-FACULTY -----------------------------*/

export const relaction_user_facultyScheme = sequelize.define(
	'relaction_user_faculty',
	{
		id_relactionUserFaculty: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		id_user_fk: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		id_faculty_fk: {
			type: DataTypes.UUID,
			allowNull: true,
		},
	},
	{
		timestamps: false,
	}
)

// Define associations
userScheme.hasMany(relaction_user_facultyScheme, {
	foreignKey: 'id_user_fk',
})

relaction_user_facultyScheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

relaction_user_facultyScheme.belongsTo(facultyScheme, {
	foreignKey: 'id_faculty_fk',
	targetKey: 'id_faculty',
})

/* ------------------------------- TABLE FACULTY -----------------------------*/

export const lineResearchScheme = sequelize.define('line_research', {
	id_line_research: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE CAREER -----------------------------*/

export const career_Scheme = sequelize.define('career', {
	id_career: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE WIDE FIELD -----------------------------*/

export const field_wide_Scheme = sequelize.define('field_wide', {
	id_field_wide: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE SPECIFIC FIELD -----------------------------*/

export const field_specific_Scheme = sequelize.define('field_specific', {
	id_field_specific: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE DETAILED FIELD -----------------------------*/

export const field_detailed_Scheme = sequelize.define('field_detailed', {
	id_field_detailed: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE DEPENDENCE -----------------------------*/

export const field_dependence_Scheme = sequelize.define('field_dependence', {
	id_field_dependence: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE MAGAZINE -----------------------------*/

export const magazineScheme = sequelize.define('magazine', {
	id_magazine: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

/* ------------------------------- TABLE CATEGORY -----------------------------*/

export const categoryScheme = sequelize.define('categories', {
	id_category: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},

	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
})

/* ------------------------------- TABLE PARAMETER -----------------------------*/

export const parameter_global_Scheme = sequelize.define('parameter', {
	id_parameter: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
})

parameter_global_Scheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

/* ------------------------------- TABLE TAG -----------------------------*/

export const tagScheme = sequelize.define('tags', {
	id_tag: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
})

/* ------------------------------- TABLE CONFIG -----------------------------*/

export const configScheme = sequelize.define('config', {
	id_config: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	name_institution: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},

	abbreviation: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},

	slogan: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},

	link_fb: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},

	link_ig: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},

	link_x: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},

	link_yt: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},
})

/* ------------------------------- TABLE LOGS -----------------------------*/

export const movementScheme = sequelize.define('movements', {
	id_movement: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	action: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	targetType: {
		type: DataTypes.ENUM(
			'usuarios',
			'categorias',
			'etiquetas',
			'formatos',
			'articulos',
			'parametros',
			'comentarios',
			'colleciones'
		),
		allowNull: false,
	},

	targetId: {
		type: DataTypes.UUID,
		allowNull: false,
	},

	id_user_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},
})

movementScheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

/* ------------------------------- TABLE TEMPLATE -----------------------------*/

export const templateScheme = sequelize.define('template', {
	id_template: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_category_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: categoryScheme,
			key: 'id_category',
		},
	},

	id_user_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},
})

templateScheme.belongsTo(categoryScheme, {
	foreignKey: 'id_category_fk',
	targetKey: 'id_category',
})

templateScheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

/* ------------------------------- TABLE RELATIONS TAG-TEMPLATE -----------------------------*/

export const relation_tag_template_Scheme = sequelize.define(
	'relation_tag_template',
	{
		id_relation_tag_template: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		id_template_fk: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: templateScheme,
				key: 'id_template',
			},
		},
		id_tag_fk: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: tagScheme,
				key: 'id_tag',
			},
		},
	},
	{
		timestamps: false,
	}
)

relation_tag_template_Scheme.belongsTo(templateScheme, {
	foreignKey: 'id_template_fk',
	targetKey: 'id_template',
	onDelete: 'CASCADE',
})

relation_tag_template_Scheme.belongsTo(tagScheme, {
	foreignKey: 'id_tag_fk',
	targetKey: 'id_tag',
	onDelete: 'CASCADE',
})

/* ------------------------------- TABLE ARTICLE -----------------------------*/

export const articleScheme = sequelize.define('article', {
	id_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_template_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: templateScheme,
			key: 'id_template',
		},
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pendiente',
		validate: {
			isIn: [['pendiente', 'aprobado']],
		},
	},
	manager: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},
	id_category_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: categoryScheme,
			key: 'id_category',
		},
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	participation: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	summary: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
})

articleScheme.belongsTo(templateScheme, {
	foreignKey: 'id_template_fk',
	targetKey: 'id_template',
})

articleScheme.belongsTo(userScheme, {
	foreignKey: 'manager',
	targetKey: 'id_user',
})

articleScheme.belongsTo(categoryScheme, {
	foreignKey: 'id_category_fk',
	targetKey: 'id_category',
})

/* ------------------------------- TABLE ARTICLE - VIEW COUNT -----------------------------*/

export const articleView = sequelize.define(
	'article_view',
	{
		id_view: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		id_article_fk: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: articleScheme,
				key: 'id_article',
			},
		},
		user_ip: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_agent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		view_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: false,
	}
)

articleView.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
	onDelete: 'CASCADE',
})

/* ------------------------------- TABLE RELATIONS BD INDEX - ARTICLE -----------------------------*/

export const relation_db_index_article_Scheme = sequelize.define('relation_db_index_article', {
	id_relation_db_index_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},

	id_db_index_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: dbIndexScheme,
			key: 'id_db_index',
		},
	},

	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_db_index_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_db_index_article_Scheme.belongsTo(dbIndexScheme, {
	foreignKey: 'id_db_index_fk',
	targetKey: 'id_db_index',
})

/* ------------------------------- TABLE RELATION LINE RESEARCH - ARTICLE -----------------------------*/

export const relation_line_research_article_Scheme = sequelize.define('relation_line_research_article', {
	id_relation_line_research_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},

	id_line_research_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: lineResearchScheme,
			key: 'id_line_research',
		},
	},

	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_line_research_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_line_research_article_Scheme.belongsTo(lineResearchScheme, {
	foreignKey: 'id_line_research_fk',
	targetKey: 'id_line_research',
})

/* ------------------------------- TABLE RELATION MAGAZINE - ARTICLE -----------------------------*/

export const relation_magazine_article_Scheme = sequelize.define('relation_magazine_article', {
	id_relation_magazine_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},

	id_magazine_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: magazineScheme,
			key: 'id_magazine',
		},
	},

	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_magazine_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_magazine_article_Scheme.belongsTo(magazineScheme, {
	foreignKey: 'id_magazine_fk',
	targetKey: 'id_magazine',
})

/* ------------------------------- TABLE RELATIONS FIELD DEPENDENCE- ARTICLE -----------------------------*/

export const relation_field_dependence_article_Scheme = sequelize.define('relation_field_dependence_article', {
	id_relation_field_dependence: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_field_dependence_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: field_dependence_Scheme,
			key: 'id_field_dependence',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_field_dependence_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_field_dependence_article_Scheme.belongsTo(field_dependence_Scheme, {
	foreignKey: 'id_field_dependence_fk',
	targetKey: 'id_field_dependence',
})

/* ------------------------------- TABLE RELATIONS FIELD DETAILS- ARTICLE -----------------------------*/

export const relation_field_details_article_Scheme = sequelize.define('relation_field_details_article', {
	id_relation_field_details: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_field_detailed_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: field_detailed_Scheme,
			key: 'id_field_detailed',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_field_details_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_field_details_article_Scheme.belongsTo(field_detailed_Scheme, {
	foreignKey: 'id_field_detailed_fk',
	targetKey: 'id_field_detailed',
})

/* ------------------------------- TABLE RELATIONS FIELD SPECIFIC- ARTICLE -----------------------------*/

export const relation_field_specific_article_Scheme = sequelize.define('relation_field_specific_article', {
	id_relation_field_specific: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_field_specific_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: field_specific_Scheme,
			key: 'id_field_specific',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_field_specific_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_field_specific_article_Scheme.belongsTo(field_specific_Scheme, {
	foreignKey: 'id_field_specific_fk',
	targetKey: 'id_field_specific',
})

/* ------------------------------- TABLE RELATIONS FIELD WIDE- ARTICLE -----------------------------*/

export const relation_field_wide_article_Scheme = sequelize.define('relation_field_wide_article', {
	id_relation_field_wide: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_field_wide_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: field_wide_Scheme,
			key: 'id_field_wide',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_field_specific_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_field_specific_article_Scheme.belongsTo(field_wide_Scheme, {
	foreignKey: 'id_field_wide_fk',
	targetKey: 'id_field_wide',
})

/* ------------------------------- TABLE RELATIONS PARAMETER-ARTICLE -----------------------------*/

export const relation_parameter_article_Scheme = sequelize.define('relation_parameter_article', {
	id_relation_parameter_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_parameter_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: parameter_global_Scheme,
			key: 'id_parameter',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
})

relation_parameter_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_parameter_article_Scheme.belongsTo(parameter_global_Scheme, {
	foreignKey: 'id_parameter_fk',
	targetKey: 'id_parameter',
})

/* ------------------------------- TABLE RELATIONS TAG-ARTICLE -----------------------------*/

export const relation_tag_article_Scheme = sequelize.define('relation_tag_article', {
	id_relation_tag_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_tag_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: tagScheme,
			key: 'id_tag',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
})

relation_tag_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_tag_article_Scheme.belongsTo(tagScheme, {
	foreignKey: 'id_tag_fk',
	targetKey: 'id_tag',
})

/* ------------------------------- TABLE RELATIONS CAREER - ARTICLE -----------------------------*/

export const relation_career_article_Scheme = sequelize.define('relation_career_article', {
	id_relation_career: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
	id_career_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: career_Scheme,
			key: 'id_career',
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

relation_career_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

relation_career_article_Scheme.belongsTo(career_Scheme, {
	foreignKey: 'id_career_fk',
	targetKey: 'id_career',
})

/* ------------------------------- TABLE REVIEWS -----------------------------*/

export const review_Scheme = sequelize.define('review', {
	id_review: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},

	manager: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},

	task: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pendiente',
		validate: {
			isIn: [['pendiente', 'aprobado']],
		},
	},
})

review_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

review_Scheme.belongsTo(userScheme, {
	foreignKey: 'manager',
	targetKey: 'id_user',
})

/* ------------------------------- TABLE COMMENT -----------------------------*/

export const comments_Scheme = sequelize.define('comment', {
	id_comment: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	comment: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	id_user_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
})

comments_Scheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

comments_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

/* ------------------------------- TABLE COLLECTION ARTICLE -----------------------------*/

export const collection_article_Scheme = sequelize.define('collection_article', {
	id_collection_article: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	id_user_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},

	id_article_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: articleScheme,
			key: 'id_article',
		},
	},
})

collection_article_Scheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})

collection_article_Scheme.belongsTo(articleScheme, {
	foreignKey: 'id_article_fk',
	targetKey: 'id_article',
})

/* ------------------------------- TABLE CODE OPT -----------------------------*/

export const otpCodeScheme = sequelize.define('optCode', {
	id_code: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	operation_type: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'login',
		validate: {
			isIn: [['login', 'update']],
		},
	},

	code: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	id_user_fk: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: userScheme,
			key: 'id_user',
		},
	},
})

otpCodeScheme.belongsTo(userScheme, {
	foreignKey: 'id_user_fk',
	targetKey: 'id_user',
})
