import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { Course, MenuItem } from '../types';

const COURSES: { name: Course; color: string }[] = [
  { name: 'Breakfast', color: '#FFD93D' },
  { name: 'Light Meals', color: '#6A89CC' },
  { name: 'Desserts', color: '#4A90E2' },
];

export default function ChefPanelScreen({ navigation }: any) {
  const { items, addItem, removeItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Breakfast');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      setMessage('Please complete all fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setMessage('Please enter a valid price');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newItem: MenuItem = { 
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parseFloat(price).toFixed(2),
    };

    addItem(newItem);
    setMessage(`"${name}" added successfully!`);
    setTimeout(() => setMessage(''), 3000);

    setName('');
    setDescription('');
    setPrice('');
    setCourse('Breakfast');
  };

  const handleRemove = (id: string, itemName: string) => {
    removeItem(id);
    setMessage(`"${itemName}" removed from menu`);
    setTimeout(() => setMessage(''), 3000);
  };

  const isFormValid = name.trim() && description.trim() && price.trim() && !isNaN(parseFloat(price));

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemCourse}>{item.course}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>R {item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id, item.name)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Message Banner */}
        {message && (
          <View style={styles.messageBanner}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        )}

        {/* Add Item Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New Dish</Text>
          <Text style={styles.subtitle}>Create something delicious!</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dish Name</Text>
            <TextInput 
              placeholder="Enter dish name" 
              value={name} 
              onChangeText={setName} 
              style={styles.input} 
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              placeholder="Describe the dish" 
              value={description} 
              onChangeText={setDescription} 
              style={[styles.input, styles.textArea]} 
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course Type</Text>
            <View style={styles.courseGrid}>
              {COURSES.map((courseOption) => (
                <TouchableOpacity
                  key={courseOption.name}
                  style={[
                    styles.courseOption,
                    { backgroundColor: courseOption.color + '22' },
                    course === courseOption.name && { 
                      borderWidth: 2, 
                      borderColor: courseOption.color, 
                      backgroundColor: courseOption.color + '33' 
                    }
                  ]}
                  onPress={() => setCourse(courseOption.name)}
                >
                  <Text style={[
                    styles.courseText,
                    course === courseOption.name && { 
                      color: courseOption.color, 
                      fontWeight: '700' 
                    }
                  ]}>
                    {courseOption.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price (R)</Text>
            <TextInput 
              placeholder="0.00" 
              value={price} 
              onChangeText={setPrice} 
              style={styles.input} 
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!isFormValid}
            >
              <Text style={styles.saveButtonText}>Add Dish</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.viewMenuButton}
              onPress={() => navigation.navigate('My Menu')}
            >
              <Text style={styles.viewMenuButtonText}>View Full Menu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Menu Items */}
        <View style={styles.menuListContainer}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuListTitle}>Current Menu ({items.length})</Text>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => navigation.navigate('Filter')}
            >
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          {items.length === 0 ? (
            <Text style={styles.emptyText}>No dishes yet</Text>
          ) : (
            <FlatList
              data={items}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F2' },
  content: { padding: 15, paddingBottom: 100 },

  messageBanner: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  messageText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },

  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: '#D1D8E0',
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#F4F6F8',
    fontSize: 16,
    color: '#34495E',
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  courseGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  courseOption: {
    width: '48%',
    padding: 14,
    marginBottom: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  courseText: { 
    fontSize: 12, 
    color: '#7F8C8D', 
    textAlign: 'center' 
  },
  
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  saveButton: {
    flex: 2,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#4A90E2', 
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonDisabled: { 
    backgroundColor: '#CCC', 
    shadowColor: '#999' 
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
  },
  viewMenuButton: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#8B5CF6', 
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  viewMenuButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },

  menuListContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuListTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#34495E',
  },
  filterButton: {
    backgroundColor: '#00B894',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 14,
    paddingVertical: 20,
  },
  menuItem: {
    borderWidth: 2,
    borderColor: '#E8F0F2',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 2,
  },
  menuItemCourse: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4A90E2',
  },
  removeButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});