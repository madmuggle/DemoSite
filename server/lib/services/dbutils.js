/**
 * Convert a normal Date object to string like: '2017-08-17 17:20:00'
 */
function mkTimeString(dateObj) {
  return dateObj.toISOString().replace('T', ' ').replace(/\..*/, '');
}

/**
 * { fullname: 'Harry Potter', age: 11, gender: null, email: undefined }
 * => { fullname: 'Harry Potter', age: 11 }
 */
function trimObj(obj) {
  const result = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && obj[k]) result[k] = obj[k];
  }
  return result;
}

/**
 * { fullname: 'Harry Potter', age: 11 }
 * => { fields: 'fullname, age', values: '"Harry Potter", 11' }
 */
function mkInsertString(rawObj) {
  const obj = trimObj(rawObj);
  return {
    values: Object.values(obj).map(JSON.stringify).join(', '),
    fields: Object.keys(obj).join(', '),
  };
}

module.exports = {
  mkInsertString,
  mkTimeString,
};
