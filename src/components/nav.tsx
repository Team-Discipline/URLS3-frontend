
import { Container, Nav, Navbar } from 'react-bootstrap';
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
  const username = useSelector((state: RootState) => state.User.username);
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
        <Navbar collapseOnSelect expand="lg" bg="black" style={ { zIndex: 10 } } variant="dark">
            <Container>
                <a href="/" style={{ textDecoration: 'none', fontSize: '40px', fontWeight: 'bold', color: 'white' }}>URL</a>
                <a href="/" style={{ textDecoration: 'none', fontSize: '40px', fontWeight: 'bold', color: 'deepskyblue' }}>S3</a>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {loginStatus &&
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={onClickToggleModal}>
                                {(Boolean(image !== '-1')) && <img src={image} width="30" height="25" style={{ borderRadius: '4px' }} alt={'profile'}/> } {username}
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
