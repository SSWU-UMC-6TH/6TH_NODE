// temp.response.dto.js 서비스에서 전달하는 데이터를 cli가 받아도 되는 데이터로 바꾸어 전달

export const tempResponseDTO = (data) => {
   return {"testString" : data};
}//temp.response.dto (dto) -> getTempData (service) ->response 응답 result부분 (controller)

export const flagResponseDTO = (flag) => {
   return {"flag" : flag};
}