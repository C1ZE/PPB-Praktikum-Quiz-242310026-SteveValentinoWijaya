import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOW } from "../theme";

export default function MenuCard({ item, qty, onAdd, onRemove }) {
  return (
    <View style={styles.card}>
      <View style={[styles.emojiWrap, { backgroundColor: item.color + "22" }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          {item.badge && (
            <View style={[styles.badge, { backgroundColor: item.color }]}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.desc} numberOfLines={2}>
          {item.desc}
        </Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString("id-ID")}</Text>
      </View>

      <View style={styles.actionCol}>
        {qty > 0 ? (
          <View style={styles.stepper}>
            <TouchableOpacity style={styles.stepBtn} onPress={onRemove}>
              <Ionicons name="remove" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity style={styles.stepBtn} onPress={onAdd}>
              <Ionicons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    ...SHADOW,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  name: { fontSize: 15, fontWeight: "700", color: COLORS.text, flexShrink: 1 },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },
  desc: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  price: { fontSize: 14, fontWeight: "700", color: COLORS.primary, marginTop: 4 },
  actionCol: { marginLeft: 8 },
  addBtn: {
    backgroundColor: COLORS.primary,
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stepBtn: { padding: 6 },
  qtyText: { minWidth: 18, textAlign: "center", fontWeight: "700", color: COLORS.text },
});
