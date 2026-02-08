/****************************************************
 *                WEATHER APP (JS)
 *  Ye file poori app ka brain hai
 *  Isme:
 *  - API call hoti hai
 *  - Date format hoti hai
 *  - Day / Night check hota hai
 *  - Weather ke hisaab se image & background change hota hai
 ****************************************************/


/* ================= HTML ELEMENTS KO PAKADNA =================
   document.getElementById ka matlab:
   HTML me jo element ka id diya hai,
   usko JavaScript me use karna
*/

// User jo city likhega
const cityInput = document.getElementById("city-input");

// City ka naam screen pe dikhane ke liye
const city = document.getElementById("city");

// Date dikhane ke liye
const dateEl = document.getElementById("date");

// Temperature dikhane ke liye
const temp = document.getElementById("temp");

// Wind speed dikhane ke liye
const wheter_speed = document.getElementById("wheter-speed");

// Humidity (chances) dikhane ke liye
const chances = document.getElementById("chances");

// Weather image (sun / rain / snow etc.)
const weatherImg = document.getElementById("weather-gif");

// Weather ka text (clear sky, rain etc.)
const conditionText = document.getElementById("condition-text");

// Neeche wala today box
const todayBox = document.getElementById("today-box");

// Search button
const search_btn = document.getElementById("search-btn");

// Poora app card (background change karne ke liye)
const app = document.getElementById("app");


/* ================= API KEY =================
   Ye OpenWeather se milta hai
   Iske bina API kaam nahi karegi
*/
const API_KEY = "69e478ba3852919adab6ffddc557523e";


/* ================= DATE FUNCTION =================
   API hume date number (timestamp) deta hai
   Example: 1767976533
   Ye number human readable nahi hota

   Is function ka kaam:
   - timestamp ko date me convert karna
   - achhe format me dikhana
*/
const setDate = (timestamp) => {

    // timestamp seconds me hota hai
    // JavaScript Date milliseconds me kaam karta hai
    // isliye * 1000
    const d = new Date(timestamp * 1000);

    // toLocaleDateString ka matlab:
    // date ko readable format me badal do
    return d.toLocaleDateString("en-IN", {
        weekday: "long",   // Monday, Tuesday
        day: "numeric",    // 1, 2, 10
        month: "short"     // Jan, Feb
    });
};


/* ================= DAY / NIGHT CHECK =================
   API ye 3 cheeze deta hai:
   - dt        → current time
   - sunrise   → suraj ugne ka time
   - sunset    → suraj dubne ka time

   Logic:
   Agar current time sunrise aur sunset ke beech me hai
   → DAY
   warna → NIGHT
*/
const isDayTime = (current, sunrise, sunset) => {
    return current >= sunrise && current < sunset;
};


/* ================= THEME + IMAGE FUNCTION =================
   Ye function 2 kaam karta hai:
   1. Weather ke hisaab se IMAGE change
   2. Day / Night ke hisaab se BACKGROUND change
*/
const setTheme = (weather, isDay) => {

    /************************************************
     * weather API se aata hai:
     * "Clear", "Rain", "Snow", "Thunderstorm"
     *
     * JavaScript case-sensitive hoti hai
     * "Clear" !== "clear"
     *
     * Isliye hum .toLowerCase() lagate hain
     ************************************************/

    const w = weather.toLowerCase();

    /*
      Example:
      weather = "Clear"
      w = "clear"

      weather = "Rain"
      w = "rain"

      Fayda:
      - comparison easy ho jata hai
      - galti ke chances kam
    */

    // Sabse pehle purani background classes hata dete hain
    app.className = "app";


    /* ================= DAY TIME THEMES ================= */
    if (isDay) {

        // Agar weather clear hai
        if (w === "clear") {
            app.classList.add("summer");        // orange / yellow background
            weatherImg.src = "assets/summer.png";
        }

        // Agar barish ho rahi hai
        else if (w === "rain") {
            app.classList.add("rain");
            weatherImg.src = "assets/rain.png";
        }

        // Agar snow ho
        else if (w === "snow") {
            app.classList.add("snow");
            weatherImg.src = "assets/snow.png";
        }

        // Agar koi aur weather ho
        else {
            app.classList.add("summer");
            weatherImg.src = "assets/summer.png";
        }
    }


    /* ================= NIGHT TIME THEMES ================= */
    else {
        // Raat ke time dark background
        app.classList.add("winter");

        if (w === "rain") {
            weatherImg.src = "assets/rain.png";
        } else {
            weatherImg.src = "assets/winter.png";
        }
    }
};


/* ================= FETCH API FUNCTION =================
   Ye function:
   - city input leta hai
   - API call karta hai
   - data screen pe dikhata hai
*/
const fetchApi = () => {

    // Input se city ka naam lena
    const cityName = cityInput.value.trim();

    // Agar input khaali ho
    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    // OpenWeather API call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {

            // City name + country
            city.innerText = `${data.name}, ${data.sys.country}`;

            // Date
            dateEl.innerText = setDate(data.dt);

            // Temperature
            temp.innerText = `${Math.round(data.main.temp)}°C`;

            // Weather description
            conditionText.innerText = data.weather[0].description;

            // Wind speed
            wheter_speed.innerText = `💨 ${data.wind.speed} km/h`;

            // Humidity
            chances.innerText = `💧 ${data.main.humidity}%`;

            // Today box
            todayBox.innerText =
                `${data.weather[0].main} ${Math.round(data.main.temp)}°`;

            // Day ya Night check
            const day = isDayTime(
                data.dt,
                data.sys.sunrise,
                data.sys.sunset
            );

            // Theme & image set
            setTheme(data.weather[0].main, day);
        })
        .catch(err => alert(err.message));
};


/* ================= EVENT LISTENER =================
   Jab user Search button pe click kare
   tab fetchApi function chale
*/
search_btn.addEventListener("click", fetchApi);
