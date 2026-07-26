import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ListStores from "../../../components/module-latihan/latihan_4/Explore/BottomSheet/ListStores";
import Header from "../../../components/module-latihan/latihan_4/Explore/Header";
import ExploreMapView from "../../../components/module-latihan/latihan_4/Explore/MapView";
import { ListStores as StoreData } from "../../../constants/list_stores";

export default function Explore() {
  const bottomSheetRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const snapPoints = useMemo(() => ["30%", "50%", "85%"], []);

  const handleSheetChange = (index) => {
    if (index === -1) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Izin ditolak", "Aplikasi membutuhkan akses lokasi untuk fitur Explore");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      const addressData = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (addressData.length > 0) {
        setAddress(addressData[0]);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ExploreMapView current_location={location} stores={StoreData} />
        <Header />

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          enablePanDownToClose={false}
          onChange={handleSheetChange}
          snapPoints={snapPoints}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} opacity={0.3} appearsOnIndex={2} disappearsOnIndex={1} />
          )}
          backgroundStyle={styles.sheetBackground}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Text style={styles.title}>Explore Store</Text>
            {address && (
              <Text style={styles.subtitle}>
                Location: {(address?.city || address?.subregion || address?.name || "-") +
                  ", " +
                  (address?.region || "-")}
              </Text>
            )}

            <View style={{ marginTop: 16 }}>
              <ListStores stores={StoreData} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f6f1" },
  sheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", paddingHorizontal: 15 },
  subtitle: { fontSize: 13, color: "gray", paddingHorizontal: 15, marginTop: 4 },
});
