/**
  *
  * @author eks5115
  */

let deflate = require('./rawdeflate');
let encode64 = require('./encode64');

module.exports.encode = function (data) {
  let encodeURIData = unescape(encodeURIComponent(data));
  let delfateData = deflate.encode(encodeURIData, 9);
  return encode64(delfateData);
};