import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PolicyText from '../../components/policy/PolicyText';
import { StyledSection } from '../../components/StyledMain';


const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));
const Button = dynamic(() => import('../../components/buttons/button'));

const Policy = () => {
    const router = useRouter();

    return (
        <StyledSection>
            <PageAnimation />
            <PolicyText />
            <Button typeHTML='button' type='emptySecondary' onClick={() => router.back()}>
                Назад
            </Button>
        </StyledSection>
    );
};

export default Policy;
