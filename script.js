$(document).ready(function () {
    var baseURL = "https://api.openweathermap.org";
    var apiKey = config.MY_KEY + config.Secret_key;

    //add click func
    $("#search").click(function(){
        const locations = $("#location").val();
       
        //checks if user input is a number
        var hasNumber = /\d/;   
        
        //used .test() method to check if const locations contains digits
        const isNum = hasNumber.test(locations); 

        if(isNum === true){
            var URL = `${baseURL}/data/2.5/weather?zip=${locations}&appid=${apiKey}&units=imperial`;

            weatherApp(URL);
        } else {
            var URL = `${baseURL}/data/2.5/weather?q=${locations}&limit=1&appid=${apiKey}&units=imperial`;

            weatherApp(URL);
        }   
    })
});

//created this function to clean up my code
function weatherApp(URL){

    $.ajax({
        url: URL,
        method: "GET",
        success: function(data){
             
            console.log(data.cod);
                let weatherInfo = `<h2>Weather in ${data.name}, ${data.sys.country}</h2>`;
                weatherInfo += `<p>Temperature: ${data.main.temp}° F</p>`;
                weatherInfo += `<p>Weather: ${data.weather[0].description}</p>`;
                weatherInfo += `<p>Humidity: ${data.main.humidity}%</p>`;
                weatherInfo += `<p>Wind Speed: ${data.wind.speed}mph</p>`;

                $("#weather-info").html(weatherInfo);
                
            },
            error: function(xhr, status, error){
                $("#error").html(`${error}. Please try again.`);
            }
    })
}