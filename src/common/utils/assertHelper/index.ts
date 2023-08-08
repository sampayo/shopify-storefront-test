// import { isNumeric, isString } from '../comparatorHelper';
// import AppError from '../errorHelper/AppError';

export function assertNonNullish<T = any>(condition: T, message?: string): asserts condition is NonNullable<T> {
  if (condition === null || condition === undefined)
    throw new Error(message || 'Value not found');
}

// export function assertNonString(condition: any, message?: string): asserts condition is string {
//   if (!isString(condition))
//     throw new AppError(AppError.badValue(message || 'invalid type', { errorInfo: { condition } }));
// }

// export function assertNonArray<T>(condition: any, message?: string): asserts condition is Array<T> {
//   if (!Array.isArray(condition))
//     throw new AppError(AppError.badValue(message || 'invalid type', { errorInfo: { condition } }));
// }

// export function assertNonNumeric(condition: any, message?: string): asserts condition is number {
//   if (!isNumeric(condition))
//     throw new AppError(AppError.badValue(message || 'invalid type', { errorInfo: { condition } }));
// }

export default assertNonNullish;
