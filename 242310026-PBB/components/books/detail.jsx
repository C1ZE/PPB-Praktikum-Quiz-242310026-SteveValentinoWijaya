import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../constants/list_books";
import { useAuth } from "../../context/AuthContext";
import { color_list } from "../module-latihan/latihan_4/styles/StyleApps";

export default function Detail() {
  // 1. Mengambil parameter [id] dari URL route dinamis
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // 2. Mencari objek buku satuan berdasarkan id yang dicocokkan
  const book = ListBook.find((book) => String(book.id) === String(id));

  // --- BAB 8.4 Latihan 2: Authentication Guard untuk Detail Buku ---
  const { userData, isLoading: authLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Tunggu sampai status login selesai dicek, baru tentukan perlu guard atau tidak
    if (!authLoading) {
      setShowLoginModal(!userData);
    }
  }, [authLoading, userData]);

  const handleCancelLogin = () => {
    setShowLoginModal(false);
    router.back();
  };

  const handleGoToSignIn = () => {
    setShowLoginModal(false);
    router.replace("/auth/signin");
  };

  // --- Latihan 3 BAB 7: Text-to-Speech audiobook (expo-speech) ---
  const [playState, setPlayState] = useState("stopped"); // stopped | playing | paused
  const [spokenUpTo, setSpokenUpTo] = useState(0);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const handlePlay = () => {
    if (!book?.sinopsis) return;

    if (playState === "paused") {
      Speech.resume();
      setPlayState("playing");
      return;
    }

    Speech.stop();
    setSpokenUpTo(0);
    setPlayState("playing");
    Speech.speak(book.sinopsis, {
      language: "id-ID",
      rate: 0.95,
      onBoundary: (event) => setSpokenUpTo(event.charIndex + event.charLength),
      onDone: () => {
        setPlayState("stopped");
        setSpokenUpTo(0);
      },
      onStopped: () => setPlayState("stopped"),
      onError: () => setPlayState("stopped"),
    });
  };

  const handlePause = () => {
    Speech.pause();
    setPlayState("paused");
  };

  const handleStop = () => {
    Speech.stop();
    setPlayState("stopped");
    setSpokenUpTo(0);
  };

  if (!book) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Buku dengan ID {id} tidak ditemukan
        </Text>
        <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
          <Text style={{ color: color_list.green }}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <AntDesign name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <AntDesign name="share-alt" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.coverWrapper}>
          <Image source={book.img} style={styles.cover} resizeMode="cover" />
          {!book.is_free && (
            <View style={styles.crownBadge}>
              <AntDesign name="crown" size={16} color="black" />
            </View>
          )}
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.ratingRow}>
          <AntDesign name="star" size={16} color={color_list.orange} />
          <Text style={styles.ratingText}>{book.rating} / 5.0</Text>
        </View>

        <Text style={styles.sectionTitle}>SINOPSIS</Text>
        <Text style={styles.sinopsis}>
          <Text style={styles.sinopsisSpoken}>{book.sinopsis.slice(0, spokenUpTo)}</Text>
          <Text>{book.sinopsis.slice(spokenUpTo)}</Text>
        </Text>

        <View style={styles.audioBar}>
          {playState !== "playing" ? (
            <TouchableOpacity style={styles.audioBtnPrimary} onPress={handlePlay}>
              <AntDesign name="play-circle" size={22} color="white" />
              <Text style={styles.audioBtnText}>
                {playState === "paused" ? "Resume" : "Listen"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.audioBtnPrimary} onPress={handlePause}>
              <AntDesign name="pause-circle" size={22} color="white" />
              <Text style={styles.audioBtnText}>Pause</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.audioBtnSecondary} onPress={handleStop}>
            <AntDesign name="close-circle" size={20} color={color_list.green} />
            <Text style={[styles.audioBtnText, { color: color_list.green }]}>Stop</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.audioHint}>
          Audio-book memanfaatkan expo-speech (text-to-speech). Pause/resume paling stabil di iOS.
        </Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={[styles.actionBtn, { backgroundColor: book.is_free ? color_list.green : color_list.orange }]}
        onPress={() => {
          if (!userData) {
            setShowLoginModal(true);
          }
        }}
      >
        <AntDesign
          name={book.is_free ? "book" : "credit-card"}
          size={18}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.actionBtnText}>{book.is_free ? "Read Book" : "Subscribe"}</Text>
      </TouchableOpacity>

      {/* BAB 8.4 Latihan 2: Modal "Login Required" - guest tidak bisa melihat detail buku */}
      <Modal visible={showLoginModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Login Required</Text>
            <Text style={styles.modalDesc}>Please sign in to read this book</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={handleCancelLogin}>
                <Text style={styles.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSignIn} onPress={handleGoToSignIn}>
                <Text style={styles.modalBtnSignInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color_list.cream },
  centerContainer: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: color_list.cream },
  backLink: { marginTop: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 10 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: color_list.white,
    alignItems: "center",
    justifyContent: "center",
  },
  coverWrapper: { alignItems: "center", marginTop: 5, marginBottom: 15 },
  cover: { width: 180, height: 260, borderRadius: 12 },
  crownBadge: {
    position: "absolute",
    top: -8,
    right: "28%",
    backgroundColor: color_list.orange,
    borderRadius: 14,
    padding: 6,
  },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", paddingHorizontal: 20, color: "#222" },
  author: { fontSize: 14, color: "gray", textAlign: "center", marginTop: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 },
  ratingText: { marginLeft: 6, fontSize: 14, fontWeight: "600", color: "#333" },
  sectionTitle: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 13,
    fontWeight: "bold",
    color: color_list.green,
    letterSpacing: 1,
  },
  sinopsis: { marginTop: 8, marginHorizontal: 20, fontSize: 14, lineHeight: 21, color: "#444" },
  sinopsisSpoken: { backgroundColor: "#49745e33", color: "#222" },
  audioBar: { flexDirection: "row", marginHorizontal: 20, marginTop: 16, gap: 10 },
  audioBtnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color_list.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  audioBtnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color_list.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
  },
  audioBtnText: { color: "white", fontWeight: "600", fontSize: 13 },
  audioHint: { marginHorizontal: 20, marginTop: 8, fontSize: 11, color: "gray", fontStyle: "italic" },
  actionBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  actionBtnText: { color: "white", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 17, fontWeight: "bold", color: "#222" },
  modalDesc: { fontSize: 13, color: "gray", marginTop: 6, textAlign: "center" },
  modalActions: { flexDirection: "row", marginTop: 18, gap: 10, width: "100%" },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalBtnCancelText: { color: "#555", fontWeight: "600" },
  modalBtnSignIn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: color_list.green,
  },
  modalBtnSignInText: { color: "white", fontWeight: "700" },
});
