import jsYaml from 'js-yaml';

jsYaml.parse = function (text, name) {
  name = name || '__content';
  var re = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/
    , results = re.exec(text)
    , conf = {}
    , yamlOrJson;

  if((yamlOrJson = results[2])) {
    if(yamlOrJson.charAt(0) === '{') {
      conf = JSON.parse(yamlOrJson);
    } else {
      conf = jsYaml.load(yamlOrJson);
    }
  }

  conf[name] = results[3] ? results[3] : '';

  return conf;
};

export default function markdata(mdata) {
  const ret = {};
  // var doc = jsYaml.load(markdonw);
  // console.log(doc);
  const raw = jsYaml.parse(mdata);
  // console.log(raw);
  //ret.content = transformer(ast);
  ret.content = raw.__content;

  // Get meta data
  delete raw.__content;
  ret.meta = raw;

  return ret;
};
