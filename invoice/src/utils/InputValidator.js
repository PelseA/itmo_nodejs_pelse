class InputValidator {
    static isNumberUpAndIncluding9999(val) {
        if (isNaN(parseInt(val))) return false;
        return val > 0 && val <= 9999;
    }
}
export default InputValidator;