import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useOrders } from "../context/OrderContext";
import { COLORS, RADIUS, SHADOW } from "../theme";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { orders } = useOrders();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, paddingTop: insets.top + 10 }}>
      <Text style={styles.pageTitle}>Riwayat Transaksi 🧾</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 60 }}>📭</Text>
          <Text style={styles.emptyText}>Belum ada transaksi</Text>
          <Text style={styles.emptySub}>Pesanan yang sudah checkout akan muncul di sini</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const isExpanded = expandedId === item.id;
            return (
              <TouchableOpacity
                style={styles.orderCard}
                activeOpacity={0.8}
                onPress={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="receipt-outline" size={18} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.orderId}>{item.id}</Text>
                    <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.itemCount}>
                    {item.items.reduce((s, i) => s + i.qty, 0)} item
                  </Text>
                  <Text style={styles.orderTotal}>
                    Rp {item.total.toLocaleString("id-ID")}
                  </Text>
                </View>

                {isExpanded && (
                  <View style={styles.detailWrap}>
                    {item.items.map((it) => (
                      <View key={it.id} style={styles.detailRow}>
                        <Text style={styles.detailEmoji}>{it.emoji}</Text>
                        <Text style={styles.detailName}>
                          {it.name} x{it.qty}
                        </Text>
                        <Text style={styles.detailPrice}>
                          Rp {(it.price * it.qty).toLocaleString("id-ID")}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: { fontSize: 22, fontWeight: "800", color: COLORS.text, paddingHorizontal: 20, marginBottom: 10 },
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginTop: 10 },
  emptySub: { color: COLORS.textLight, marginTop: 4, textAlign: "center", paddingHorizontal: 40 },
  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 12,
    ...SHADOW,
  },
  orderHeader: { flexDirection: "row", alignItems: "center" },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary + "22",
    alignItems: "center",
    justifyContent: "center",
  },
  orderId: { fontWeight: "700", color: COLORS.text, fontSize: 13 },
  orderDate: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  statusBadge: {
    backgroundColor: COLORS.success + "22",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusText: { color: COLORS.success, fontSize: 11, fontWeight: "700" },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  itemCount: { color: COLORS.textLight, fontSize: 12 },
  orderTotal: { fontWeight: "800", color: COLORS.primary },
  detailWrap: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  detailEmoji: { fontSize: 16, marginRight: 8 },
  detailName: { flex: 1, fontSize: 12, color: COLORS.text },
  detailPrice: { fontSize: 12, color: COLORS.textLight },
});
