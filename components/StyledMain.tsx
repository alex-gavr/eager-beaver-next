import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledMain = styled(motion.main)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
});