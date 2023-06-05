import './headerStyle.css'
import { Link } from 'react-router-dom';
function Header()
{
    return(
     <div className='headerArea'>
        
        <Link to="/home">Beyond Gods</Link>
        
     </div>
    );
    
}
export default Header;