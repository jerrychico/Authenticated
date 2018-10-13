const Joi  = require('joi');

module.exports = {
    validateBody : (schema) => {
        return (req, res, next) => {
            const resultat = Joi.validate(req.body, schema);
            if (resultat.error) {
                return res.status(400).json(resultat.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = resultat.value;
            next();
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}