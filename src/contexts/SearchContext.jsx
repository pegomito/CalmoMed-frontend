'use client';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedMarker, setHighlightedMarker] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const searchPosto = (term) => {
    setSearchTerm(term);
    
    // Lista de postos disponíveis para pesquisa
    const postos = [
      { id: "ubs-centro", name: "UBS Centro", position: { lat: -27.0945, lng: -52.6166 } },
      { id: "ubs-efapi", name: "UBS Efapi", position: { lat: -27.1120, lng: -52.6330 } },
      { id: "esf-bela-vista", name: "ESF Bela Vista", position: { lat: -27.0820, lng: -52.6050 } },
      { id: "ubs-jardim-america", name: "UBS Jardim América", position: { lat: -27.0880, lng: -52.6100 } },
      { id: "ubs-passo-dos-fortes", name: "UBS Passo dos Fortes", position: { lat: -27.1050, lng: -52.6200 } },
      { id: "ubs-santa-maria", name: "UBS Santa Maria", position: { lat: -27.1200, lng: -52.6400 } },
      { id: "ubs-sao-pedro", name: "UBS São Pedro", position: { lat: -27.0800, lng: -52.6350 } }
    ];

    if (!term.trim()) {
      setHighlightedMarker(null);
      return;
    }

    // Buscar posto que corresponde ao termo de pesquisa
    const foundPosto = postos.find(posto => 
      posto.name.toLowerCase().includes(term.toLowerCase())
    );

    if (foundPosto && mapInstance) {
      // Centralizar mapa no posto encontrado
      mapInstance.setCenter(foundPosto.position);
      mapInstance.setZoom(16);
      
      // Destacar o marcador
      setHighlightedMarker(foundPosto.id);
      
      // Remover destaque após 3 segundos
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
