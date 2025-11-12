import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { MenuItem } from '../types';

export default function MenuListScreen({ navigation }: any) {
  const { items, removeItem } = useMenu();

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
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>My Menu</Text>
        <Text style={styles.subtitle}>All your dishes ({items.length} items)</Text>
        
        {/* Add Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('Create Dish')}
        >
          <Text style={styles.addButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No dishes yet</Text>
          <Text style={styles.emptyText}>Add your first dish to get started</Text>
          <TouchableOpacity 
            style={styles.emptyAddButton}
            onPress={() => navigation.navigate('Create Dish')}
          >
            <Text style={styles.emptyAddButtonText}>Create First Dish</Text>
          </TouchableOpacity>
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
    marginBottom: 15,
  },
  
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
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
  cardRight: { 
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
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
    fontSize: 18, 
    fontWeight: '800', 
    color: '#4A90E2',
    marginBottom: 8,
  },
  
  removeButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
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
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyAddButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});