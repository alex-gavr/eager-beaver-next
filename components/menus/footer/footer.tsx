import styles from './footer.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { footer } from '../links';
import { INavData } from '../../../types/data';
import SchoolLocationMap from '../../map/map';
import { SocialIcon } from 'react-social-icons';
import { list, opacity, popUp, toDown, toUp } from '../../../utils/motion-animations';
import beaverRocket from '../../../images/beaver/BeaverRocket.svg';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../services/hook';
import { footerVisibilityStatus } from '../../../services/navigationVisibilitySlice';

const Footer = () => {
    const dispatch = useAppDispatch();
    // TOGGLE ACTIVE & INACTIVE CLASS
    const classNameToggle = (navData: INavData): string => {
        return navData.isActive ? styles.navigationButtonActive : styles.navigationButton;
    };
    const { ref, inView } = useInView({});

    useEffect(() => {
        dispatch(footerVisibilityStatus(inView))
    
    }, [inView])

    return (
        <AnimatePresence>
            <motion.footer className={styles.footer} ref={ref}>
                <motion.div
                    className={styles.socialMediaContainer}
                    variants={list}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-10% 0px -10% -0px' }}>
                    <motion.p variants={opacity}>присоединяйся к нам и здесь</motion.p>
                    <motion.div className={styles.iconsContainer} variants={toUp}>
                        <SocialIcon url='https://t.me/eagerbeavervlg' target='_blank' rel='noopener noreferrer' />
                        <SocialIcon url='https://wa.me/79093809657' network='whatsapp' target='_blank' rel='noopener noreferrer' />
                        <SocialIcon url='https://instagram.com/eagerbeaver.vlg' target='_blank' rel='noopener noreferrer' />
                        <SocialIcon url='https://vk.com/eagerbeavervlg' target='_blank' rel='noopener noreferrer' />
                    </motion.div>
                </motion.div>
                <motion.div className={styles.wrapper}>
                    <motion.div className={styles.mapAndAddressContainer}>
                        <motion.div className={styles.addressContainer}>
                            <img src={beaverRocket} alt='' className={styles.beaverRocket} />
                            <p className={styles.address}>
                                Мы находимся по адресу: <br /> г. Волгоград ул. Калинина д. 13, БЦ “Меркурий”
                            </p>
                            <p className={styles.phone}>
                                Телефон для связи:{' '}
                                <motion.a href='tel:+7(909)380-96-57' style={{ color: 'inherit' }}>
                                    +7(909)380-96-57
                                </motion.a>
                            </p>
                        </motion.div>
                        <SchoolLocationMap style={{ placeSelf: 'center' }} widthDesktop={300} heightDesktop={300} widthMobile={300} heightMobile={300} />
                    </motion.div>
                    <motion.ul className={styles.linksList} variants={list} initial='hidden' whileInView='visible' viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                        {footer.map((link) => (
                            <motion.li variants={toDown} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} key={link.id}>
                                <NavLink to={link.to} className={classNameToggle}>
                                    {link.name}
                                </NavLink>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
                <motion.div
                    className={styles.creditsContainer}
                    variants={list}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: '-5% 0px -5% -0px' }}>
                    <motion.p variants={popUp}>Product Owner: Валерия Евстратова</motion.p>
                    <motion.div className={styles.creditsContainerOmitLera} variants={list}>
                        <motion.p variants={popUp}>Design: Мария Рязанова</motion.p>
                        <motion.p variants={popUp}>Development: Александр Гавриленко</motion.p>
                        <motion.p variants={popUp}>Photography: Диана Удаева</motion.p>
                        <motion.p variants={popUp}>Illustrations: Елизавета Шведова</motion.p>
                    </motion.div>
                </motion.div>
            </motion.footer>
        </AnimatePresence>
    );
};
export default Footer;
