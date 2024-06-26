const FormInputChange = (e,formData,setformData,errors,setErrors) => {
const {name,value,type,checked} = e.target;
const newvalue = type ==="checkbox"?checked:value;
setformData({
    ...formData,
    [name]:newvalue,
})
setErrors({
    ...errors,
    [name]:"",
})
};
export default FormInputChange;
