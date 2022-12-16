import { useContext } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts';

const Header = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const handleClick = () => {
    logOut();
    window.location.replace('/login');
  };

  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {loggedIn && <Button onClick={handleClick}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
