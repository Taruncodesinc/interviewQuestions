import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-custom-black text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/questions">Questions</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
