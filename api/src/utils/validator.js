const validateType = ({type, data, errorMessage}) => {
  if(typeof data !== type){
    throw new Error(errorMessage);
  }
}
const validateNumber = ({min, max, data, errorMessage}) => {
  if(min !== undefined){
    if(data < min){
      throw new Error(errorMessage);
    }
  }
  if(max !== undefined){
    if(data > max){
      throw new Error(errorMessage);
    }
  }
}
const validateArray = ({data, errorMessage}) => {
  if(!Array.isArray(data)){
    throw new Error(errorMessage);
  }
  if(data.length === 0){
    throw new Error(errorMessage);
  }
}
module.exports = {validateArray, validateNumber, validateType};
