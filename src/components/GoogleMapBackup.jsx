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
              "elementType": "labels.text",
              "stylers": [{"visibility": "on"}]
            }
          ]
        });

        setMap(mapInstance);
        setIsLoaded(true);

        window.tracarRota = (lat, lng) => {
          if (userLocation) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              draggable: true,
              map: mapInstance,
            });

            directionsService.route(
              {
                origin: userLocation,
                destination: { lat, lng },
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === "OK") {
                  directionsRenderer.setDirections(response);
                } else {
                  alert("Não foi possível traçar a rota: " + status);
                }
              }
            );
          } else {          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                  setUserLocation(location);
                  
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
                        alert("Não foi possível traçar a rota: " + status);
                      }
                    }
                  );
                },
                () => {
                  alert("Permita o acesso à localização para traçar a rota");
                }
              );
            } else {
              alert("Geolocalização não suportada pelo navegador");
            }
          }
        };

        window.expandMarker = (markerId) => {
          setExpandedMarker(expandedMarker === markerId ? null : markerId);
        };

        const getStatusColor = (status) => {
          switch(status) {
            case 'baixa': return '#22c55e';
            case 'média': return '#eab308';
            case 'alta': return '#ef4444';
            default: return '#6b7280';
          }
        };

        markers.forEach((marker, index) => {
          // Criar um elemento customizado para o marcador com informações visíveis
          const markerDiv = document.createElement('div');
          markerDiv.innerHTML = `
            <div style="
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
            ">
              <!-- Informações sempre visíveis -->
              <div style="
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #2C7A7B;
                border-radius: 8px;
                padding: 8px 12px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                min-width: 200px;
                margin-bottom: 8px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  margin-bottom: 6px;
                ">
                  <div style="font-size: 16px; margin-right: 6px;">🏥</div>
                  <div style="
                    font-weight: 600;
                    color: #333;
                    font-size: 12px;
                    flex: 1;
                  ">${marker.title}</div>
                  <div style="
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: ${getStatusColor(marker.lotacao)};
                  "></div>
                </div>
                <div style="
                  font-size: 10px;
                  color: #666;
                  line-height: 1.3;
                ">
                  <div>Lotação: ${marker.lotacao || 'baixa'}</div>
                  <div>Espera: ${marker.tempoEspera || '15min'}</div>
                </div>
              </div>
              
              <!-- Pino do marcador -->
              <div style="
                width: 20px;
                height: 20px;
                background: #2C7A7B;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
              "></div>
            </div>
          `;

          const markerElement = new AdvancedMarkerElement({
            map: mapInstance,
            position: marker.position,
            content: markerDiv,
            title: marker.title,
          });

          // Adicionar click para detalhes ou rota se necessário
          markerElement.addListener('click', () => {
            const confirmed = confirm(`Ver mais detalhes de ${marker.title}?`);
            if (confirmed) {
              window.verDetalhes(marker.id || index);
            }
          });
        });

      } catch (err) {
        console.error('Erro ao carregar Google Maps:', err);
        setError('Erro ao carregar o mapa. Verifique sua conexão e API Key.');
      }
    };

    initMap();
  }, [center, zoom, markers]);

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
        border="1px solid"
        borderColor="gray.600"
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
