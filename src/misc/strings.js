const validate = {
    mail: {
        required: 'Email is required',
        email: 'Email is invalid',
    },
    username: {
        required: 'Username is required',
        minLength: 'Username must be at least 3 characters',
        maxLength: 'Username must be at most 20 characters',
    },
    password: {
        required: 'Password is required',
        minLength: 'Password must be at least 8 characters',
        maxLength: 'Password must be at most 300 characters',
    },
    password2: {
        required: 'Repeat the password',
        matchPassword: 'Passwords do not match',
    },
    name: {
        required: 'Duh, you need a name'
    }
}

const requestErrors = { //requests to the StateHouse (server?)
    user_not_found: 'user_not_found',
    wrong_password: 'wrong_password',
}

const str = {
    validate,
    requestErrors,
}

export default str;