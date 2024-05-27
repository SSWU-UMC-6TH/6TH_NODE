// config/error.js

export class BaseError extends Error {
   constructor(data){
       super(data.message);
       this.data = data;
   }//data에는 response.status의 값들이 들어감
}