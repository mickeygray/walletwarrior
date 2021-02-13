import Image from "next/image"
const ReviewItem = ({review:{reviewer, review, pic, date}}) => {
        return (
        <div style={{width: '600px'}} className="card bg-light m-1 text-center">
                
                <p>
                    {review} 
                </p>
                <h3>{reviewer} {' '} - {date}<span  style={{float:'right'}}>   
          <Image
            src={pic}
            alt='Real Tax Review'
            className='round-img'
            width= "60px"
            height= "60px"
         
 
          /> </span></h3>
        
        </div>
        );
    
};



export default ReviewItem
