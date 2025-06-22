'use client';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Box, Spinner, Text, VStack, HStack, Button } from '@chakra-ui/react';

export default function GoogleMap({ 
  center = { lat: -27.0945, lng: -52.6166 }, 
  zoom = 13,
  height = "500px",
  markers = []
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [expandedMarker, setExpandedMarker] = useState(null);
  const [markerElements, setMarkerElements] = useState([]);

  useEffect(() => {
    const initMap = async () => {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setError('API Key do Google Maps não configurada');
        return;
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'marker']
      });

      try {
        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');
        
        const mapInstance = new Map(mapRef.current, {
          center,
          zoom,
          mapId: 'DEMO_MAP_ID',
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [{"weight": "2.00"}]
            },
            {
              "featureType": "all",
              "elementType": "geometry.stroke",
              "stylers": [{"color": "#9c9c9c"}]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#5e5e5e"}]
            }
          ]
        });

        setMap(mapInstance);
        setIsLoaded(true);

        window.tracarRota = (lat, lng) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                  draggable: true,
                  map: mapInstance,
                });

                directionsService.route(
                  {
                    origin: location,
                    destination: { lat, lng },
                    travelMode: google.maps.TravelMode.DRIVING,
                  },
                  (response, status) => {
                    if (status === "OK") {
                      directionsRenderer.setDirections(response);
                    } else {
                      console.error("Não foi possível traçar a rota: " + status);
                    }
                  }
                );
              },
              () => {
                console.error("Permita o acesso à localização para traçar a rota");
              }
            );
          } else {
            console.error("Geolocalização não suportada pelo navegador");
          }
        };

        const getStatusColor = (status) => {
          switch(status) {
            case 'baixa': return '#22c55e';
            case 'média': return '#eab308';
            case 'alta': return '#ef4444';
            default: return '#6b7280';
          }
        };

        const createMarkerContent = (marker, isExpanded) => {
          return `
            <div style="
              position: absolute;
              bottom: 25px;
              left: 50%;
              transform: translateX(-50%);
              background: white;
              border: none;
              outline: none;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              padding: ${isExpanded ? '16px' : '8px'};
              min-width: ${isExpanded ? '140px' : '140px'};
              max-width: ${isExpanded ? '320px' : '180px'};
              z-index: 1000;
              cursor: pointer;
            ">
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: ${isExpanded ? '8px' : '4px'};
              ">
                <div style="font-size: ${isExpanded ? '20px' : '16px'}; margin-right: 6px;">🏥</div>
                <div style="
                  font-weight: 600;
                  color: #333;
                  font-size: ${isExpanded ? '14px' : '12px'};
                  flex: 1;
                ">${marker.title}</div>
                <div style="
                  width: ${isExpanded ? '12px' : '8px'};
                  height: ${isExpanded ? '12px' : '8px'};
                  border-radius: 50%;
                  background: ${getStatusColor(marker.lotacao)};
                "></div>
              </div>
              
              ${isExpanded ? `
                <div style="
                  font-size: 12px;
                  color: #666;
                  line-height: 1.4;
                  margin-bottom: 12px;
                ">
                  <div style="margin-bottom: 4px;"><strong>Endereço:</strong> ${marker.address || 'Não informado'}</div>
                  <div style="margin-bottom: 4px;"><strong>Lotação:</strong> ${marker.lotacao || 'baixa'}</div>
                  <div style="margin-bottom: 4px;"><strong>Tempo de Espera:</strong> ${marker.tempoEspera || '15min'}</div>
                  <div style="margin-bottom: 4px;"><strong>Fila:</strong> ${marker.filaAtual || '5'} pessoas</div>
                  <div style="margin-bottom: 4px;"><strong>Médicos:</strong> ${marker.medicosDisponiveis || '2'}</div>
                  <div style="margin-bottom: 8px;"><strong>Avaliação:</strong> ${marker.avaliacao || '4.2'}/5</div>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button onclick="tracarRota(${marker.position.lat}, ${marker.position.lng})" style="
                    flex: 1;
                    padding: 6px 10px;
                    background: #2C7A7B;
                    color: white;
                    border: none;
                    outline: none;
                    border-radius: 4px;
                    font-size: 10px;
                    cursor: pointer;
                  ">Traçar Rota</button>
                </div>
              ` : `
                <div style="
                  font-size: 10px;
                  color: #666;
                  line-height: 1.3;
                ">
                  <div>Lotação: ${marker.lotacao || 'baixa'}</div>
                  <div>Espera: ${marker.tempoEspera || '15min'}</div>
                </div>
              `}
            </div>
            
            <div style="
              width: 20px;
              height: 20px;
              background: #2C7A7B;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            "></div>
          `;
        };

        // Criar marcadores iniciais
        const initialMarkers = [];
        markers.forEach((marker, index) => {
          const markerId = marker.id || index;
          
          const markerDiv = document.createElement('div');
          markerDiv.style.cssText = `
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            outline: none;
          `;
          
          markerDiv.innerHTML = createMarkerContent(marker, false);

          const markerElement = new AdvancedMarkerElement({
            map: mapInstance,
            position: marker.position,
            content: markerDiv,
            title: marker.title,
          });

          markerElement.addListener('click', () => {
            setExpandedMarker(expandedMarker === markerId ? null : markerId);
          });

          initialMarkers.push(markerElement);
        });

        setMarkerElements(initialMarkers);

        // Função global para atualizar marcadores sem reinicializar o mapa
        window.updateMapMarkers = (expandedId) => {
          markerElements.forEach(el => el.map = null);
          
          const newMarkers = [];
          markers.forEach((marker, index) => {
            const markerId = marker.id || index;
            const isExpanded = expandedId === markerId;
            
            const markerDiv = document.createElement('div');
            markerDiv.style.cssText = `
              position: relative;
              cursor: pointer;
              transition: all 0.3s ease;
              border: none;
              outline: none;
            `;
            
            markerDiv.innerHTML = createMarkerContent(marker, isExpanded);

            const markerElement = new AdvancedMarkerElement({
              map: mapInstance,
              position: marker.position,
              content: markerDiv,
              title: marker.title,
            });

            markerElement.addListener('click', () => {
              setExpandedMarker(expandedId === markerId ? null : markerId);
            });

            newMarkers.push(markerElement);
          });
          
          setMarkerElements(newMarkers);
        };

      } catch (err) {
        console.error('Erro ao carregar Google Maps:', err);
        setError('Erro ao carregar o mapa. Verifique sua conexão e API Key.');
      }
    };

    initMap();
  }, [center, zoom, markers]);

  // UseEffect separado para atualizar apenas os marcadores quando expandedMarker muda
  useEffect(() => {
    if (window.updateMapMarkers && markerElements.length > 0) {
      window.updateMapMarkers(expandedMarker);
    }
  }, [expandedMarker, markerElements]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          if (map) {
            map.setCenter(location);
            map.setZoom(15);
            
            new google.maps.marker.AdvancedMarkerElement({
              map: map,
              position: location,
              title: "Sua localização",
            });
          }
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setError('Erro ao obter sua localização');
        }
      );
    } else {
      setError('Geolocalização não é suportada neste navegador');
    }
  };

  if (error) {
    return (
      <Box 
        h={height} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="gray.800"
        borderRadius="lg"
      >
        <VStack>
          <Text color="red.300" textAlign="center">{error}</Text>
          <Text color="gray.400" fontSize="sm" textAlign="center">
            Verifique se a API Key está configurada corretamente no arquivo .env.local
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box position="relative" h={height} borderRadius="lg" overflow="hidden">
      {!isLoaded && (
        <Box 
          position="absolute" 
          top="50%" 
          left="50%" 
          transform="translate(-50%, -50%)"
          zIndex="10"
          bg="rgba(0,0,0,0.7)"
          p={4}
          borderRadius="lg"
        >
          <VStack>
            <Spinner size="lg" color="teal.300" />
            <Text color="white" fontSize="sm">Carregando mapa...</Text>
          </VStack>
        </Box>
      )}
      
      {isLoaded && (
        <HStack 
          position="absolute" 
          top="10px" 
          left="10px" 
          zIndex="10"
          spacing={2}
        >
          <Button
            size="sm"
            colorScheme="teal"
            onClick={getCurrentLocation}
            bg="rgba(45, 122, 123, 0.9)"
            _hover={{ bg: "rgba(45, 122, 123, 1)" }}
          >
            📍 Minha Localização
          </Button>
        </HStack>
      )}
      
      <Box ref={mapRef} h="100%" w="100%" />
    </Box>
  );
}
