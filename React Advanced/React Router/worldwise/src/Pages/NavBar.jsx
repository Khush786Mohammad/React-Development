import { Link } from "react-router-dom";
function NavBar(){
    return (
        <div>
            <div>My Application</div>
            <div>
                <Link to="/"><li>Home</li></Link>
                <Link to="/product"><li>Product</li></Link>
                <Link to="/pricing"><li>Pricing</li></Link>
            </div>
        </div>
    );
}

export default NavBar;