import {Container, Nav, Navbar} from 'react-bootstrap';
import React, {useCallback, useEffect, useState} from 'react';
import {LogOut} from './Logout';
import {AccessToken} from '../../../variable/token';
import ProfileComponent from './ProfileComponent';
import {getMyUser} from './getMyUser';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useTranslation} from 'react-i18next';
import i18n from '../../blocks/locales/i18n';

export const NavComponent = () => {
    const [loginStatus, setloginStatus] = useState(false);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const image = useSelector((state: RootState) => state.Image.id);
    const username = useSelector((state: RootState) => state.User.username);
    const onClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal);
    }, [isOpenModal]);

    const {t} = useTranslation();

    const changeLang = () => {
        if (i18n.language === 'kr') {
            void i18n.changeLanguage('en');
        } else {
            void i18n.changeLanguage('kr');
        }
    };

    useEffect(() => {
        if (AccessToken !== undefined) setloginStatus(true);
        else {
            setloginStatus(false);
        }
    }, [AccessToken]);

    if (AccessToken !== undefined) {
        void getMyUser();
    }
    // href="/src/components/pages" 인 이유 물어보기
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" style={{zIndex: 10}} variant="dark">
            <Container>
                <div>
                    <a href="/" style={{
                        textDecoration: 'none',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: 'whitesmoke',
                        fontFamily: 'Segoe UI'
                    }}>URL</a>
                    <a href="/" style={{
                        textDecoration: 'none',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: 'deepskyblue',
                        fontFamily: 'Segoe UI'
                    }}>S3</a>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {loginStatus &&
                            <Nav.Link href="/analytics">{t('analytics')}</Nav.Link>
                        }
                        {loginStatus &&
                            <Nav.Link onClick={onClickToggleModal}>
                                {(Boolean(image !== '-1')) &&
                                    <img src={image} width="30" height="25" style={{borderRadius: '4px'}}
                                         alt={''}/>} {username}
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
                    <ProfileComponent onClickToggleModal={onClickToggleModal}/>
                )}
            </Container>
        </Navbar>

    );
};
