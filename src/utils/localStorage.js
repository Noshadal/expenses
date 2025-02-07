import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveExpense = async (expense) => {
  try {
    const existingExpenses = await getExpenses();
    const updatedExpenses = [...existingExpenses, expense];
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Error saving expense:', error);
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await AsyncStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

