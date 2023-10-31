const Domain = import.meta.env.VITE_ENDPOINT
  ? import.meta.env.VITE_ENDPOINT
  : 'http://localhost:3002';

export default Domain;
