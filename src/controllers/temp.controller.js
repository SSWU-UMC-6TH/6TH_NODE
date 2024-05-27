// temp.controller.js

import { status } from '../../config/response.status.js';//status 포맷에 succes에 해당하는 응답 내용이 들어가게 됨
import { getTempData } from '../services/temp.service.js';//추가적으로 전달해야 할 데이터까지 전송
import { response } from '../../config/response.js';
import {CheckFlag} from '../services/temp.service.js'

export const tempTest = (req, res, next) => {
    res.send(response(status.SUCCESS, getTempData()));
};

export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(response(status.SUCCESS, CheckFlag(req.params.flag)));
}