import express from 'express';
import bodyParser from 'body-parser';
import storeRoutes from './src/routes/storeRoutes.js';
import missionRoutes from './src/routes/missionRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import sequelize from './src/models/index.js';  
import userMissionRoutes from './src/routes/userMissionRoutes.js';
import swaggerUi from 'swagger-ui-express'; // swagger-ui-express 임포트
import swaggerJsdoc from 'swagger-jsdoc'; // swagger-jsdoc 임포트
import YAML from 'yamljs';

// Swagger 설정
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.swagger.yaml'], // 여러 Swagger 파일을 포함할 경로 설정
};

const specs = swaggerJsdoc(options);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(missionRoutes);
app.use(bodyParser.json());
app.use('/stores', storeRoutes);
app.use('/missions', missionRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api', userMissionRoutes);
app.use('/api', reviewRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // swagger-ui-express 사용

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 데이터베이스 연결 테스트
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // 연결이 성공적으로 완료되면 서버를 시작할 수 있습니다.
    // 예: app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    // 연결 실패 시, 추가적인 로그를 확인하거나 설정을 재검토할 필요가 있습니다.
  });
