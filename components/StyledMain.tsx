import { m } from "framer-motion";
import styled from "styled-components";

export const StyledMain = styled(m.main)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    width: '100%',
    overflow: 'hidden',
});

export const StyledSection = styled(m.section)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem 0.5rem',
    position: 'relative',
    maxWidth: '1500px',
    '@media only screen and (min-width: 60em)': {
        padding: '4rem',
    },
});

export const FlexCCC = styled(m.div)({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
});