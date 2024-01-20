function fvIsValidFloat(str) {
    if (str === '') {
        return false;
    }

    const number = parseFloat(str);

    if (!isNaN(number) && /^[0-9.-]+$/.test(str)) {
        return true;
    }

    return false;
}

function fvIsValidInt(str) {
    if (str === '') {
        return false;
    }

    let number = parseInt(str, 10);

    if (!isNaN(number) && /^[0-9-]+$/.test(str)) {
        return true;
    }

    return false;
}

function fvIsValidString(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function fvIsValidHttpUrl(str) {
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function fvIsUppercase(str) {
    return /^[A-Z]+$/.test(str);
}

function fvIsLowercase(str) {
    return /^[a-z]+$/.test(str);
}

let fvFeedbacks = (name, value) => ({
    'fv-required': `${name} is required`,
    'fv-min-length': `${name} must be at least ${value} characters long`,
    'fv-max-length': `${name} must be at most ${value} characters long`,
    'fv-min': `${name} must be at least ${value}`,
    'fv-max': `${name} must be at most ${value}`,
    'fv-include': `${name} must include "${value}"`,
    'fv-exclude': `${name} must not include "${value}"`,
    'fv-start': `${name} must start with "${value}"`,
    'fv-no-start': `${name} must not start with "${value}"`,
    'fv-end': `${name} must end with "${value}"`,
    'fv-no-end': `${name} must not end with "${value}"`,
    'fv-upper': `${name} must be uppercase`,
    'fv-lower': `${name} must be lowercase`,
    'fv-trim': `${name} must not contain spaces`,
    'fv-regex': `${name} must match with "${value}"`,
    'fv-int': `${name} must be an integer number`,
    'fv-float': `${name} must be a float number`,
    'fv-string': `${name} must be a text`,
    'fv-email': `${name} must be an email`,
    'fv-url': `${name} must be an url`,
    'fv-http-url': `${name} must be an http url`,
    'fv-ip': `${name} must be an ipv4`,
    'fv-equal': `${name} must be equal to "${value}"`,
})

function fvGetInputFeedback(inputElement) {
    const value = inputElement.value;
    const name = inputElement.getAttribute('fv-display') || inputElement.getAttribute('name') || inputElement.getAttribute('id') || 'input';

    if (inputElement.hasAttribute('fv-to-max-length')) {
        if (value.length > parseInt(inputElement.getAttribute('fv-to-max-length'))) {
            inputElement.value = value.slice(0, parseInt(inputElement.getAttribute('fv-to-max-length')))
        }
    }

    if (inputElement.hasAttribute('fv-to-max')) {
        if (parseInt(value) > parseInt(inputElement.getAttribute('fv-to-max'))) {
            inputElement.value = inputElement.getAttribute('fv-to-max')
        }
    }

    if (inputElement.hasAttribute('fv-to-min')) {
        if (parseInt(value) < parseInt(inputElement.getAttribute('fv-to-min'))) {
            inputElement.value = inputElement.getAttribute('fv-to-min')
        }
    }

    if (inputElement.hasAttribute('fv-to-min-strict')) {
        if (parseInt(value) < parseInt(inputElement.getAttribute('fv-to-min-strict'))) {
            inputElement.value = inputElement.getAttribute('fv-to-min-strict')
        } else if (value === '') {
            inputElement.value = inputElement.getAttribute('fv-to-min-strict')
        }
    }

    if (inputElement.hasAttribute('fv-to-upper')) {
        inputElement.value = inputElement.value.toUpperCase()
    }

    if (inputElement.hasAttribute('fv-to-lower')) {
        inputElement.value = inputElement.value.toLowerCase()
    }

    if (inputElement.hasAttribute('fv-to-trim')) {
        inputElement.value = inputElement.value.trim()
    }

    if (inputElement.hasAttribute('fv-to-prevent')) {
        if (value.includes(inputElement.getAttribute('fv-to-prevent'))) {
            inputElement.value = value.replaceAll(inputElement.getAttribute('fv-to-prevent'), '')
        }
    }

    if (inputElement.hasAttribute('fv-required')) {
        if (!value) {
            return fvFeedbacks(name)['fv-required']
        }
    }

    if (inputElement.hasAttribute('fv-min-length')) {
        if (value.length < parseInt(inputElement.getAttribute('fv-min-length'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-min-length'))['fv-min-length']
        }
    }

    if (inputElement.hasAttribute('fv-max-length')) {
        if (value.length > parseInt(inputElement.getAttribute('fv-max-length'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-max-length'))['fv-max-length']
        }
    }

    if (inputElement.hasAttribute('fv-min')) {
        if ((parseInt(value) < parseInt(inputElement.getAttribute('fv-min')) || !value)) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-min'))['fv-min']
        }
    }

    if (inputElement.hasAttribute('fv-max')) {
        if ((parseInt(value) > parseInt(inputElement.getAttribute('fv-max')) || !value)) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-max'))['fv-max']
        }
    }

    if (inputElement.hasAttribute('fv-include')) {
        if (!value.includes(inputElement.getAttribute('fv-include'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-include'))['fv-include']
        }
    }

    if (inputElement.hasAttribute('fv-exclude')) {
        if (value.includes(inputElement.getAttribute('fv-exclude'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-exclude'))['fv-exclude']
        }
    }

    if (inputElement.hasAttribute('fv-start')) {
        if (!value.startsWith(inputElement.getAttribute('fv-start'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-start'))['fv-start']
        }
    }

    if (inputElement.hasAttribute('fv-no-start')) {
        if (value.startsWith(inputElement.getAttribute('fv-no-start'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-no-start'))['fv-no-start']
        }
    }

    if (inputElement.hasAttribute('fv-end')) {
        if (!value.endsWith(inputElement.getAttribute('fv-end'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-end'))['fv-end']
        }
    }

    if (inputElement.hasAttribute('fv-no-end')) {
        if (value.endsWith(inputElement.getAttribute('fv-no-end'))) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-no-end'))['fv-no-end']
        }
    }

    if (inputElement.hasAttribute('fv-upper')) {
        if (!fvIsUppercase(value)) {
            return fvFeedbacks(name)['fv-upper']
        }
    }

    if (inputElement.hasAttribute('fv-lower')) {
        if (!fvIsLowercase(value)) {
            return fvFeedbacks(name)['fv-lower']
        }
    }

    if (inputElement.hasAttribute('fv-trim')) {
        if (value.includes(' ')) {
            return fvFeedbacks(name)['fv-trim']
        }
    }

    if (inputElement.hasAttribute('fv-regex')) {
        if (!new RegExp(inputElement.getAttribute('fv-regex')).test(value)) {
            return fvFeedbacks(name, inputElement.getAttribute('fv-regex'))['fv-regex']
        }
    }

    if (inputElement.hasAttribute('fv-int')) {
        if (!fvIsValidInt(value)) {
            return fvFeedbacks(name)['fv-int']
        }
    }

    if (inputElement.hasAttribute('fv-float')) {
        if (!fvIsValidFloat(value)) {
            return fvFeedbacks(name)['fv-float']
        }
    }

    if (inputElement.hasAttribute('fv-string')) {
        if (!fvIsValidString(value)) {
            return fvFeedbacks(name)['fv-string']
        }
    }

    if (inputElement.hasAttribute('fv-email')) {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return fvFeedbacks(name)['fv-email']
        }
    }

    if (inputElement.hasAttribute('fv-url')) {
        if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)) {
            return fvFeedbacks(name)['fv-url']
        }
    }

    if (inputElement.hasAttribute('fv-http-url')) {
        if (!fvIsValidHttpUrl(value)) {
            return fvFeedbacks(name)['fv-http-url']
        }
    }

    if (inputElement.hasAttribute('fv-ip')) {
        if (!/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
            return fvFeedbacks(name)['fv-ip']
        }
    }

    if (inputElement.hasAttribute('fv-equal')) {
        const formElement = inputElement.closest('form');
        if (formElement) {

            const targetInputElement = formElement.querySelector(inputElement.getAttribute('fv-equal'));
            if (targetInputElement) {

                const targetInputName = targetInputElement.getAttribute('fv-display') || targetInputElement.getAttribute('name') || targetInputElement.getAttribute('id') || 'input';

                targetInputElement.addEventListener('input', () => {
                    fvProcessInput(inputElement)
                })

                if (targetInputElement.value !== value) {
                    return fvFeedbacks(name, targetInputName)['fv-equal']
                }
            }
        }
    }

    return null
}

function fvProcessInput(inputElement) {
    inputElement.fvInputLoaded = true

    const name = inputElement.getAttribute('name')

    let feedbackElement = null

    if (name) {
        const formElement = inputElement.closest('form')
        if (formElement) feedbackElement = formElement.querySelector(`[fv-for="${name}"]`)
        if (!feedbackElement) feedbackElement = inputElement.panrentNode.querySelector(`[fv-for="${name}"]`)
        if (!feedbackElement) feedbackElement = document.querySelector(`[fv-for="${name}"]`)
    }

    const inputFeedback = fvGetInputFeedback(inputElement)

    if (feedbackElement) {
        if (inputElement.hasAttribute('fv-used')) feedbackElement.innerText = inputFeedback
        feedbackElement.setAttribute('fv-for-feedback', inputFeedback ? 'true' : 'false')
    }

    inputElement.setAttribute('fv-valid', !inputFeedback ? 'true' : 'false')

    if (inputFeedback) inputElement.setAttribute('fv-input-feedback', inputFeedback)
    else inputElement.removeAttribute('fv-input-feedback')
}

function fvCheckIsFormValid(formElement) {
    const invalidInputs = formElement.querySelectorAll('[fv-valid="false"]');

    return invalidInputs.length === 0
}

function fvGetFormFeedback(formElement) {
    const invalidInputs = formElement.querySelectorAll('[fv-valid="false"][fv-used][fv-input-feedback]');

    if (invalidInputs.length === 0) return null

    return invalidInputs[invalidInputs.length - 1].getAttribute('fv-input-feedback')
}

function fvProcessForm(formElement) {
    const formValid = fvCheckIsFormValid(formElement)

    const disableSubmit = formElement.getAttribute('fv-disable-submit') === 'false' ? false : true
    if (disableSubmit) fvDisableSubmit(formElement, !formValid)

    const formFeedbackElement = formElement.querySelector('[fv-form-feedback]')

    const formFeedback = fvGetFormFeedback(formElement)

    if (formFeedbackElement) {
        formFeedbackElement.innerText = formFeedback
        formFeedbackElement.setAttribute('fv-form-feedback', !formFeedback ? 'false' : 'true')
    }

    return formValid
}

function fvAddInputListeners(inputElement, formElement = null) {
    if (inputElement.fvListened) return
    inputElement.fvListened = true

    if (!formElement) formElement = inputElement.closest('form')

    const inputListenerEvents = ['input', 'change', 'keyup', 'paste', 'cut'];

    inputListenerEvents.forEach(eventName => {
        inputElement.addEventListener(eventName, () => {
            inputElement.setAttribute('fv-used', '')

            fvProcessInput(inputElement)

            if (formElement) fvProcessForm(formElement)
        })
    })
}

function fvAddFormInputsListeners(formElement) {
    const inputElements = formElement.querySelectorAll('input')

    inputElements.forEach(inputElement => {
        fvAddInputListeners(inputElement, formElement)
    })
}

function fvDisableSubmit(formElement, disabled = true) {
    let submitButton = formElement.querySelector('[fv-submit]');
    if (!submitButton) submitButton = formElement.querySelector('[type="submit"]')

    if (submitButton) submitButton.disabled = disabled
}

function fvLoadForm(formElement) {
    if (formElement.fvFormLoaded) return
    formElement.fvFormLoaded = true

    const inputElements = formElement.querySelectorAll('input');
    inputElements.forEach(fvProcessInput)

    const disableSubmit = formElement.getAttribute('fv-disable-submit') === 'false' ? false : true

    const formValid = fvCheckIsFormValid(formElement)
    if (disableSubmit && !formValid) fvDisableSubmit(formElement)

    const preventDefault = formElement.getAttribute('fv-prevent-default') === 'true' ? true : false

    if (preventDefault) formElement.addEventListener('submit', event => {
        inputElements.forEach(inputElement => {
            inputElement.setAttribute('fv-used', '')

            fvProcessInput(inputElement)
        })

        const formValid = fvProcessForm(formElement)

        if (!formValid) event.preventDefault()
    })

    fvAddFormInputsListeners(formElement)
}

function fvLoadInput(inputElement) {
    if (inputElement.fvInputLoaded) return
    inputElement.fvInputLoaded = true

    const formElement = inputElement.closest('form');

    if (formElement) {
        fvLoadForm(formElement)
        return
    }

    fvProcessInput(inputElement)

    fvAddInputListeners(inputElement)
}

const fvFormElements = document.querySelectorAll('[fv-form]');
fvFormElements.forEach(fvLoadForm)

const fvInputElements = document.querySelectorAll('[fv-input]');
fvInputElements.forEach(fvLoadInput)