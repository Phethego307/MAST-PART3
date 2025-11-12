import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext';

export default function HomeScreen({ navigation }: any) {
  const { getTotalItems, getAveragePriceByCourse } = useMenu();
  const averages = getAveragePriceByCourse();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>CC</Text>
          </View>
          <Text style={styles.restaurantName}>Christoffel's Cuisine</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.counterLabel}>Menu Items</Text>
          <View style={styles.counterCircle}>
            <Text style={styles.counterNumber}>{getTotalItems()}</Text>
          </View>
        </View>
      </View>

      {/* Average Prices */}
      <View style={styles.averageSection}>
        <Text style={styles.sectionTitle}>Average Prices by Course</Text>
        {averages.map(({ course, average }) => (
          <View key={course} style={styles.averageCard}>
            <View style={styles.averageLeft}>
              <View 
                style={[
                  styles.courseDot, 
                  { backgroundColor: getCourseColor(course) }
                ]} 
              />
              <Text style={styles.courseName}>{course}</Text>
            </View>
            <Text style={styles.averagePrice}>R {average}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Create Dish')}
        >
          <Text style={styles.actionButtonText}>+ Add New Dish</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.filterButton]}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.actionButtonText}>🔍 Filter Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome Chef! 👨‍🍳</Text>
        <Text style={styles.welcomeText}>
          {getTotalItems() === 0 
            ? "Start by adding your first dish to the menu!"
            : "Manage your restaurant menu with ease. Add, view, and filter dishes."
          }
        </Text>
        <TouchableOpacity 
          style={styles.viewMenuButton}
          onPress={() => navigation.navigate('My Menu')}
        >
          <Text style={styles.viewMenuButtonText}>View My Menu →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getCourseColor = (course: string) => {
  switch(course) {
    case 'Breakfast': return '#FFD93D';
    case 'Light Meals': return '#6A89CC';
    case 'Desserts': return '#4A90E2';
    default: return '#95A5A6';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 18,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4A90E2',
  },
  restaurantName: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  headerRight: {
    alignItems: 'center',
  },
  counterLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  counterCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterNumber: {
    color: '#4A90E2',
    fontWeight: '700',
    fontSize: 16,
  },

  averageSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#34495E',
    marginBottom: 12,
  },
  averageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  averageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  averagePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A90E2',
  },

  actionsSection: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
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
  filterButton: {
    backgroundColor: '#8B5CF6',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  welcomeCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
    lineHeight: 20,
  },
  viewMenuButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewMenuButtonText: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 16,
  },
});