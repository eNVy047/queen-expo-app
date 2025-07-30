import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { authAPI } from '@/scripts/api';
import { SplashScreen } from 'expo-router';

// ----------- Types ----
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  contact?: string;
}

interface AuthResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginemail: (email: string, password: string) => Promise<AuthResult>;
  loginphone: (phone: string, otp: string) => Promise<AuthResult>;
  register: (userData: RegisterData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
  refreshUser: () => Promise<void>;
  setToken?: (token: string | null) => void;
  setUser?: (user: User | null) => void;
  setIsAuthenticated?: (auth: boolean) => void;
}


interface AuthProviderProps {
  children: ReactNode;
}

// ----------- Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ----------- Provider -----------
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
  try {
    const storedToken = await SecureStore.getItemAsync('authToken');
    const storedUser = await SecureStore.getItemAsync('userData');


    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      await refreshUser(); 
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
    await SplashScreen.hideAsync(); 
  }
};


  const   loginemail = async (email: string, password: string): Promise<AuthResult> => {
  try {
    setLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    const response = await authAPI.loginWithEmail(payload);
    const { accessToken, refreshToken, user: userData } = response.data.data;
    await SecureStore.setItemAsync('authToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed. Please try again.',
    };
  } finally {
    setLoading(false);
  }
};

 const   loginphone = async (phone: string, otp: string): Promise<AuthResult> => {
  try {
    setLoading(true);

    const payload = {
      phone: phone,
      otp: otp,
    };

    const response = await authAPI.verifyLoginOTP(payload);
    const { accessToken, refreshToken, user: userData } = response.data.data;
    await SecureStore.setItemAsync('authToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));

    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed. Please try again.',
    };
  } finally {
    setLoading(false);
  }
};


  const register = async (userData: RegisterData): Promise<AuthResult> => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token: newToken, user: newUser } = response.data.data;

      await SecureStore.setItemAsync('authToken', newToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await authAPI.logout(); 
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (updatedUser: User): Promise<void> => {
    setUser(updatedUser);
    await SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
  };

  const refreshUser = async (): Promise<void> => {
  try {
    const response = await authAPI.getCurrentUser();
    const updatedUser = response?.data?.data;

    if (!updatedUser) {
      console.warn('⚠️ No user data found in response!');
      return;
    }
    await updateUser(updatedUser);
  } catch (error) {
    console.error('Error refreshing user:', error);
  }
};



 const value: AuthContextType = {
  user,
  token,
  loading,
  isAuthenticated,
  loginemail,
  loginphone,
  register,
  logout,
  updateUser,
  refreshUser,
  setToken,
  setUser,
  setIsAuthenticated,
};


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
