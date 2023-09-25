import GoogleMapReact from 'google-map-react'
import { useState } from 'react'


export function Stores() {
    
    const [storeLocation, setStoreLocation] = useState({ lat: 32.085300, lng: 34.781769 })
    const [cityName, setCityName] = useState('Tel Aviv')
    const AnyReactComponent = ({ text }) => <div style={{ fontSize: '20px' }}> <span className='city-name'>{cityName}</span>📍</div>
    let props = {
        center:{...storeLocation},
        zoom: 14
    }
    function onCityChosen({ target }) {
        console.log(target);
        const city = target.name
        setCityName(city)
        if (city ==='Tel Aviv') setStoreLocation ({ lat: 32.085300, lng: 34.781769 })
       else if (city ==='Haifa') setStoreLocation ({ lat: 32.794044, lng: 34.989571 })
       else if (city ==='Beer Sheva') setStoreLocation ({ lat: 31.243870, lng: 34.793991 })
       else if (city ==='Jerusalem') setStoreLocation ({ lat: 31.768318, lng: 35.213711 })
       else if (city ==='Kfar Saba') setStoreLocation ({ lat: 32.178196, lng: 34.907612 })
    }

    return (
        <section className="stores-map">
            <section className="cities-btn">
                <button name={'Tel Aviv'} onClick={onCityChosen}>Tel Aviv</button>
                <button name={'Haifa'} onClick={onCityChosen}>Haifa</button>
                <button name={'Beer Sheva'} onClick={onCityChosen}>Beer Sheva</button>
                <button name={'Jerusalem'} onClick={onCityChosen}>Jerusalem</button>
                <button name={'Kfar Saba'} onClick={onCityChosen}>Kfar Saba</button>
            </section>

            <div style={{ height: '50vh', width: '80vw' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCJkli7XyzkfRFnnkT6QiKd4BnRGr2AUPI" }}
                    center={props.center}
                    defaultZoom={props.zoom}
                >
                    <AnyReactComponent
                        lat={storeLocation.lat}
                        lng={storeLocation.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </section>
    )
}