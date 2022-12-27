
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { LogOut } from '../features/Logout';
import { AccessToken } from '../variable/token';
import ProfileComponent from './ProfileComponent';
import { getMyUser } from '../features/getMyUser';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from 'react-i18next';
import i18n from '../locales/i18n';

export const NavComponent = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const image = useSelector((state: RootState) => state.Image.id);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const { t } = useTranslation();

  const changeLang = () => {
    if (i18n.language === 'kr') {
      void i18n.changeLanguage('en');
    } else {
      void i18n.changeLanguage('kr');
    }
  };

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
                <Navbar.Brand href="/">URLS3</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title={t('dropdown')} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/action/3.1">{t('action')}</NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.2">
                              {t('anoaction')}
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/action/3.3">{t('something')}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/action/3.4">
                              {t('separatedlink')}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {loginStatus &&
                            <Nav.Link href="/analytics">{t('analytics')}</Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={onClickToggleModal}>
                                {(Boolean(image !== '-1')) && <img src={image} width="30" height="25" style={{ borderRadius: '4px' }} alt={'profile'}/> }  {t('profile')}
                            </Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={LogOut}>
                              {t('logout')}
                            </Nav.Link>
                        }
                        {!loginStatus &&
                            <Nav.Link href="/login">
                              {t('signin')}
                            </Nav.Link>
                        }
                        <Nav.Link onClick={changeLang}>
                          {t('language')}
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                {isOpenModal && (
                    <ProfileComponent onClickToggleModal={onClickToggleModal} />
                )}
            </Container>
        </Navbar>

  );
};
