function fvDataURLtoBlob(dataURL) {
    let arr = dataURL.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

const fvIsValidPasswordDefaultOptions = {
    length: 8,
    uppercase: true,
    lowercase: true,
    digits: true,
    specialChars: true
}

function fvGetAspectRatio(width, height) {
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    const mcd = gcd(width, height);

    const aspectRatioWidth = width / mcd;
    const aspectRatioHeight = height / mcd;

    const aspectRatio = aspectRatioWidth + ":" + aspectRatioHeight;

    return aspectRatio
}

function fvIsValidPassword(password, options = {length: 8, uppercase: true, lowercase: true, digits: true, specialChars: true}) {
    options = {
        ...fvIsValidPasswordDefaultOptions,
        ...options
    }

    if (options.lowercase && !/[a-z]/.test(password)) {
        return {
            valid: false,
            message: "must contain at least one lowercase letter",
        }
    }

    if (options.uppercase && !/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: "must contain at least one uppercase letter",
        }
    }

    if (options.digits && !/\d/.test(password)) {
        return {
            valid: false,
            message: "must contain at least one digit",
        }
    }

    if (options.specialChars && !/[^A-Za-z0-9]/.test(password)) {
        return {
            valid: false,
            message: "must contain at least one special character"
        };
    }

    if (password.length < options.length) {
        return {
            valid: false,
            message: `must be at least ${options.length} characters long`
        }
    }

    return {
        valid: true
    }
}

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

