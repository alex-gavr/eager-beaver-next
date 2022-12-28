import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';
import { FC } from 'react';
import { useWindowSize } from '../../utils/use-window-size';

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
            <div style={style}>
                <Map
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
            </div>
        </YMaps>
    );
};

export default SchoolLocationMap;