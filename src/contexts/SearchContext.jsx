'use client';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedMarker, setHighlightedMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [postos, setPostos] = useState([]);

  const searchPosto = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setHighlightedMarker(null);
      return;
    }

    const foundPosto = postos.find(posto => 
      posto.name?.toLowerCase().includes(term.toLowerCase()) ||
      posto.id?.toString().toLowerCase().includes(term.toLowerCase()) ||
      posto.address?.toLowerCase().includes(term.toLowerCase())
    );

    if (foundPosto && mapInstance) {
      const position = {
        lat: parseFloat(foundPosto.latitude),
        lng: parseFloat(foundPosto.longitude)
      };
      
      mapInstance.setCenter(position);
      mapInstance.setZoom(16);
      
      setHighlightedMarker(foundPosto.id);
      
      setTimeout(() => {
        setHighlightedMarker(null);
      }, 3000);
    }
  };

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      highlightedMarker,
      setHighlightedMarker,
      mapInstance,
      setMapInstance,
      postos,
      setPostos,
      searchPosto
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
