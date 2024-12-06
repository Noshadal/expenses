import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [quickExpense, setQuickExpense] = useState('');
  const [recentTransactions, setRecentTransactions] = useState([
    { id: '1', amount: 50, category: 'Groceries', date: '2023-05-10' },
    { id: '2', amount: 30, category: 'Transport', date: '2023-05-09' },
    { id: '3', amount: 100, category: 'Entertainment', date: '2023-05-08' },
  ]);

  const addQuickExpense = () => {
    if (quickExpense.trim() !== '') {
      const newExpense = {
        id: Date.now().toString(),
        amount: parseFloat(quickExpense),
        category: 'Uncategorized',
        date: new Date().toISOString().split('T')[0],
      };
      setRecentTransactions([newExpense, ...recentTransactions]);
      setQuickExpense('');
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={[styles.transactionItem, { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' }]}>
      <View>
        <Text style={[styles.transactionAmount, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          ${item.amount.toFixed(2)}
        </Text>
        <Text style={[styles.transactionCategory, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
          {item.category}
        </Text>
      </View>
      <Text style={[styles.transactionDate, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>
        {item.date}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
      <View style={styles.quickExpenseContainer}>
        <TextInput
          style={[styles.quickExpenseInput, { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Enter quick expense"
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
          keyboardType="numeric"
          value={quickExpense}
          onChangeText={setQuickExpense}
        />
        <TouchableOpacity style={styles.quickExpenseButton} onPress={addQuickExpense}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>This Month</Text>
          <Text style={[styles.summaryAmount, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>$1,250.00</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: isDarkMode ? '#AAAAAA' : '#666666' }]}>This Week</Text>
          <Text style={[styles.summaryAmount, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>$350.00</Text>
        </View>
      </View>
      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.transactionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  quickExpenseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  quickExpenseInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  quickExpenseButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionCategory: {
    fontSize: 14,
  },
  transactionDate: {
    fontSize: 14,
  },
});

export default DashboardScreen;

