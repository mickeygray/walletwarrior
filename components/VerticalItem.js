import Image from "next/image"
import {useRouter} from "next/router"
const VerticalItem = ({vertical}) => {
    const router = useRouter()
    const {name, img1} = vertical
    
    return (
        <div onClick={() => {
        router.push({
          pathname: `/vertical/${vertical.key}`,
          query: { data: vertical.key},
        })
      }}  style={{ boxShadow:'10px 5px 5px #333'}} className='card text-center'>
            {name}<br/>
            <Image src={img1} height='50' width='50' alt='Wallet Warriors Tax And Accounting'/>     
            
        </div>
    )
}

export default VerticalItem
