'use client';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedMarker, setHighlightedMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const searchPosto = (term) => {
    setSearchTerm(term);
    
    const postos = [
      { id: "ubs-centro", name: "UBS Centro", position: { lat: -27.0945, lng: -52.6166 } },
      { id: "ubs-efapi", name: "UBS Efapi", position: { lat: -27.0798, lng: -52.6045 } },
      { id: "esf-bela-vista", name: "ESF Bela Vista", position: { lat: -27.0756, lng: -52.6445 } },
      { id: "ubs-jardim-america", name: "UBS Jardim América", position: { lat: -27.0823, lng: -52.6298 } },
      { id: "ubs-passo-fortes", name: "UBS Passo dos Fortes", position: { lat: -27.0923, lng: -52.6389 } },
      { id: "ubs-santa-maria", name: "UBS Santa Maria", position: { lat: -27.1054, lng: -52.5987 } },
      { id: "ubs-sao-pedro", name: "UBS São Pedro", position: { lat: -27.1125, lng: -52.6203 } },
      { id: "ubs-sao-cristovao", name: "UBS São Cristóvão", position: { lat: -27.1178, lng: -52.6134 } }
    ];

    if (!term.trim()) {
      setHighlightedMarker(null);
      return;
    }

    const foundPosto = postos.find(posto => 
      posto.name.toLowerCase().includes(term.toLowerCase()) ||
      posto.id.toLowerCase().includes(term.toLowerCase()) ||
      posto.name.toLowerCase().replace(/ubs|esf/g, '').trim().includes(term.toLowerCase())
    );

    if (foundPosto && mapInstance) {
      mapInstance.setCenter(foundPosto.position);
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
