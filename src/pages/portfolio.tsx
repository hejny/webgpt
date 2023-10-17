import Image from 'next/image';
import webgptLogo from '../../public/logo/webgpt.white.svg';
import { PreviewGallery } from '../components/PreviewGallery/PreviewGallery';
import { Center } from '../components/SimpleLayout/Center';
import { StaticLayout } from '../components/StaticLayout/StaticLayout';

export default function PortfolioPage() {
    return (
        <StaticLayout subtitle={null}>
            <header>
                <Center>
                    <h1
                    // style={{ maxWidth: '700px'}}
                    >
                        <Image alt="WebGPT logo" src={webgptLogo} />
                        {/*
                        <HandwrittenText color={Color.from('#fff')} style={'BigPartiallyPartiallyJoined'}>
                            WebGPT
                        </HandwrittenText>
                        */}
                    </h1>
                </Center>
            </header>

            <main>
                <PreviewGallery numberOfWallpapers={120 /* <- TODO: Make some highly composite number generator  */} />
            </main>
        </StaticLayout>
    );
}

/**
 * TODO: [🌾] WebGPT page should be made as WebGPT static page
 */
