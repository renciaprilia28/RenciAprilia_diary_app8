import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOOD_FILTERS = ["Semua", "😊", "🤓", "📚", "😐", "😔", "😠"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const totalDiary = entries.length;
  const totalFavorite = entries.filter((item) => item.liked).length;

  const [selectedMood, setSelectedMood] = useState("Semua");

  const filteredEntries =
    selectedMood === "Semua"
      ? entries
      : entries.filter((item) => item.mood === selectedMood);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      {/* Statistik Total Diary & Total Favorite */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: COLORS.danger }]}>
            {totalFavorite}
          </Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      {/* Filter Mood */}
      <View style={{ marginBottom: SPACE.m }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {MOOD_FILTERS.map((mood) => {
            const active = selectedMood === mood;
            return (
              <Pressable
                key={mood}
                onPress={() => setSelectedMood(mood)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {mood}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: { id: String(item.id) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Belum ada catatan diary</Text>
            <Text style={styles.emptyDesc}>
              {selectedMood === "Semua"
                ? "Mulai tulis ceritamu hari ini melalui tab Tambah."
                : `Tidak ditemukan diary dengan mood ${selectedMood}.`}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  filterRow: {
    gap: SPACE.s,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: SPACE.l,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
  },
});