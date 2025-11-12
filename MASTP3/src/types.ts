export type Course = 'Breakfast' | 'Light Meals' | 'Desserts';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: string;
  image?: any; 
};
