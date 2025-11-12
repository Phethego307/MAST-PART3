import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { MenuItem } from '../types';

export default function FullMenuScreen() {
  const { items } = useMenu();

  const getCourseColor = (course: string) => {
    switch(course) {
      case 'Breakfast': return '#FFD93D';
      case 'Light Meals': return '#6A89CC';
      case 'Desserts': return '#4A90E2';
      default: return '#95A5A6';
    }
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={styles.cardText}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.categoryBadge, { 
          backgroundColor: getCourseColor(item.course) + '33',
          borderColor: getCourseColor(item.course),
        }]}>
          <Text style={[styles.categoryText, { color: getCourseColor(item.course) }]}>
            {item.course}
          </Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.price}>R {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Complete Menu</Text>
        <Text style={styles.subtitle}>All available dishes ({items.length} items)</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No items in menu yet</Text>
          <Text style={styles.emptyText}>Add dishes from the Chef panel</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F2' },

  headerSection: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#34495E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: { flex: 1 },
  cardRight: { justifyContent: 'flex-start', alignItems: 'flex-end' },
  name: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#34495E', 
    marginBottom: 6 
  },
  
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },

  description: { 
    fontSize: 14, 
    color: '#7F8C8D', 
    marginBottom: 8,
    lineHeight: 20,
  },
  price: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#4A90E2' 
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});