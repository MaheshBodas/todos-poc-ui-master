export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('/');
}

// AG Grid Value Getter function. 
// Its purpose is to validate Date in this case and return valid date
// else retuen null for invalid date like ggg8/21/02 in case of 
// malformed date
export function isValidDate(params) {
    const dateToValidate = String(params.newValue);
    var regEx = /^\d{4}[/]\d{2}[/]\d{2}$/;
    const bRetval = dateToValidate.match(regEx) != null;
    if(bRetval)
        return params.newValue;
    else
        return null;
}
