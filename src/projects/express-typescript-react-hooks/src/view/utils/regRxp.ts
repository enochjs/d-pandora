/* 电话号码 */
export const mobileReg = /^(1\d{10})$/

/** 数字 */
export const numberReg = /^([1-9]\d*|[0])(\.\d{1,2})?$/

/** 身份证 */
export const idCardReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/

/** money */
export const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
