// response.js api응답 

export const response = ({isSuccess, code, message}, result) => {
   return {
      isSuccess: isSuccess,
      code: code,
      message: message,
      result: result
   }
};