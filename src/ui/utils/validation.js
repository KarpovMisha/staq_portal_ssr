import validator from 'validator';
// import * as CompanyEmailValidator from 'company-email-validator';

const isEmpty = (value) => value === undefined || value === null || value === '' || !value; // eslint-disable-line
const join = (rules) => (value, data) =>
  rules.map((rule) => rule(value, data)).filter((error) => !!error)[0]; // eslint-disable-line

export function required(value) {
  // eslint-disable-line
  if (isEmpty(value)) {
    return 'This field is required';
  }
}

export function auth(value) {
  if (!isEmpty(value)) {
    if (!validator.isURL(validator.trim(value), { disallow_auth: true })) {
      return 'Incorrect value for the url field. Please enter valid https url that does not contain authentication information';
    }
  }
}

// export function companyEmail(value) {
//   // eslint-disable-line
//   if (!isEmpty(value) && !CompanyEmailValidator.isCompanyEmail(value)) {
//     return 'Please use your company email, not a personal one';
//   }
// }

export function url(value) {
  if (!isEmpty(value)) {
    if (!validator.isURL(validator.trim(value), { protocols: ['https'], require_protocol: true, validate_length: false })) {
      return 'Field value is not a url';
    }
  }
}

// export function phone(value) {
//   if (!isEmpty(value)) {
//     if (!validator.isMobilePhone(validator.trim(value))) {
//       return 'Invalid phone format';
//     }
//   }
// }

export function phone(phoneNumber) {
  if (!isEmpty(phoneNumber)) {
    const regex = /^\+(?:[0-9] ?){2,14}[0-9]$/; // eslint-disable-line
    if (!regex.test(phoneNumber)) {
      return 'Invalid phone format';
    }
  }
}


export function charactersWithoutSpecials(value) {
  if (!isEmpty(value) && /[^a-zA-Z0-9]/.test(value)) {
    return 'Special characters are not allowed';
  }
}

export function email(value) {
  // eslint-disable-line
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!isEmpty(value) && !re.test(value)) {
    return 'Invalid email address';
  }
}

export function validateEmail(email) {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
}

export function minLength(min) {
  return (value) => {
    // eslint-disable-line
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return (value) => {
    // eslint-disable-line
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  // eslint-disable-line
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function digitsLength(len) {
  return (value) => {
    if (!isEmpty(value)) {
      const digits = String(value).replace(/\D/g, '');
      if (digits.length !== len) return `Must be ${len} digits`;
    }
  };
}

export function oneOf(enumeration) {
  return (value) => {
    // eslint-disable-line
    if (!~enumeration.indexOf(value)) {
      // eslint-disable-line
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    // eslint-disable-line
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

// export function phone(value) {
//   // eslint-disable-line
//   if (!/^(\d|\+)[0-9+() -]+$/.test(value)) {
//     return 'Invalid phone format';
//   }
// }

export function createValidator(rules, section, activate) {
  return (data = {}) => {
    data = section && data.section ? data[section] : data; // eslint-disable-line
    if (activate && typeof data[activate] !== 'undefined') {
      if (!data[activate]) {
        return {};
      }
    }
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
