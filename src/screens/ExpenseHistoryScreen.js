import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ExpenseHistoryScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load expenses when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
    }, [])
  );

  // Function to load expenses from local storage
  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  // Function to save expenses to local storage
  const saveExpenses = async (expenses) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  // Function to delete an expense
  const deleteExpense = (id) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            await saveExpenses(updatedExpenses); // Save updated expenses to local storage
            setExpenses(updatedExpenses); // Update state to reflect changes
          },
        },
      ]
    );
  };

  // Right swipeable actions
  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteExpense(id)}
      >
        <Icon name="delete" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  // Filter logic for expenses
  const filteredExpenses = expenses.filter(expense => {
    if (filter === 'all') return true;
    const expenseDate = new Date(expense.date);
    const today = new Date();
    if (filter === 'daily') return expenseDate.toDateString() === today.toDateString();
    if (filter === 'weekly') return expenseDate >= new Date(today.setDate(today.getDate() - 7));
    if (filter === 'monthly') return expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear();
  });

  // Render expense item
  const renderExpenseItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.expenseItem}>
        <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        <Text style={styles.expenseCategory}>{item.category}</Text>
        <Text style={styles.expenseDate}>{item.date}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Expense History</Text>
        <View style={styles.filterContainer}>
          {['all', 'daily', 'weekly', 'monthly'].map(filterType => (
            <TouchableOpacity
              key={filterType}
              style={[styles.filterButton, filter === filterType && styles.activeFilter]}
              onPress={() => setFilter(filterType)}
            >
              <Text style={styles.filterButtonText}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={item => item.id}
          style={styles.expenseList}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default ExpenseHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#DDDDDD',
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  expenseList: {
    flex: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseCategory: {
    fontSize: 16,
  },
  expenseDate: {
    fontSize: 14,
    color: '#666666',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});
