import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';
import { status } from './config/response.status.js'; // 경로는 실제 파일 위치에 맞게 조정하세요
import { userRouter } from './src/routes/user.route.js';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import storeRoutes from './src/routes/storeRoutes.js';
import missionRoutes from './src/routes/missionRoutes.js';
import { BaseError } from './config/error.js';


dotenv.config();    // .env 파일 사용 (환경 변수 관리)

const app = express();

// server setting - veiw, static, body-parser etc..
app.set('port', process.env.PORT || 3000)   // 서버 포트 지정
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use('/user', userRouter);
// router setting
app.use('/temp', tempRouter);
app.use(express.urlencoded({extended: false})); // 단순 객체 문자열 형태로 본문 데이터 해석

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

// index.js
app.use(bodyParser.json());
app.use('/stores', storeRoutes);
app.use('/missions', missionRoutes);

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
  
    const statusCode = err.data ? err.data.status : 500; // `data`가 없는 경우 500으로 처리
    const responseMessage = err.data ? response(err.data) : response(status.INTERNAL_SERVER_ERROR);
    
    res.locals.message = err.message;   
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(statusCode).send(responseMessage);
});

const port = app.get('port');
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});