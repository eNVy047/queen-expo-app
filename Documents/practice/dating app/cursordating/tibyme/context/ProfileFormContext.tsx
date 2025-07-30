import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProfileFormData {
  gender?: string;
  lookingFor?: string;
  goal?: string;
  culture?: string;
  interests?: string[];
  nationality?: string;
  religion?: string;
  bio?: string;
}

interface ProfileFormContextType {
  form: ProfileFormData;
  updateForm: (updates: Partial<ProfileFormData>) => void;
}

const ProfileFormContext = createContext<ProfileFormContextType | undefined>(undefined);

export const ProfileFormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<ProfileFormData>({});

  const updateForm = (updates: Partial<ProfileFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProfileFormContext.Provider value={{ form, updateForm }}>
      {children}
    </ProfileFormContext.Provider>
  );
};

export const useProfileForm = () => {
  const context = useContext(ProfileFormContext);
  if (!context) throw new Error('useProfileForm must be used within a ProfileFormProvider');
  return context;
};
