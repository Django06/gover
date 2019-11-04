
/**
 * Sanitize an object from null, undefined & empty props. When 0, no props are deleted.
 * @param obj Object
 *
 * @usageNotes
 *
 * ### Example
 *
 * ```ts
 * const myObj = { key1: null, key2: value2, key3: undefined, key4: '' };
 * const mySanitizedObj = objectNullValueSanitizer(myObj)
 *
 * console.log(mySanitizedObj);   // {key2: value2}
 * ```
 */
export function objectNullValueSanitizer(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        (obj[key] !== 0 && !obj[key]) ||
        (typeof obj[key] === 'object' && isEmpty(obj[key]))
      ) {
        delete obj[key];
      }
    }
  }
  return obj;
}
export const isNullOrUndefined = (value: any) =>
  value === null || value === undefined;
/**
 * Whether an object is empty.
 * @param obj Object
 */
export function isEmpty(obj) {
    if (isNullOrUndefined(obj)) {
      return true;
    }
  
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (obj[prop] instanceof Array && obj[prop].length === 0) {
          continue;
        }
        return false;
      }
    }
  
    return true;
  }