import { useEffect, useState } from "react"
import Prayer from "./components/Prayer"

function App() {
  const [prayerTimes, setPrayerTimes] = useState(null); // Set initial value to null
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  console.log(city);

  const cities = [
    {name : 'Cairo' , value: "Cairo"},
    {name : 'Giza' , value: "Giza"},
    {name : 'Alexandria' , value: "Alexandria"},
    {name : 'Qalyubia' , value: "Qalyubia"},
    {name : 'Port Said' , value: "Port Said"},
    {name : 'Suez' , value: "Suez"},
    {name : 'Ismailia' , value: "Ismailia"},
    {name : 'Dakahlia' , value: "Dakahlia"},
    {name : 'Damietta' , value: "Damietta"},
    {name : 'Sharqia' , value: "Sharqia"},
    {name : 'Gharbia' , value: "Gharbia"},
    {name : 'Monufia' , value: "Monufia"},
    {name : 'Beheira' , value: "Beheira"},
    {name : 'Kafr El Sheikh' , value: "Kafr El Sheikh"},
    {name : 'Fayoum' , value: "Fayoum"},
    {name : 'Beni Suef' , value: "Beni Suef"},
    {name : 'Minya' , value: "Minya"},
    {name : 'Assiut' , value: "Assiut"},
    {name : 'Sohag' , value: "Sohag"},
    {name : 'Qena' , value: "Qena"},
    {name : 'Luxor' , value: "Luxor"},
    {name : 'Red Sea' , value: "Red Sea"},
    {name : 'New Valley (Al Wadi Al Jadid)' , value: "New Valley (Al Wadi Al Jadid)"},
    {name : 'Matruh' , value: "Matruh"},
    {name : 'North Sinai' , value: "North Sinai"},
    {name : 'South Sinai' , value: "South Sinai"},
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=2`);
        const data_Prayar = await response.json();

        setPrayerTimes(data_Prayar.data.timings); // Store the timings
        setDateTime(data_Prayar.data.date.gregorian.date); // Store the date

        console.log(data_Prayar.data.timings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [city]);

  // Check if prayerTimes has been fetched
  if (!prayerTimes) {
    return <div className="loading">Loading...</div>; 
  }

  const formatTimes = (time) => {
    if (!time) {
      return '00:00';
    }
    let [hours, minutes] = time.split(':').map(Number); // Split by colon and convert to numbers
    const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
  
    // Adjust hours to 12-hour format
    hours = hours % 12 || 12;
  
    // Return formatted time (including leading zero for minutes)
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  }

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>City</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_obj) => (
                <option key={city_obj.value} value={city_obj.value}>
                  {city_obj.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>Date</h3>
            <h3>{dateTime}</h3>
          </div>
        </div>

        {/* Render prayer times only after they are available */}
        <Prayer name="Fajr" time={formatTimes(prayerTimes.Fajr)}/>
        <Prayer name="Dhuhr" time={formatTimes(prayerTimes.Dhuhr)}/>
        <Prayer name="Asr" time={formatTimes(prayerTimes.Asr)}/>
        <Prayer name="Maghrib" time={formatTimes(prayerTimes.Maghrib)}/>
        <Prayer name="Isha" time={formatTimes(prayerTimes.Isha)}/> 
      </div>
    </section>
  )
}

export default App;
