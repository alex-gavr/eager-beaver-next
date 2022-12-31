import Image from 'next/image';
import instagram from '../../images/icons/social-media/instagram.svg';
import telegram from '../../images/icons/social-media/telegram.svg';
import vk from '../../images/icons/social-media/vk.svg';
import whatsapp from '../../images/icons/social-media/whatsapp.svg';

const SocialMediaIcons = () => {
    return (
        <>
            <a href='https://t.me/eagerbeavervlg' target='_blank' rel='noopener noreferrer'>
                <Image src={telegram} alt='' />
            </a>
            <a href='https://instagram.com/eagerbeaver.vlg' target='_blank' rel='noopener noreferrer'>
                <Image src={instagram} alt='' />
            </a>
            <a href='https://wa.me/79093809657' target='_blank' rel='noopener noreferrer'>
                <Image src={whatsapp} alt='' />
            </a>
            <a href='https://vk.com/eagerbeavervlg' target='_blank' rel='noopener noreferrer'>
                <Image src={vk} alt='' />
            </a>
        </>
    );
};

export default SocialMediaIcons;
