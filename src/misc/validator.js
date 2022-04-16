import str from './strings';
const { validate:v } = str;

const required = ( requirement, value, valueArray ) => {
    if(requirement){ //if required === true
        if(value?.length > 0) {
            return null;
            // if length is greater than 0, return null
        }else{
            // if null or undefined or empty string, return error
            return true;
        }
    }
    // if required === false, return null
    return null;
}

const email = (requirement, value, valueArray) => {
    if(requirement) {
        if(value?.length > 0) {
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return null;
                // if valid email, return null
            }else{
                return true;
                // if not valid email, return error
            }
        }else{
            return true;
            // if null or undefined or empty string, return error
        }
    }
    // if email === false, return null (not required)
    return null;
}

const minLength = (requirement, value, valueArray) => {
    if(requirement) {
        if(value?.length >= requirement) {
            return null;
            // if length is greater than or equal to requirement, return null
        }else{
            return true;
            // if not, return error
        }
    }
    // if minLength === false, return null (no minimum length requirement)
    return null;
}

const maxLength = (requirement, value, valueArray) => {
    if(requirement) {
        if(value?.length <= requirement) {
            return null;
            // if length is less than or equal to requirement, return null
        }else{
            return true;
            // if not, return error
        }
    }
    // if maxLength === false, return null (no maximum length requirement)
    return null;
}

const customValidations = (requirement, value, valueArray) => {
    // requirement is an array of functions.
    const results = [];
    requirement.map(fn=>{
        const result = fn(value, valueArray);
        if(result.error) {
            results.push(result.error);
        }else {
            results.push(null);
        }
    });
    // return one error.
    return results.find(e=>e!==null) || null;
}

const validators = {
    required,
    email,
    minLength,
    maxLength,
    customValidations
};

const handleValidate = (validations, values) => {
    let errors = [];
    for(let field in validations) {
        for(let vType in validations[field]) { //vType = required, minLength, maxLength, errors etc.
            if(vType==='customValidations') {
                let error = validators.customValidations(validations[field][vType], values[field], values);
                console.log({error});
                if(error) {
                    errors.push({
                        field,
                        type: vType,
                        error
                    });
                } else {
                    errors.push({
                        field,
                        type: vType,
                        error: null
                    });
                }
            }else if(vType!=='errors') {
                let validator = validators[vType];
                if(validator) {
                    // pass validation requirement, value, and all values to the validator.
                    let error = validator(validations[field][vType], values[field], values);
                    if(error) {
                        errors.push({
                            field,
                            type: vType,
                            error: v[field][vType]
                        });
                    }else {
                        errors.push({
                            field,
                            type: vType,
                            error: null
                        })
                    }
                }
            } // do nothing if its `errors`.
        }
    }
    // tree shake errors
    errors = errors.filter(e=>e.error!==null);
    return errors;
}

export default handleValidate;