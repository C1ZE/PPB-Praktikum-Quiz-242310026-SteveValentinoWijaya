import { Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { color_list } from "../styles/StyleApps";

// Komponen peta interaktif menampilkan lokasi pengguna & marker toko buku
export default function ExploreMapView({ current_location, stores = [] }) {
  const region = {
    latitude: current_location?.latitude ?? -6.606048,
    longitude: current_location?.longitude ?? 106.799373,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        region={region}
        showsUserLocation
        showsCompass
        showsMyLocationButton
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{ latitude: store.latitude, longitude: store.longitude }}
            title={store.title}
            description={store.description}
            pinColor={color_list.green}
          />
        ))}
      </MapView>
    </View>
  );
}
