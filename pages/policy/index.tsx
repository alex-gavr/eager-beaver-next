import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import { StyledMain, StyledSection } from '../../components/StyledMain';
import { useAppSelector } from '../../services/hook';

const PageAnimation = dynamic(() => import('../../components/page-animation/PageAnimation'));
const Button = dynamic(() => import('../../components/buttons/button'));
const PolicyText = dynamic(() => import('../../components/policy/PolicyText'));

const Policy = () => {
    const router = useRouter();
    const { showLoader } = useAppSelector((state) => state.homeLoader);

    return (
        <>
            {showLoader && <Loader title='Политика в отношении обработки персональных данных' layoutId='policy' />}
            <StyledMain>
                <StyledSection>
                    <PolicyText layoutId='policy'  />
                    <Button typeHTML='button' type='emptySecondary' onClick={() => router.back()}>
                        Назад
                    </Button>
                </StyledSection>
                <PageAnimation />
            </StyledMain>
        </>
    );
};

export default Policy;
