import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProgressChart } from 'react-native-chart-kit';

const BudgetScreen = () => {
  const { isDarkMode } = useTheme();
  const [budget, setBudget] = useState('1000');
  const [spent, setSpent] = useState(750);

  const handleSetBudget = () => {
    // TODO: Implement budget setting logic
    console.log('Setting budget:', budget);
  };

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    backgroundGradientTo: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    color: (opacity = 1) => `rgba(${isDarkMode ? '255, 255, 255' : '6, 196, 106'}, ${opacity})`,
  };

  const data = {
    data: [spent / parseFloat(budget)],
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>Monthly Budget</Text>
      <View style={styles.budgetInputContainer}>
        <TextInput
          style={[styles.budgetInput, { color: isDarkMode ? '#FFFFFF' : '#000000', borderColor: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="Enter budget"
          placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />
        <TouchableOpacity style={styles.setBudgetButton} onPress={handleSetBudget}>
          <Text style={styles.setBudgetButtonText}>Set Budget</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        <ProgressChart
          data={data}
          width={300}
          height={200}
          strokeWidth={16}
          radius={42}
          chartConfig={chartConfig}
          hideLegend={true}
        />
      </View>
      <Text style={[styles.spentText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
        Spent: ${spent} / ${budget}
      </Text>
      <Text style={[styles.remainingText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
        Remaining: ${parseFloat(budget) - spent}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  budgetInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  budgetInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  setBudgetButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  setBudgetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  spentText: {
    fontSize: 18,
    marginBottom: 8,
  },
  remainingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BudgetScreen;

