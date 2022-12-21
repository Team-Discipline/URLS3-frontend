
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { LogOut } from '../features/Logout';
import { AccessToken } from '../variable/token';
import ProfileComponent from './ProfileComponent';
import { getMyUser } from '../features/getMyUser';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export const NavComponent = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const image = useSelector((state: RootState) => state.Image.id);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  useEffect(() => {
    if (AccessToken !== undefined) setloginStatus(true);
    else { setloginStatus(false); }
  }, [AccessToken]);

  if (AccessToken !== undefined) {
    void getMyUser();
  }

  return (
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
            <Container>
                <Navbar.Brand href="/">URLS3</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {loginStatus &&
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={onClickToggleModal}>
                                {(Boolean(image !== '-1')) && <img src={image} width="30" height="25" style={{ borderRadius: '4px' }} alt={'profile'}/> }  profile
                            </Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={LogOut}>
                                LogOut
                            </Nav.Link>
                        }
                        {!loginStatus &&
                            <Nav.Link href="/login">
                                Sign In
                            </Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
                {isOpenModal && (
                    <ProfileComponent onClickToggleModal={onClickToggleModal} />
                )}
            </Container>
        </Navbar>

  );
};
