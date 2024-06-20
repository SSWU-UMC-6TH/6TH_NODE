import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { getTempData,CheckFlag } from "../providers/testProviders.js";


export const tempTest = (req,res,next) => {
    console.log("connected to /test");
    res.send(response(status.SUCCESS, getTempData()));
};
//export const errorTest = (req,res,next) => {
//	const err = new BaseError(Status.NOT_FOUND);
//	next(err);
//};

export const tempException = (req,res,next) => {
    
    console.log("connected to /exception" + req.params.flag);
    const flag = req.params.flag;
    return res.send(response(status.SUCCESS,CheckFlag(flag)));

}