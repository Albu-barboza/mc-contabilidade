import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactFormContextType {
    isFormOpen: boolean;
    openForm: () => void;
    closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const ContactFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <ContactFormContext.Provider value={{ isFormOpen, openForm, closeForm }}>
            {children}
        </ContactFormContext.Provider>
    );
};

export const useContactForm = (): ContactFormContextType => {
    const context = useContext(ContactFormContext);
    if (!context) {
        throw new Error('useContactForm must be used within a ContactFormProvider');
    }
    return context;
};
