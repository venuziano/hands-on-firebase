import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { firebase, createUser } from "../../firebase";
import initiateDB from '../../indexedDB';

import './styles.css';

function Location() {
  const navigation = useHistory();

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  })

  const onLoad = useCallback(function callback(map) {
    new window.google.maps.LatLngBounds(position);
    map.setZoom(15);
  }, [position])

  async function handlePosition(map) {
    const db = await initiateDB();
    const ga = firebase.analytics();

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const locale = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setPosition(locale)
        onLoad(map);

        firebase.auth().onIdTokenChanged((authUser) => {
          const user = {
            displayName: authUser.providerData[0].displayName,
            email: authUser.providerData[0].email,
            phoneNumber: authUser.providerData[0].phoneNumber,
            photoURL: authUser.providerData[0].photoURL,
            providerId: authUser.providerData[0].providerId,
            uuid: authUser.providerData[0].uid,
            creationTime: authUser.metadata.creationTime,
            lastSignInTime: authUser.metadata.lastSignInTime,
            lat: locale.lat,
            lng: locale.lng,
          }
          db.users.add(user);

          ga.logEvent('successfully_logged_in', {
            displayName: authUser.providerData[0].displayName,
            email: authUser.providerData[0].email,
            phoneNumber: authUser.providerData[0].phoneNumber,
            photoURL: authUser.providerData[0].photoURL,
            providerId: authUser.providerData[0].providerId,
            uuid: authUser.providerData[0].uid,
            creationTime: authUser.metadata.creationTime,
            lastSignInTime: authUser.metadata.lastSignInTime,
            lat: locale.lat,
            lng: locale.lng,
          });

          createUser(
            authUser.providerData[0].displayName,
            authUser.providerData[0].email,
            authUser.providerData[0].phoneNumber,
            authUser.providerData[0].photoURL,
            authUser.providerData[0].providerId,
            authUser.providerData[0].uid
          );
        });
      },
      function (error) {
        alert('Este dispositivo não suporta GPS ou ele não está habilitado.');
        console.log(error)
      }
    );
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      alert('Este dispositivo não suporta GPS ou ele não está habilitado.')
    }
  }, []);

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="title">Minha Localização</h1>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            firebase.auth().signOut();
            navigation.push('/');
          }}
        >
          Sair
        </Button>
      </div>
      <div>
        <LoadScript googleMapsApiKey='api_key_here'>
          <GoogleMap
            mapContainerStyle={{
              width: '97vw',
              height: '90vh',
              borderRadius: '10px',
              margin: '1rem',
            }}
            center={position}
            onLoad={(map) => { handlePosition(map) }}
            options={{
              gestureHandling: "greedy",
              streetViewControl: false,
              mapTypeControl: false
            }}
          >
            <Marker
              position={position}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Location;