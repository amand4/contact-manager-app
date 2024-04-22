
export async function getLocation(address) {
  if (!address) return;
  try {
    const results = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=AIzaSyDeWPGceHoDq87CB8b7Tdh73T2cc8ezB9U`)
      .then((res) => res.json());
    if (results.status === 'OK' && results.results.length > 0) {
      const { lat, lng } = results.results[0].geometry.location;

      return { lat, lng }
    } else {
      console.error('Endereço não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
  }
}

export const googleMapsServices = {
  getLocation
}