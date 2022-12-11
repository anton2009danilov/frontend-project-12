import { useContext } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import AuthContext from '../contexts';

const Header = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const handleClick = () => {
    logOut();
    window.location.replace('/login');
  };

  return (
    <Navbar className="shadow-sm bg-white" expand="lg">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {loggedIn && <Button onClick={handleClick}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
