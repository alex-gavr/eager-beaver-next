import Image from 'next/image';
import instagram from '../../images/icons/social-media/instagram.svg';
import telegram from '../../images/icons/social-media/telegram.svg';
import vk from '../../images/icons/social-media/vk.svg';
import whatsapp from '../../images/icons/social-media/whatsapp.svg';

const SocialMediaIcons = () => {
    return (
        <>
            <a href='https://t.me/eagerbeavervlg' aria-label="Telegram" target='_blank' rel='noopener noreferrer'>
                <Image src={telegram} alt='' />
            </a>
            <a href='https://instagram.com/eagerbeaver.vlg' aria-label="Instagram" target='_blank' rel='noopener noreferrer'>
                <Image src={instagram} alt='' />
            </a>
            <a href='https://wa.me/79093809657' aria-label="WhatsApp" target='_blank' rel='noopener noreferrer'>
                <Image src={whatsapp} alt='' />
            </a>
            <a href='https://vk.com/eagerbeavervlg' aria-label="VK" target='_blank' rel='noopener noreferrer'>
                <Image src={vk} alt='' />
            </a>
        </>
    );
};

export default SocialMediaIcons;
