
import logo from '../../images/logo.svg';
import logoChristmas from '../../images/logoChristmas.svg';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const Row = styled.div((props) =>({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    ' & > img': {
        height: '70px',
        width: '70px',
    },
    ' & > p': {
        color: props.theme.colors.textYellowDark,
        fontFamily: 'var(--ff-heading)',
        fontSize: '1.25rem',
    },
}));

export const Logo = () => {
    return (
        <Link href='/'>
            <Row>
                <Image src={logoChristmas} alt='logo' />
                <p>
                    Eager
                    <br />
                    Beaver
                </p>
            </Row>
        </Link>
    );
};
