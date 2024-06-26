const FormValidation = (formData,errorTexts,setErrors) => {
    let valid = true;
    const newErrors = {};
 for (const key in formData){
    if(typeof formData[key] === "string"){
        if(!formData[key].trim()){
            newErrors[key]=errorTexts[key]?errorTexts[key]:`${key.charAt(0).toUpperCase()+key.slice(1)} is required*`;
            valid = false;
        }else if(key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])){
            newErrors[key]=errorTexts[key]?errorTexts[key]:`Invalid Email address`;
            valid = false;
        }
    }else if(typeof formData[key] === "boolean"){
if(!formData[key]){
    newErrors[key] = errorTexts[key]?errorTexts[key]: `${key.charAt(0).toUpperCase()+key.slice(1)} is required*`;
    valid =false;
}
    }
 }

setErrors(newErrors)
  return valid
};

export default FormValidation;
