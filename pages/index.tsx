import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home({ device }: any) {
    
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Hero device={device} />
        </>
    );
}
export async function getServerSideProps(context: any) {
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

    return {
        props: {
            device: isMobile ? 'mobile' : 'desktop',
        },
    };
}