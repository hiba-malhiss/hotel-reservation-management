export interface Attraction {
  id: number,
  name: string,
  location: { lat: number, lng: number },
  connections: number[]
}
