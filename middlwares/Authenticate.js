//api 테스트를 위해서 req.user를 수동으로 설정하는 미들웨어 

const mockAuthenticate = (req, res, next) => {
   req.user = {
       id: 1, // 테스트용 사용자 ID
       username: 'testuser'
   };
   next();
};

export default mockAuthenticate;