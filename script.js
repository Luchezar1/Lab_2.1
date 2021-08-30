async function weather(coords) {
    const key = '4d0f9bbacf8c555deaac137086416815'; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords['lat']}&lon=${coords['lng']}&appid=${key}`);
    const rezult = await response.json();
    const weather = rezult['weather'][0];

    var temp = rezult['main']['temp']-273.15
    temp = temp.toFixed(1);

    var information = {
        'name': rezult.name,
        'weather': rezult['weather'][0]['description'],
        'icon': `http://openweathermap.org/img/w/${rezult['weather'][0]['icon']}.png`,
        'temp': temp
    };

    return information;
}

function initMap() {
    var coords_cities = { 
        'vinnytsia' : {lat:  49.232823170243904, lng: 28.463282037424015},
       
    };
    var opt = {
        center: coords_cities['vinnytsia'],
        zoom: 6.5
    }
    var myMap = new google.maps.Map(document.getElementById('map'), opt);

    async function setMarker(coords) { 
        var inform = await weather(coords);

        var marker = new google.maps.Marker({ 
            position: coords,
            map: myMap,
            title: `${inform['weather']}`,
            icon: inform['icon']
        });

        var info_click = new google.maps.InfoWindow({ 
            content: `<h3>${inform['name']}</h3><p>${inform['weather']}</p><p>Temperature: ${inform['temp']}</p>`,
        });

        marker.addListener("click", function() {
            info_click.open(myMap, marker);
        });
    }

    setMarker(coords_cities['vinnytsia']);
}