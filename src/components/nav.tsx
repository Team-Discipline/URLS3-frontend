import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { LogOut } from '../features/Logout';
import { AccessToken } from '../variable/token';
import ProfileComponent from './ProfileComponent';

export const NavComponent = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  useEffect(() => {
    if (AccessToken !== undefined) setloginStatus(true);
    else { setloginStatus(false); }
  }, [AccessToken]);
  return (
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
            <Container>
                <Navbar.Brand href="/">ULS3</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/features">Features</Nav.Link>
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
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
                            <Nav.Link href="/analytics">Analytics S3</Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={onClickToggleModal}>
                                프로필
                            </Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={LogOut}>
                                로그 아웃
                            </Nav.Link>
                        }
                        {!loginStatus &&
                            <Nav.Link href="/signup">
                                회원 가입
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
