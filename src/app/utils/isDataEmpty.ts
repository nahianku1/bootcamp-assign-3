export function isDataEmpty<T>(data: T) {
  if (Array.isArray(data)) {
    if (data.length) {
      return true;
    } else {
      return false;
    }
  } else {
    if (data instanceof Object && data !== null && !Array.isArray(data)) {
      if (Object.keys(data).length) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
