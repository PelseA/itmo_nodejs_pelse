function isStringIsNumberAndNotEmpty(value) {
    const isValueString = typeof value === 'string';
    const isValueIsNumber = !isNaN(parseInt(value));
    return isValueString && isValueIsNumber && value.length > 0;
}

export { isStringIsNumberAndNotEmpty };