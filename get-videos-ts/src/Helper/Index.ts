import { IError } from "../Interfaces/Helper"

export function merror(errors: Array<string>): IError {
    return { errors }
}

export function escapeStr(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\''").replace(/"/g, "\\\"")
}

export function format_column(value: any): any {
    const _value = value === null || value === undefined ? null : value

    if (typeof _value === 'string'){
        return escapeStr(_value)
    }

    return _value
}