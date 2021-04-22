// check to see if url string begins with 'http' and if not, add 'http://' to beginning of string
const formatURLInput = (url) => {
  let protocol = url.slice(0, 4);
  if (protocol !== 'http')
    url = 'http://' + url;
  return url;
}

module.exports = formatURLInput;