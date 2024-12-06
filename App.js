import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import all screens
import DashboardScreen from './src/screens/Dashbordscreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ExpenseHistoryScreen from './src/screens/ExpenseHistoryScreen';
import BudgetScreen from './src/screens/BugetScreen';
import ReportsScreen from './src/screens/Reportscreen';
import GoalsScreen from './src/screens//Goalscreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InvestmentsScreen from './src/screens/InvestmentScreen';
import DebtTrackerScreen from './src/screens/DebtTeaker';
import RecurringExpensesScreen from './src/screens/RecurringExpensesScreen';
import FinancialHealthScreen from './src/screens/FinancialHealthScreen';
import ExpenseAnalysisScreen from './src/screens/ExpenseAnalyticsScreen';
import BudgetPlannerScreen from './src/screens/BudgetPlannerScreen.js';
import TaxCalculatorScreen from './src/screens/TaxCalculatorScreen.js';
import FinancialEducationScreen from './src/screens/FinancialEducationScreen.js';
import ReceiptScannerScreen from './src/screens/ReceiptScannerScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'dashboard';
          else if (route.name === 'Add') iconName = 'add-circle';
          else if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Budget') iconName = 'account-balance-wallet';
          else if (route.name === 'Reports') iconName = 'bar-chart';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="History" component={ExpenseHistoryScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ExpenseAnalysis" component={ExpenseAnalysisScreen} />
      {/* <Stack.Screen name="ExpenseForecast" component={ExpenseForecastScreen} /> */}
      <Stack.Screen name="ReceiptScanner" component={ReceiptScannerScreen} />
      <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={AppStack} options={{ headerShown: false }} />
          <Drawer.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
          <Drawer.Screen name="Investments" component={InvestmentsScreen} />
          <Drawer.Screen name="Debt Tracker" component={DebtTrackerScreen} />
          <Drawer.Screen name="Recurring Expenses" component={RecurringExpensesScreen} />
          <Drawer.Screen name="GoalsScreen" component={GoalsScreen} />
          <Drawer.Screen name="Financial Health" component={FinancialHealthScreen} />
          <Drawer.Screen name="Tax Calculator" component={TaxCalculatorScreen} />
          <Drawer.Screen name="Financial Education" component={FinancialEducationScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

