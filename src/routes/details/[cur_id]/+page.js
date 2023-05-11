export const load = ({ fetch, params }) => {
    const currentCarId = Number(params.cur_id);

    const fetchGPSTrackingById = async () => {
        const res = await fetch("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json")
        const data = await res.json()
        
        return data.filter((d) => d.car_id === currentCarId);
    }

    const fetchGPSTracking = async () => {
        const res = await fetch("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json")
        const data = await res.json()
        return data
    }

    const fetchPointsOfInterestById = async () => {
        const res = await fetch("https://vda-lab.github.io/assets/vast2021_businesses.json")
        const data = await res.json()
        
        return data.filter((d) => d.car_id === currentCarId);
    }


    const fetchCarStopsById = async () => {
        const res = await fetch("https://vda-lab.github.io/assets/vast2021_carstops.json")
        const data = await res.json()
        
        return data.filter((d) => d.car === currentCarId);
    }

    return {
        GPSTracking: fetchGPSTracking(),
        GPSTrackingID: fetchGPSTrackingById(),
        pointsOfInterest: fetchPointsOfInterestById(),
        carStopsID: fetchCarStopsById(),
        currentCarId,
        minuteSlider: 0,
    }
}