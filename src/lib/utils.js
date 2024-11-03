export const validateInputs = (dataObj) => {
    let validated = false;
    const validFirstName = dataObj.firstname ? nameValidation(dataObj.firstname) : false;
    const validLastName = dataObj.lastname ? nameValidation(dataObj.lastname) : false;
    const validEmail = dataObj.uemail ? emailValidation(dataObj.uemail) : false;
    if(validFirstName && validLastName && validEmail) {
        validated = true;
    }
    return validated;
};

const nameValidation = (val) => {
    const pattern = /^[A-Za-z]+$/;
    let validated = false;
    if(!val || val === "" || val.length>100 || !val.match(pattern)) {
        validated = false;
    } else{
        validated = true;
    }
    return validated;
};

const emailValidation = (val) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validated = false;
    if (!val || val === '' || !val.match(pattern)) {
        validated = false;
    } else {
        validated = true;
    }
    return validated;
};