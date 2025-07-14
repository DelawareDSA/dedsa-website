import { safeFilter } from '@/utils/safeFilter';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

interface AppState {
  theme: 'light' | 'dark';
  isMenuOpen: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
}

type Action =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_MENU' }
  | {
      type: 'ADD_NOTIFICATION';
      payload: Omit<AppState['notifications'][0], 'id'>;
    }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AppState = {
  theme: 'light',
  isMenuOpen: false,
  notifications: [],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: Date.now().toString() },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: safeFilter(state.notifications, 
          (n) => n.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
