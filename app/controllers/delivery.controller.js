app.controller('DeliveryController', function ($scope) {
    $scope.initMap = function () {
        var markerArray = [],
            directionsService = new google.maps.DirectionsService,
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: -34.7101435, lng: -58.2858949}
            }),
            directionsDisplay = new google.maps.DirectionsRenderer({map: map}),
            stepDisplay = new google.maps.InfoWindow;

        $scope.calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
    }

    $scope.calculateAndDisplayRoute = function (directionsDisplay, directionsService, markerArray, stepDisplay, map) {
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        directionsService.route({
            origin: 'universidad de quilmes',
            destination: 'estacion de bernal',
            avoidTolls: true,
            travelMode: google.maps.TravelMode.WALKING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                document.getElementById('distance').innerHTML = response.routes[0].legs[0].distance.text;
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    $scope.initMap();
});