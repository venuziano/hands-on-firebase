import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { firebase } from "../../services/firebase";
import { analyticsEvent } from '../../services/firebase/analytics';
import { createUser } from '../../services/firebase/firestore';
import initiateDB from '../../services/indexedDB';
import { getUsersByEmail } from '../../services/indexedDB/users';

import markerImg from '../../assets/marker.png';

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

    try {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const locale = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setPosition(locale)
          onLoad(map);

          firebase.auth().onIdTokenChanged(async (authUser) => {
            if (authUser) {
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

              const userExistIndexedDB = await getUsersByEmail(user.email);
              if (userExistIndexedDB.length === 0) {
                db.users.add(user);
              }

              const stringPosition = JSON.stringify(locale);
              analyticsEvent('logged_in', {
                userEmail: authUser.providerData[0].email,
                geolocation: stringPosition
              });

              createUser(
                authUser.providerData[0].displayName,
                authUser.providerData[0].email,
                authUser.providerData[0].phoneNumber,
                authUser.providerData[0].photoURL,
                authUser.providerData[0].providerId,
                authUser.providerData[0].uid
              );
            }
          });
        },
        function (error) {
          alert('Este dispositivo não suporta GPS ou ele não está habilitado.');
          console.log(error)
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      alert('Este dispositivo não suporta GPS ou ele não está habilitado.')
    }
  }, []);

  return (
    <div className="container">
      <div className="header-container">
        <img alt='Logo' src={markerImg} width="30" height="30" />
        <div className="title-header">
          <h1 className="title">Minha Localização</h1>
          <div className="underline"></div>
        </div>
        <Button
          data-testid="btn-logout"
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
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerClassName="maps"
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