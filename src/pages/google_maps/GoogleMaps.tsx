
import { Box, Button,  TextField } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { ChangeEvent, useState } from "react";
import googleMapsStyles from "./GoogleMaps.Styles";
import googleMapsImage from "../../assets/google-maps.png"

interface GoogleMapState {
    map: google.maps.Map | null;
}

const center = {
    lat: 17.44720684163132,
    lng: 78.38862149674657,
};

function GoogleMaps() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCu5-jlqeSYHpo0rTKRI_JsbCw1ZOOV7SU",
    });
    const [map, setMap] = React.useState<GoogleMapState["map"]>(null);
    const [latitude, setLatitude] = useState<number | undefined>(17.44720684163132);
    const [longitude, setLongitude] = useState<number | undefined>(78.38862149674657);


    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const handleDrag = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat;
        const lng = event.latLng?.lng;

        setLatitude(lat);
        setLongitude(lng);
    };

    const handleChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "latitude") setLatitude(+value);
        else setLongitude(+value);
      };

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLatitude(latitude)
        setLongitude(longitude)
    };

    return isLoaded ? (
        <Box sx={googleMapsStyles.mainContainer}>
            <Box sx={googleMapsStyles.childContainer}>
                <Box
                    component={"form"}
                    sx={googleMapsStyles.inputFieldsContainer}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        color="success"
                        label="Latitude"
                        onChange={handleChangeEventHandler}
                        value={latitude}
                        name="latitude"
                    />
                    <TextField
                        variant="outlined"
                        color="success"
                        name="longitude"
                        label="Longitude"
                        onChange={handleChangeEventHandler}
                        value={longitude}
                    />
                    <Button variant="contained" color="success" type="submit">
                        Locate Me
                    </Button>
                </Box>
                <GoogleMap
                mapContainerStyle={googleMapsStyles.googleMaps}
                center={{lat : Number(latitude), lng: Number(longitude)}}
                zoom={1}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <MarkerF
                    position={center}
                    draggable={true}
                    icon ={{url: googleMapsImage, scaledSize: new google.maps.Size(35, 35)}}
                    onDragEnd={handleDrag}
                />
            </GoogleMap>
            </Box>
        </Box>
    ) : (
        <></>
    );
}

export default React.memo(GoogleMaps);