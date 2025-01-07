import Joi from 'joi';

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

export const validateCreateProduct = (productData: any) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Name should be string',
            'any.required': 'Name is required',
        }),
        price: Joi.number().required().messages({
            'number.base': 'Price should be number',
            'any.required': 'Price is required',
        }),
        condition: Joi.string().required().messages({
            'string.base': 'Condition should be string',
            'any.required': 'Condition is required',
        }),
        status: Joi.string().required().messages({
            'string.base': 'Status should be string',
            'any.required': 'Status is required',
        }),
        stock: Joi.number().required().messages({
            'number.base': 'Stock should be number',
            'any.required': 'Stock is required',
        }),
    });

    return schema.validate(productData, options);
};
