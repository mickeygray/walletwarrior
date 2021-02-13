import Link from "next/link"

const Footer = () => {
    return (
        <div className='bg-dark navbar footer'>
          <h5>Wallet Warriors 2021</h5>
            <ul>
              <li><Link href='/about'><a style={{display:'inline-block',borderRadius:'10px', color:'black', paddingLeft:'22px', width:'150px'}} className="btn btn-light" >More About Us</a></Link></li>
              </ul>   
        </div>
    )
}

export default Footer
