

const $capitalize = (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const $camelCase = (text) => {
    if (!text) return ''
    const words = text.split(' ')
    const camelCaseWords = words.map((word, index) => {
        if (index == 0) {
            return word.toLowerCase()
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }
    })
    return camelCaseWords.join(' ')
}

const $titleCase = (text) => {
    if (!text) return '' 
    return text.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    )
}

const  $capitalizeFirstLetter = (string) => {
    if (!string) return '' 
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const  $removeSpaces = (string) => {
    let newString = string.replace(/\s+/g, "");
    return newString;
}

export {
    $capitalize,
    $camelCase,
    $titleCase,
    $capitalizeFirstLetter,
    $removeSpaces
}
