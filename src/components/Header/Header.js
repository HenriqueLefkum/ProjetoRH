import './headerStyle.css'
import { Link } from 'react-router-dom';
function Header()
{
    return(
     <div className='headerArea'>
        
        <Link to="/">Header</Link>
        
     </div>
    );
    
}
export default Header;