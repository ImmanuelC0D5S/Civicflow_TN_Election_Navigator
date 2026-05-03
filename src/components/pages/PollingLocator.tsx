import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useDebouncedValue } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { Search, Navigation, Info, X, MapPin, AlertCircle } from 'lucide-react';
import { cn } from '../atoms/Button';
import { MOCK_BOOTHS } from '../../data/tn_mock_data';
import { useLanguage } from '../../contexts/LanguageContext';

const center = {
  lat: 10.7905, // Center of Tamil Nadu
  lng: 78.7047
};

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '700px',
};

const mapOptions = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

export const PollingLocator: React.FC = () => {
  const { language } = useLanguage();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedBooth, setSelectedBooth] = useState<typeof MOCK_BOOTHS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(searchQuery, 300);

  const memoizedMapOptions = useMemo(() => mapOptions, []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getName = useCallback((item: Record<string, any>) => language === 'en' ? item.name_en : item.name_ta, [language]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAddress = useCallback((item: Record<string, any>) => language === 'en' ? item.address_en : item.address_ta, [language]);

  const filteredBooths = useMemo(() => {
    if (!debouncedQuery) return MOCK_BOOTHS;
    const lowerQ = debouncedQuery.toLowerCase();
    return MOCK_BOOTHS.filter(b => 
      b.name_en.toLowerCase().includes(lowerQ) || 
      b.name_ta.includes(lowerQ) ||
      getAddress(b).toLowerCase().includes(lowerQ)
    );
  }, [debouncedQuery, getAddress]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredBooths.length > 0 && map) {
      map.panTo(filteredBooths[0].coordinates);
      map.setZoom(14);
      setSelectedBooth(filteredBooths[0]);
    }
  };

  return (
    <div className="bg-background min-h-[calc(100vh-5rem)] relative overflow-hidden">
      {/* Map Backdrop */}
      <div className="absolute inset-0 z-0">
        {!apiKey ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface-high border border-white/5">
             <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Maps API Key Missing</h3>
             <p className="text-text-muted text-sm text-center max-w-md">Please configure your VITE_GOOGLE_MAPS_API_KEY in the .env file to enable interactive maps.</p>
          </div>
        ) : loadError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface-high border border-white/5">
             <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Failed to load Map</h3>
             <p className="text-text-muted text-sm text-center max-w-md">Please check your network or API key configuration.</p>
          </div>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={memoizedMapOptions}
          >
            {filteredBooths.map((booth) => (
              <Marker
                key={booth.id}
                position={booth.coordinates}
                onClick={() => setSelectedBooth(booth)}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FFC107" stroke="#121414" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="#121414"></circle></svg>`),
                  scaledSize: new google.maps.Size(40, 40),
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-high animate-pulse">
            <span className="text-text-muted font-bold tracking-widest uppercase text-xs">INITIALIZING MAP SENSORS...</span>
          </div>
        )}
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row gap-6 h-full pointer-events-none">
        {/* Left Side: Search & Results */}
        <div className="w-full md:w-[400px] flex flex-col gap-6 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel-high p-8 shadow-neon-saffron"
          >
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Booth Locator</h1>
            <p className="text-xs text-text-muted mb-8 font-medium">Locate your designated polling station across Tamil Nadu.</p>
            
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search constituency or area..."
                className="input-sovereign w-full pl-12"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel flex-grow overflow-hidden flex flex-col max-h-[500px]"
          >
            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {filteredBooths.length} STATIONS FOUND
              </span>
            </div>
            <div className="overflow-y-auto divide-y divide-white/5 custom-scrollbar">
              {filteredBooths.map((booth) => (
                <button 
                  key={booth.id}
                  onClick={() => {
                    setSelectedBooth(booth);
                    map?.panTo(booth.coordinates);
                    map?.setZoom(15);
                  }}
                  className={cn(
                    "w-full p-6 text-left transition-all hover:bg-white/5 group",
                    selectedBooth?.id === booth.id ? "bg-primary/10 border-l-2 border-primary" : ""
                  )}
                >
                  <h4 className={cn(
                    "text-sm font-bold uppercase tracking-tight mb-1 group-hover:text-primary transition-colors",
                    selectedBooth?.id === booth.id ? "text-primary" : "text-text-primary"
                  )}>{getName(booth)}</h4>
                  <p className="text-[10px] text-text-muted font-medium">{getAddress(booth)}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Booth Info (Bottom/Right) */}
        {selectedBooth && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-auto md:ml-auto md:mb-0 mb-4 w-full md:w-[450px] glass-panel-high p-8 pointer-events-auto border-t-4 border-t-primary shadow-neon-saffron"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">Station Details</span>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{getName(selectedBooth)}</h2>
              </div>
              <button 
                onClick={() => setSelectedBooth(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-surface-high border border-white/5 h-fit">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1 text-primary">Location</h4>
                  <p className="text-sm font-medium leading-relaxed">{getAddress(selectedBooth)}</p>
                </div>
              </div>

              {selectedBooth.accessibility && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <Info className="w-4 h-4 text-secondary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Elderly & Disability Accessible</span>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.coordinates.lat},${selectedBooth.coordinates.lng}`, '_blank', 'noopener,noreferrer')}
                className="btn-primary-sovereign flex-grow py-4"
              >
                <Navigation className="w-4 h-4 mr-3" /> GET DIRECTIONS
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
