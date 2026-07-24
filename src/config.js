const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If loaded in local network, fallback to the current page's hostname on port 5000
  if (typeof window !== "undefined" && window.location) {
    const { hostname } = window.location;
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      // Check if hostname is an IP address format
      if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname)) {
        return `http://${hostname}:5000`;
      }
    }
  }
  return "http://localhost:5000";
};

export const API_URL = getApiUrl();
