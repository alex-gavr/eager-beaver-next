import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from '../../utils/use-window-size';
import styled from 'styled-components';
const Wrapper = styled.div({
    position: 'relative',
    width: 300,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (min-width: 900px)': {
        width: 550,
        height: 550,
    },
});

interface IProps {
    style?: any;
    widthMobile: number;
    widthDesktop: number;
    heightMobile: number;
    heightDesktop: number;
    latitude?: number;
    longitude?: number;
}

const SchoolLocationMap: FC<IProps> = ({ style, widthMobile, widthDesktop, heightMobile, heightDesktop, latitude, longitude }) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const { width } = useWindowSize();
    const options = {
        iconLayout: 'default#image',
        // Custom image for the placemark icon.
        iconImageHref: '/cool.svg',
        // The size of the placemark.
        iconImageSize: [60, 60],
    };
    return (
        <YMaps>
            <Wrapper style={style}>
                {!mapLoaded && (
                    <Skeleton
                        width={width < 900 ? widthMobile : widthDesktop}
                        height={width < 900 ? heightMobile : heightDesktop}
                        style={{ zIndex: 888, position: 'absolute', top: 0, left: 0 }}
                    />
                )}
                <Map
                    onLoad={() => setMapLoaded(true)}
                    style={{
                        width: width < 900 ? widthMobile : widthDesktop,
                        height: width < 900 ? heightMobile : heightDesktop,
                    }}
                    defaultState={{
                        center: [latitude ? latitude : 48.699778, longitude ? longitude : 44.505735],
                        zoom: 17,
                    }}>
                    <Placemark geometry={[latitude ? latitude : 48.699778, longitude ? longitude : 44.505735]} options={options} />
                    <GeolocationControl
                        options={{
                            float: 'left',
                        }}
                    />
                    <ZoomControl
                        options={{
                            position: { right: '10px', bottom: '80px' },
                        }}
                    />
                </Map>
            </Wrapper>
        </YMaps>
    );
};

export default SchoolLocationMap;
