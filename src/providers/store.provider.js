import { previewReviewResponseDTO } from "../dtos/storeDto";


export const getReview=async(storeId, query)=>{
    const{reviewId, size =3}=query;
    return previewReviewResponseDTO(await getPreviewReview(reviewId,size,storeId));
}