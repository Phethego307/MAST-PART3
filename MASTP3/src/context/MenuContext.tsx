import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MenuItem, Course } from '../types';

// Les 12 plats prédéfinis
const PREDEFINED_MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Golden Sunrise Omelette', description: 'Eggs, cheddar & peppers', course: 'Breakfast', price: '95.00' },
  { id: '2', name: 'Tropical Berry Smoothie', description: 'Mixed berries & coconut milk', course: 'Breakfast', price: '120.00' },
  { id: '3', name: 'Maple Cinnamon Pancakes', description: 'Fluffy pancakes with maple syrup', course: 'Breakfast', price: '140.00' },
  { id: '4', name: 'Full English Delight', description: 'Eggs, mushrooms & baked beans', course: 'Breakfast', price: '160.00' },

  { id: '5', name: 'Mediterranean Falafel Wrap', description: 'Chickpeas, hummus & veggies', course: 'Light Meals', price: '180.00' },
  { id: '6', name: 'Grilled Herb Chicken Bowl', description: 'Chicken, quinoa & greens', course: 'Light Meals', price: '150.00' },
  { id: '7', name: 'Spinach & Feta Quiche', description: 'Cheese & spinach', course: 'Light Meals', price: '130.00' },
  { id: '8', name: 'Tomato Basil Sandwich', description: 'Fresh tomato, basil & mozzarella', course: 'Light Meals', price: '110.00' },

  { id: '9', name: 'Dark Chocolate Brownie', description: 'Rich & gooey with chocolate chips', course: 'Desserts', price: '85.00' },
  { id: '10', name: 'Velvet Raspberry Cupcake', description: 'Cream cheese frosting', course: 'Desserts', price: '95.00' },
  { id: '11', name: 'Zesty Lemon Cheesecake', description: 'Tangy & creamy dessert', course: 'Desserts', price: '100.00' },
  { id: '12', name: 'Fresh Fruit Tart', description: 'Seasonal fruits on buttery crust', course: 'Desserts', price: '110.00' },
];

type MenuContextType = {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  getTotalItems: () => number;
  getItemsByCourse: (course: Course) => MenuItem[];
  getAveragePriceByCourse: () => { course: Course; average: string }[];
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  // Initialise avec les 12 plats prédéfinis
  const [items, setItems] = useState<MenuItem[]>(PREDEFINED_MENU_ITEMS);

  const addItem = (item: MenuItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalItems = () => items.length;
  
  const getItemsByCourse = (course: Course) => items.filter(item => item.course === course);

  const getAveragePriceByCourse = () => {
    const courses: Course[] = ['Breakfast', 'Light Meals', 'Desserts'];
    return courses.map(course => {
      const courseItems = items.filter(item => item.course === course);
      if (courseItems.length === 0) {
        return { course, average: '0.00' };
      }
      const total = courseItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
      const average = (total / courseItems.length).toFixed(2);
      return { course, average };
    });
  };

  return (
    <MenuContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      getTotalItems, 
      getItemsByCourse,
      getAveragePriceByCourse 
    }}>
      {children}
    </MenuContext.Provider>
  );
};