export default async function formatTag(tag) {

  const fnText = await fetch(
    `https://raw.githubusercontent.com/codinasion/codinasion/master/script/formatTag.js`
  )
    .then((res) => res.text())
    .catch((error) => console.log(error));
  
    eval(fnText);

  return formatTag(tag);
}
