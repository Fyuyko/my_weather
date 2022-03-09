import { Link } from "react-router-dom";

const Page404 = () => {
   return (
      <>
         <div>
            Page not found!                 
         </div>
         <div>
            <Link to="/">Go to main page</Link>
         </div>
      </>
      
   )
}

export default Page404;