function fvGetImageDimensions(inputElement, image) {
    let height = image.height;
    let width = image.width;

    if (inputElement.hasAttribute('fv-image-to-width')) {
        width = parseInt(inputElement.getAttribute('fv-image-to-width'));
    }

    if (inputElement.hasAttribute('fv-image-to-height')) {
        height = parseInt(inputElement.getAttribute('fv-image-to-height'));
    }

    if (inputElement.hasAttribute('fv-image-to-min-width')) {
        const minWidth = parseInt(inputElement.getAttribute('fv-image-to-min-width'));
        if (width < minWidth) {
            width = minWidth;
        }
    }

    if (inputElement.hasAttribute('fv-image-to-max-width')) {
        const maxWidth = parseInt(inputElement.getAttribute('fv-image-to-max-width'));
        if (width > maxWidth) {
            width = maxWidth;
        }
    }

    if (inputElement.hasAttribute('fv-image-to-min-height')) {
        const minHeight = parseInt(inputElement.getAttribute('fv-image-to-min-height'));
        if (height < minHeight) {
            height = minHeight;
        }
    }

    if (inputElement.hasAttribute('fv-image-to-max-height')) {
        const maxHeight = parseInt(inputElement.getAttribute('fv-image-to-max-height'));
        if (height > maxHeight) {
            height = maxHeight;
        }
    }

    return { width, height };
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
    'fv-image': `${name} must be an image`,
    'fv-audio': `${name} must be an audio`,
    'fv-video': `${name} must be an video`,
    'fv-min-size': `${name} must be at least ${value} bytes`,
    'fv-max-size': `${name} must be less than ${value} bytes`,
    'fv-file-include': `${name} must include "${value}"`,
    'fv-file-exclude': `${name} must not include "${value}"`,
    'fv-file-start': `${name} must start with "${value}"`,
    'fv-file-no-start': `${name} must not start with "${value}"`,
    'fv-file-end': `${name} must be "${value}"`,
    'fv-file-no-end': `${name} must not be "${value}"`,
    'fv-files': `${name} must be ${value} files`,
    'fv-min-files': `${name} must be at least ${value} files`,
    'fv-max-files': `${name} must be less than ${value} files`,
    'fv-image-min-width': `${name} width must be at least ${value}px`,
    'fv-image-max-width': `${name} width must be less than ${value}px`,
    'fv-image-min-height': `${name} height must be at least ${value}px`,
    'fv-image-max-height': `${name} htight must be less than ${value}px`,
    'fv-image-aspect-ratio': `${name} must have aspect ratio ${value}`,
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

    if (inputElement.hasAttribute('fv-to-prevents')) {
        const prevents = inputElement.getAttribute('fv-to-prevents').split(',');
        for (const prevent of prevents) {
            if (value.includes(prevent)) {
                inputElement.value = value.replaceAll(prevent, '')
            }
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

    if (inputElement.hasAttribute('fv-password')) {
        const options = {}

        if (inputElement.hasAttribute('fv-password-length')) {
            options.length = parseInt(inputElement.getAttribute('fv-password-length'))
        }

        if (inputElement.hasAttribute('fv-password-lowercase')) {
            const lowercase = inputElement.getAttribute('fv-password-lowercase')
            options.lowercase = lowercase == 'true' ? true : (lowercase == 'false' ? false : true)
        }

        if (inputElement.hasAttribute('fv-password-uppercase')) {
            const uppercase = inputElement.getAttribute('fv-password-uppercase')
            options.uppercase = uppercase == 'true' ? true : (uppercase == 'false' ? false : true)
        }

        if (inputElement.hasAttribute('fv-password-digits')) {
            const digits = inputElement.getAttribute('fv-password-digits')
            options.digits = digits == 'true' ? true : (digits == 'false' ? false : true)
        }

        if (inputElement.hasAttribute('fv-password-special-chars')) {
            const specialChars = inputElement.getAttribute('fv-password-special-chars')
            options.specialChars = specialChars == 'true' ? true : (specialChars == 'false' ? false : true)
        }

        const passwordValidation = fvIsValidPassword(value, options);

        if (!passwordValidation.valid) {
            const message = passwordValidation.message
            return `${name} ${message}`
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

    if (inputElement.hasAttribute('fv-image') && inputElement.files) {
        if (!inputElement.hasAttribute('accept')) {
            inputElement.setAttribute('accept', 'image/*')
        }

        for (const file of inputElement.files) {
            if (!file.type.startsWith('image/')) {
                return fvFeedbacks(name)['fv-image']
            }
        }
    }

    if (inputElement.hasAttribute('fv-audio') && inputElement.files) {
        if (!inputElement.hasAttribute('accept')) {
            inputElement.setAttribute('accept', 'audio/*')
        }

        for (const file of inputElement.files) {
            if (!file.type.startsWith('audio/')) {
                return fvFeedbacks(name)['fv-audio']
            }
        }
    }

    if (inputElement.hasAttribute('fv-video') && inputElement.files) {
        if (!inputElement.hasAttribute('accept')) {
            inputElement.setAttribute('accept', 'video/*')
        }

        for (const file of inputElement.files) {
            if (!file.type.startsWith('video/')) {
                return fvFeedbacks(name)['fv-video']
            }
        }
    }

    if (inputElement.hasAttribute('fv-min-size') && inputElement.files) {
        const minSize = parseFloat(inputElement.getAttribute('fv-min-size'))

        for (const file of inputElement.files) {
            if (file.size < minSize) {
                return fvFeedbacks(name, minSize)['fv-min-size']
            }
        }
    }

    if (inputElement.hasAttribute('fv-max-size') && inputElement.files) {
        const maxSize = parseFloat(inputElement.getAttribute('fv-max-size'))

        for (const file of inputElement.files) {
            if (file.size > maxSize) {
                return fvFeedbacks(name, maxSize)['fv-max-size']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-include') && inputElement.files) {
        const include = inputElement.getAttribute('fv-file-include')

        for (const file of inputElement.files) {
            if (!file.name.includes(include)) {
                return fvFeedbacks(name, include)['fv-file-include']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-exclude') && inputElement.files) {
        const exclude = inputElement.getAttribute('fv-file-exclude')

        for (const file of inputElement.files) {
            if (file.name.includes(exclude)) {
                return fvFeedbacks(name, exclude)['fv-file-exclude']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-start') && inputElement.files) {
        const startsWith = inputElement.getAttribute('fv-file-start')

        for (const file of inputElement.files) {
            if (!file.name.startsWith(startsWith)) {
                return fvFeedbacks(name, startsWith)['fv-file-start']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-no-start') && inputElement.files) {
        const startsWith = inputElement.getAttribute('fv-file-no-start')

        for (const file of inputElement.files) {
            if (file.name.startsWith(startsWith)) {
                return fvFeedbacks(name, startsWith)['fv-file-no-start']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-end') && inputElement.files) {
        const endsWith = inputElement.getAttribute('fv-file-end')

        for (const file of inputElement.files) {
            if (!file.name.endsWith(endsWith)) {
                return fvFeedbacks(name, endsWith)['fv-file-end']
            }
        }
    }

    if (inputElement.hasAttribute('fv-file-no-end') && inputElement.files) {
        const endsWith = inputElement.getAttribute('fv-file-no-end')

        for (const file of inputElement.files) {
            if (file.name.endsWith(endsWith)) {
                return fvFeedbacks(name, endsWith)['fv-file-no-end']
            }
        }
    }

    if (inputElement.hasAttribute('fv-files') && inputElement.files) {
        if (!inputElement.hasAttribute('multiple')) {
            inputElement.setAttribute('multiple', '')
        }

        const files = inputElement.getAttribute('fv-files')

        if (inputElement.files.length != files) {
            return fvFeedbacks(name, files)['fv-files']
        }
    }

    if (inputElement.hasAttribute('fv-min-files') && inputElement.files) {
        if (!inputElement.hasAttribute('multiple')) {
            inputElement.setAttribute('multiple', '')
        }

        const minFiles = inputElement.getAttribute('fv-min-files')

        if (inputElement.files.length < minFiles) {
            return fvFeedbacks(name, minFiles)['fv-min-files']
        }
    }

    if (inputElement.hasAttribute('fv-max-files') && inputElement.files) {
        if (!inputElement.hasAttribute('multiple')) {
            inputElement.setAttribute('multiple', '')
        }

        const maxFiles = inputElement.getAttribute('fv-max-files')

        if (inputElement.files.length > maxFiles) {
            return fvFeedbacks(name, maxFiles)['fv-max-files']
        }
    }

    if (inputElement.hasAttribute('fv-image-min-width') && inputElement.files) {
        const minWidth = parseFloat(inputElement.getAttribute('fv-image-min-width'))

        for (const file of inputElement.files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const width = this.width;

                        if (width < minWidth) {
                            fvPrcessInputWithFeedback(inputElement, fvFeedbacks(name, minWidth)['fv-image-min-width'])
                        }
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-max-width') && inputElement.files) {
        const maxWidth = parseFloat(inputElement.getAttribute('fv-image-max-width'))

        for (const file of inputElement.files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const width = this.width;

                        if (width > maxWidth) {
                            fvPrcessInputWithFeedback(inputElement, fvFeedbacks(name, maxWidth)['fv-image-max-width'])
                        }
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-min-height') && inputElement.files) {
        const minHeight = parseFloat(inputElement.getAttribute('fv-image-min-height'))

        for (const file of inputElement.files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const height = this.height;

                        if (height < minHeight) {
                            fvPrcessInputWithFeedback(inputElement, fvFeedbacks(name, minHeight)['fv-image-min-height'])
                        }
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-max-height') && inputElement.files) {
        const maxHeight = parseFloat(inputElement.getAttribute('fv-image-max-height'))

        for (const file of inputElement.files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const height = this.height;

                        if (height > maxHeight) {
                            fvPrcessInputWithFeedback(inputElement, fvFeedbacks(name, maxHeight)['fv-image-max-height'])
                        }
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-aspect-ratio') && inputElement.files) {
        const aspectRatio = inputElement.getAttribute('fv-image-aspect-ratio')

        for (const file of inputElement.files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const width = this.width;
                        const height = this.height;

                        const imageAspectRatio = fvGetAspectRatio(width, height);

                        if (imageAspectRatio != aspectRatio) {
                            fvPrcessInputWithFeedback(inputElement, fvFeedbacks(name, aspectRatio)['fv-image-aspect-ratio'])
                        }
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-to-webp') && inputElement.files) {
        for (let file of inputElement.files) {
            if (file.type.startsWith('image/') && !file.name.endsWith('.webp')) {
                const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "")

                if (inputElement.fvImagesToWebp && inputElement.fvImagesToWebp.includes(fileNameWithoutExtension)) {
                    continue
                }

                if (!inputElement.fvImagesToWebp) {
                    inputElement.fvImagesToWebp = []
                }

                inputElement.fvImagesToWebp.push(fileNameWithoutExtension);

                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const {width, height} = fvGetImageDimensions(inputElement, image)

                        const canvas = document.createElement('canvas')

                        canvas.width = width
                        canvas.height = height

                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

                        const dataURL = canvas.toDataURL('image/webp');

                        const blob = fvDataURLtoBlob(dataURL);

                        const newFile = new File([blob], `${fileNameWithoutExtension}.webp`, { type: 'image/webp' });

                        const fileList = new DataTransfer();
                        fileList.items.add(newFile);

                        for (let existingFile of inputElement.files) {
                            if (file != existingFile || file.name != existingFile.name) {
                                fileList.items.add(existingFile);
                            }
                        }

                        inputElement.value = ''
                        inputElement.files = fileList.files

                        inputElement.dispatchEvent(new Event('change'));
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-to-png') && inputElement.files) {
        for (let file of inputElement.files) {
            if (file.type.startsWith('image/') && !file.name.endsWith('.png')) {
                const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "")

                if (inputElement.fvImagesToPng && inputElement.fvImagesToPng.includes(fileNameWithoutExtension)) {
                    continue
                }

                if (!inputElement.fvImagesToPng) {
                    inputElement.fvImagesToPng = []
                }

                inputElement.fvImagesToPng.push(fileNameWithoutExtension);

                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const {width, height} = fvGetImageDimensions(inputElement, image)

                        const canvas = document.createElement('canvas')

                        canvas.width = width
                        canvas.height = height

                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

                        const dataURL = canvas.toDataURL('image/png');

                        const blob = fvDataURLtoBlob(dataURL);

                        const newFile = new File([blob], `${fileNameWithoutExtension}.png`, { type: 'image/png' });

                        const fileList = new DataTransfer();
                        fileList.items.add(newFile);

                        for (let existingFile of inputElement.files) {
                            if (file != existingFile || file.name != existingFile.name) {
                                fileList.items.add(existingFile);
                            }
                        }

                        inputElement.value = ''
                        inputElement.files = fileList.files

                        inputElement.dispatchEvent(new Event('change'));
                    }
                }
            }
        }
    }

    if (inputElement.hasAttribute('fv-image-to-jpg') && inputElement.files) {
        for (let file of inputElement.files) {
            if (file.type.startsWith('image/') && !file.name.endsWith('.jpg')) {
                const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "")

                if (inputElement.fvImagesToJpg && inputElement.fvImagesToJpg.includes(fileNameWithoutExtension)) {
                    continue
                }

                if (!inputElement.fvImagesToJpg) {
                    inputElement.fvImagesToJpg = []
                }

                inputElement.fvImagesToJpg.push(fileNameWithoutExtension);

                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = function (e) {
                    const image = new Image();

                    image.src = e.target.result;

                    image.onload = function () {
                        const {width, height} = fvGetImageDimensions(inputElement, image)

                        const canvas = document.createElement('canvas')

                        canvas.width = width
                        canvas.height = height

                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

                        const dataURL = canvas.toDataURL('image/jpg');

                        const blob = fvDataURLtoBlob(dataURL);

                        const newFile = new File([blob], `${fileNameWithoutExtension}.jpg`, { type: 'image/jpg' });

                        const fileList = new DataTransfer();
                        fileList.items.add(newFile);

                        for (let existingFile of inputElement.files) {
                            if (file != existingFile || file.name != existingFile.name) {
                                fileList.items.add(existingFile);
                            }
                        }

                        inputElement.value = ''
                        inputElement.files = fileList.files

                        inputElement.dispatchEvent(new Event('change'));
                    }
                }
            }
        }
    }

    return null
}

function fvPrcessInputWithFeedback(inputElement, inputFeedback) {
    inputElement.setAttribute('fv-used', '')

    fvProcessInput(inputElement, inputFeedback)

    const formElement = inputElement.closest('form')
    if (formElement) fvProcessForm(formElement)
}

function fvProcessInput(inputElement, inputFeedback = null) {
    inputElement.fvInputLoaded = true

    const name = inputElement.getAttribute('name')

    let feedbackElement = null

    if (name) {
        const formElement = inputElement.closest('form')
        if (formElement) feedbackElement = formElement.querySelector(`[fv-for="${name}"]`)
        if (!feedbackElement) feedbackElement = inputElement.parentNode.querySelector(`[fv-for="${name}"]`)
        if (!feedbackElement) feedbackElement = document.querySelector(`[fv-for="${name}"]`)
    }

    if (!inputFeedback) {
        inputFeedback = fvGetInputFeedback(inputElement)
    }

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