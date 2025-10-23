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
  "Eletrônicos",
  "Roupas",
  "Livros",
  "Casa & Cozinha",
  "Esporte",
  "Beleza",
];

function makeProducts(qty = 80) {
  return Array.from({ length: qty }).map((_, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    const price = (Math.random() * 500 + 10).toFixed(2);
    return {
      id: String(i + 1),
      name: `${category} Item ${i + 1}`,
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
            ? { elevation: 1 }
            : { shadowOpacity: 0.08, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } }),
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
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
        backgroundColor="#0ea5e9"
      />

      <View style={[styles.headerBar, { paddingVertical: 12 * sizeScale }]}>
        <Text style={[styles.headerTitle, { fontSize: 18 * sizeScale }]}>
          Catálogo Interativo de Produtos
        </Text>
        <Text style={[styles.headerSubtitle, { fontSize: 12 * sizeScale }]}>
          Filtre por nome e explore por categoria
        </Text>
      </View>

      <View style={[styles.searchWrapper, { height: searchHeight }]}>
        <TextInput
          placeholder="Buscar por nome..."
          placeholderTextColor="#64748b"
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
    backgroundColor: "#f1f5f9",
  },
  headerBar: {
    backgroundColor: "#0ea5e9",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  searchWrapper: {
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    color: "#0f172a",
  },
  sectionHeader: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionHeaderText: {
    fontWeight: "700",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  cardPrice: {
    color: "#334155",
  },
  separator: {
    height: 10,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    color: "#0f172a",
    fontWeight: "600",
  },
  emptySub: {
    color: "#334155",
    marginTop: 4,
  },
});
