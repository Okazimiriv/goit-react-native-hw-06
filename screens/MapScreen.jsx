import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Map = ({ route: { params } }) => {
  const navigation = useNavigation();

  // const { title, region } = params;
  const latitude = params.region.latitude;
  const longitude = params.region.longitude;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={10}
        // onMapReady={() => console.log('Map is ready')}
        // onRegionChange={() => console.log('Region change')}
      >
        <Marker
          title="Photo taken here"
          coordinate={{ latitude: latitude, longitude: longitude }}
          // description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
