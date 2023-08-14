export type Coordinates = {
    long: number;
    lat: number
}

export function getGeoPoints(depCoordinate: Coordinates, arrCoordinate:Coordinates, numberPoints: number){
         const newCoordinates: Coordinates[] = []

         for(let i = 0; i< numberPoints; i++){
             let t = i/numberPoints
             const newLong = depCoordinate.long + t * (arrCoordinate.long - depCoordinate.long) 
             const newLat = depCoordinate.lat + t * (arrCoordinate.lat - depCoordinate.lat)
             newCoordinates.push({long: newLong, lat: newLat} as Coordinates) 
         }
         newCoordinates.push({long: arrCoordinate.long, lat: arrCoordinate.lat} as Coordinates)
         console.log(newCoordinates)
         return newCoordinates

}
