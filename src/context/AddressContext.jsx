import { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext();

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddresses must be used within AddressProvider');
  }
  return context;
};

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('addresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        fullName: 'Jennifer Aniston',
        phoneNumber: '+1 (555) 123-4567',
        pincode: '90210',
        addressLine1: '123 Organic Lane',
        addressLine2: 'Freshville',
        landmark: 'Near Central Park',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        addressType: 'home',
        isDefault: true,
        mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop'
      },
      {
        id: 2,
        fullName: 'Jennifer Aniston',
        phoneNumber: '+1 (555) 987-6543',
        pincode: '90211',
        addressLine1: '456 Gusto Tower',
        addressLine2: 'Foodie City',
        landmark: 'Near Mall',
        city: 'Los Angeles',
        state: 'California',
        country: 'USA',
        addressType: 'work',
        isDefault: false,
        mapImage: 'https://images.unsplash.com/photo-1605505a904993-85066ab7b002?w=600&h=300&fit=crop'
      }
    ];
  });

  // Save to localStorage whenever addresses change
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(),
      mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop'
    };

    // If new address is set as default, remove default from others
    if (newAddress.isDefault) {
      setAddresses(prev => [
        ...prev.map(addr => ({ ...addr, isDefault: false })),
        newAddress
      ]);
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }

    return newAddress;
  };

  const updateAddress = (id, addressData) => {
    setAddresses(prev => {
      const updated = prev.map(addr => {
        if (addr.id === parseInt(id)) {
          return { ...addr, ...addressData };
        }
        // If updated address is set as default, remove default from others
        if (addressData.isDefault && addr.id !== parseInt(id)) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });
      return updated;
    });
  };

  const deleteAddress = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(addr => addr.id !== parseInt(id));
      
      // If deleted address was default and there are remaining addresses,
      // set the first one as default
      const deletedAddr = prev.find(addr => addr.id === parseInt(id));
      if (deletedAddr?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true;
      }
      
      return filtered;
    });
  };

  const getAddressById = (id) => {
    return addresses.find(addr => addr.id === parseInt(id));
  };

  const value = {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getAddressById
  };

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};
