export class QueryStringBuilder {
    constructor(season, sign, temperature) {}

    setSeason(season) {
        this.season = season;
    }

    setSign(sign) {
        this.sign = sign;
    }

    setTemperature(temperature) {
        this.temperature = temperature;
    }

    getMethodName() {
        if (this.sign === 0 || this.sign === '0' || this.temperature === 0 || this.temperature === '0') {
            return 'ZERO'
        }
        if (this.temperature >= 1 && this.temperature <= 9) {
            return 'ONE_TO_NINE'
        }
        if (this.temperature >= 10 && this.temperature <= 19) {
            return 'TEN_TO_NINETEEN'
        }
        if (this.temperature >= 20) {
            return 'TWENTY_TO_TWENTY_NINE'
        }
        else return null;
    }

    getDbName() {
        if (/лето/i.test(this.season)) return 'summer'
        if (/осен/i.test(this.season)) return 'autumn'
        if (/зима/i.test(this.season)) return 'winter'
        if (/весна/i.test(this.season)) return 'spring'
        return null
    }

    temperatureForQuery() {
        if (this.getMethodName() === 'ZERO') return '0'
        else if (this.getMethodName() === 'ONE_TO_NINE') return '1-9'
        else if (this.getMethodName() === 'TEN_TO_NINETEEN') return '10-19'
        else if (this.getMethodName() === 'TWENTY_TO_TWENTY_NINE') return '20-29'
        else return null
    }

    signForQuery() {
        if (this.sign === '0') return '0'
        else if (this.sign === '-') return 'minus'
        else if (this.sign === '+') return 'plus'
        else return null
    }

    getVariablesObjForQuery() {
        const signForQuery = this.signForQuery()
        const temperatureForQuery = this.temperatureForQuery()
        if (signForQuery && temperatureForQuery) {
            return {}
        }

    }

    getQueryString() {
        const signForQuery = this.signForQuery()
        const temperatureForQuery = this.temperatureForQuery()
        let queryString = ''
        const dbName = this.getDbName()
        if ((signForQuery || signForQuery === '0') && temperatureForQuery && dbName) {
            queryString = `query GetContent_${dbName}($_eq: String, $_eq1: String) {
                ${dbName}(where: {sign: {_eq: "${signForQuery}"}, temperature: {_eq: "${temperatureForQuery}"}}) {
                    id
                    lady_img
                    lady_text
                    man_img
                    man_text
                    sign
                    temperature
                }
            }`
        }
        return queryString
    }
}