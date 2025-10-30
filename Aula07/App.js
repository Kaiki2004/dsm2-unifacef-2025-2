import React, { useMemo, useState, useCallback, memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  SectionList,
  StyleSheet,
  useWindowDimensions,
  Platform,
  StatusBar,
} from "react-native";

const CATEGORIES = [
  "Tecnologia",
  "Moda Masculina",
  "Moda Feminina",
  "Games",
  "Livros e Cultura",
  "Acessórios",
  "Beleza & Cuidados",
  "Pets & Cuidados Animais"
];

function makeProducts(qty = 80) {
  return Array.from({ length: qty }).map((_, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    const price = (Math.random() * 800 + 20).toFixed(2);
    return {
      id: String(i + 1),
      name: `${category} - Produto ${i + 1}`,
      price: Number(price),
      category,
    };
  });
}
const ALL_PRODUCTS = makeProducts();

const HeaderSection = memo(({ title, sizeScale }) => {
  return (
    <View style={[styles.sectionHeader, { paddingVertical: 8 * sizeScale }]}>
      <Text style={[styles.sectionHeaderText, { fontSize: 16 * sizeScale }]}>
        {title}
      </Text>
    </View>
  );
});

const ProductRow = memo(({ item, sizeScale }) => {
  const formatted = useMemo(
    () =>
      item.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }),
    [item.price]
  );

  return (
    <View
      style={[
        styles.card,
        {
          padding: 12 * sizeScale,
          borderRadius: 12 * sizeScale,
          ...(Platform.OS === "android"
            ? { elevation: 2 }
            : { shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }),
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, preço ${formatted}`}
    >
      <Text style={[styles.cardTitle, { fontSize: 15 * sizeScale }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.cardPrice, { fontSize: 14 * sizeScale }]}>{formatted}</Text>
    </View>
  );
});

export default function App() {
  const { width, height } = useWindowDimensions();
  const sizeScale = useMemo(() => {
    if (width >= 1000) return 1.25;
    if (width >= 700) return 1.12;
    return 1;
  }, [width]);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  const sections = useMemo(() => {
    const map = new Map();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    }
    const ordered = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, "pt-BR"))
      .map(([title, data]) => ({
        title,
        data: data.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
      }));
    return ordered;
  }, [filtered]);

  const renderItem = useCallback(
    ({ item }) => <ProductRow item={item} sizeScale={sizeScale} />,
    [sizeScale]
  );

  const renderSectionHeader = useCallback(
    ({ section }) => <HeaderSection title={section.title} sizeScale={sizeScale} />,
    [sizeScale]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const searchHeight = Math.max(44, Math.min(56, Math.round(height * 0.06)));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7c3aed"
      />

      <View style={[styles.headerBar, { paddingVertical: 12 * sizeScale }]}>
        <Text style={[styles.headerTitle, { fontSize: 18 * sizeScale }]}>
          Catálogo Digital
        </Text>
        <Text style={[styles.headerSubtitle, { fontSize: 12 * sizeScale }]}>
          Explore nossos produtos por categoria
        </Text>
      </View>

      <View style={[styles.searchWrapper, { height: searchHeight }]}>
        <TextInput
          placeholder="Buscar produtos..."
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          style={[
            styles.searchInput,
            {
              height: searchHeight - 14,
              borderRadius: 12 * sizeScale,
              paddingHorizontal: 14 * sizeScale,
              fontSize: 14 * sizeScale,
            },
          ]}
          accessibilityLabel="Campo de busca de produtos"
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        initialNumToRender={12}
        windowSize={10}
        maxToRenderPerBatch={12}
        removeClippedSubviews={Platform.OS !== "web"}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={[styles.emptyText, { fontSize: 14 * sizeScale }]}>
              Nenhum produto encontrado para “{query}”.
            </Text>
            <Text style={[styles.emptySub, { fontSize: 12 * sizeScale }]}>
              Tente outro termo de busca.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ padding: 16 * sizeScale, paddingBottom: 24 }}
        style={{ flex: 1 }}
        accessibilityLabel="Lista de produtos agrupados por categoria"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // fundo escuro
  },
  headerBar: {
    backgroundColor: "#7c3aed", // roxo neon
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#d1d5db",
    marginTop: 2,
  },
  searchWrapper: {
    backgroundColor: "#1e293b",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  searchInput: {
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "#7c3aed",
    color: "#f8fafc",
  },
  sectionHeader: {
    backgroundColor: "#1e1b4b",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionHeaderText: {
    fontWeight: "700",
    color: "#c4b5fd",
  },
  card: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#475569",
  },
  cardTitle: {
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  cardPrice: {
    color: "#a78bfa",
  },
  separator: {
    height: 10,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "#f8fafc",
    fontWeight: "600",
  },
  emptySub: {
    color: "#a1a1aa",
    marginTop: 4,
  },
});
