/**
 * replace keys in a string
 * @param {*} value 
 * @param {*} args 
 * @returns 
 */
const replaceParams = (value, args) => {
    let s = value;
    for (let i = 0; i < args.length; i++) {
        const reg = new RegExp(`\\{${i}\\}`, 'gm');
        s = s.replace(reg, args[i]);
    }
    return s;
}

export default replaceParams;