import { createContext, useEffect, useState } from "react";
import { getUser } from "./users-service";

import { getProfileForUser } from "./api/profiles-api";
import { getAccountsForUser } from "./api/accounts-api";
import { getBudget} from "./api/budgets-api";
import { listExpenses } from "./api/expenses-api";
import { getIncomes } from "./api/incomes-api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [activeAccounts, setActiveAccounts] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  // Set active items here like accounts, transactions, etc..

  useEffect(() => {
    fetchData();
  }, []);

  // Will fetch data here for active selection, could be accounts, user, income, expense
  useEffect(() => {
    if (activeProfile) {
      fetchAccountDetails();
    }
  }, [activeProfile]);
  
  const fetchData = async () => {
    try {
      const user = await getUser();
      setUser(user);
      const profile = await getProfileForUser();
      setActiveProfile(profile);
    } catch (err) {
      console.log('Error at DataContext.js fetchData', err);
    }
  };

  // This could be where we fetch all data for the user and store in a context file that can be used everywhere
  const fetchAccountDetails = async () => {
    try {
      const accounts = await getAccountsForUser();
      setActiveAccounts(accounts);
    } catch (err) {
      console.log('Error at DataContext.js fetchAccountDetails', err);
    }
  };

  // console.log('activeAccounts', activeAccounts)
  // console.log('activeProfile', activeProfile)

  return (
    <DataContext.Provider
      value={{
        activeAccounts: activeAccounts || [],
        setActiveAccounts,
        profile: activeProfile || null,
        setActiveProfile,
        fetchData, 
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
