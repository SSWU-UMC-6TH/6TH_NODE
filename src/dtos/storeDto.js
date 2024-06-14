export class StoreDTO {
    constructor({ name, location, description }) {
        if (!name || !location || !description) {
            throw new Error("All fields must be provided");
        }
        this.name = name;
        this.location = location;
        this.description = description;
    }
}

export const previewReviewResponseDTO= (data) =>{

    const reviews=[];

    for(let i=0;i<data.length;i++){
        reviews.push({
            "user_name": data[i].user_name,
            "rate":data[i].rate,
            "review_body":data[i].review_content,
            "create_date": formatDate(data[i].created_at)
        })
    }
    return {"reviewData":reviews, "cursorId":data[data.length-1].review_id};
}

const formatDate=(date) =>{
    return new Intl.DateTimeFormat('kr').format(new Date(date)).repaceAll(" ","").slice(0,-1);
}