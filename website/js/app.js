// global variable

let siteURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&APPID=d50ca68a612be138961139470bfa48ed';

let d = new Date();
let newDate = d.getDate()+'.'+ d.getMonth()+'.'+d.getFullYear();


document.getElementById('generate').addEventListener('click', (e) => {
    e.preventDefault();

    const newCity = document.getElementById('city').value;
    
    getWeather(siteURL, newCity, apiKey)

    .then(function(data){
        
        console.log(data);
        postData('/add', {date: newDate, temp: data.main.temp, humidity: data.main.humidity, 
            weather: data.weather[0].main, pressure: data.main.pressure})
        updateUI();
    });
});


const getWeather = async(siteURL, city, key) => {
    const res = await fetch(siteURL+city+key)
    try {
        const data = res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async() => {
    const req = await fetch('/all')
    try {
        const allData = await req.json();

        document.getElementById('date').innerHTML = `Date : ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temp} k`;
        document.getElementById('humidity').innerHTML = `Humidity : ${allData.humidity}%`;
        document.getElementById('weather').innerHTML = `Weather : ${allData.weather}`;
        document.getElementById('pressure').innerHTML = `Pressure : ${allData.pressure} pascal`;

    } catch (error) {
        console.log("error", error);
    }
}

const postData  = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            humidity: data.humidity,
            weather: data.weather,
            pressure: data.pressure
        })
    });

    try {
        const newData = response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error)
    }
}