const parse = require('nicknamer');

module.exports = async req => {
  console.log('hello my lord');
  const data = await parse(req);
  console.log(data);

  res.end('Data logged to your console');
};
