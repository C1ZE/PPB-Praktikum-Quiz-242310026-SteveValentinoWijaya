import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { COLORS, RADIUS, SHADOW } from "../theme";

export default function LoginScreen() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    await login(username, password);
    setSubmitting(false);
  };

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.accent]} style={styles.bg}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.logoWrap}>
            <Text style={styles.logoEmoji}>🍱</Text>
            <Text style={styles.title}>Cathering</Text>
            <Text style={styles.subtitle}>Pesan makan kantin jadi gampang</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={18} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholder="username"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                autoCapitalize="none"
                placeholder="password"
              />
              <TouchableOpacity onPress={() => setShowPass((s) => !s)}>
                <Ionicons
                  name={showPass ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleLogin}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginText}>Masuk</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.hint}>
              Demo akun FakeStoreAPI sudah terisi otomatis. Tinggal tekan{" "}
              <Text style={{ fontWeight: "700" }}>Masuk</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  logoWrap: { alignItems: "center", marginBottom: 28 },
  logoEmoji: { fontSize: 64 },
  title: { fontSize: 32, fontWeight: "800", color: "#fff", marginTop: 8 },
  subtitle: { color: "#fff", opacity: 0.9, marginTop: 4 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 22,
    ...SHADOW,
  },
  label: { fontSize: 12, fontWeight: "700", color: COLORS.textLight, marginBottom: 6, marginTop: 12 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: { flex: 1, paddingVertical: 10, marginLeft: 8, color: COLORS.text },
  errorText: { color: COLORS.danger, marginTop: 10, fontSize: 12 },
  loginBtn: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  hint: { fontSize: 11, color: COLORS.textLight, marginTop: 14, textAlign: "center" },
});
