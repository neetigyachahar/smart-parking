
$(document).ready(function () {

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getLocation();
    setTimeout(() => $(".dismissButton").click(), 3000);

    $("#bookForm").submit(function (e) {
        e.preventDefault();

        const data = JSON.stringify({
            slotName: $("#slotNameValue").val(),
            time: $("#date").val() + " " + $("#time").val()
        });

        fetch('http://localhost:5555/book', {
            method: "POST", body: data, headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        })
            .then((response) => {
                if (response.status !== 201) {
                    throw new Error("Update failed");
                    return;
                }
                return response.json();
            })
            .then(data => {

                alert("Booked Successfully!");
                $("#promptPayment").css('display', 'none');
            })
            .catch(err => {
                alert("Something broke!");
                console.log(err);
            });
    });

});


function showPosition(position) {

    console.log("hello there");

    const data = JSON.stringify({
        xCord: position.coords.latitude,
        yCord: position.coords.longitude
    });

    console.log("Current Location: ", data);


    fetch('http://localhost:5555/parkingSlots', {
        method: "POST", body: data, headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
    })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error("Update failed");
                return;
            }
            return response.json();
        })
        .then(data => {

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: { lat: parseFloat(data.circleXCord), lng: parseFloat(data.circleYCord) },
                mapTypeId: 'roadmap',
                disableDefaultUI: true,
                style: [{ elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] }]
            });

            data.slots.forEach(slot => {

                var marker = new google.maps.Marker({
                    position: { lat: parseFloat(slot.slotXCord), lng: parseFloat(slot.slotYCord) },
                    map: map,
                    circle: data._id,
                    slotName: slot.slotName
                });

                google.maps.event.addListener(marker, 'click', () => booking(data._id, slot.slotName, slot.available));

            });


            $(".bookingPrompt").css('display', 'none');
        })
        .catch(err => {
            alert("Something broke!");
            console.log(err);
        });

}


function booking(circle, slotName, available) {
    console.log("Hee", circle, slotName, available);
    const userName = parseJwt(localStorage.getItem('accessToken')).user.name;
    console.log(userName);

    $("#userNameValue").val(userName);
    $("#slotNameValue").val(slotName);

    $("#nameDetails").text(userName);
    $("#circleDetails").text(circle);
    $("#slotDetails").text(slotName);
    $("#avacountDetails").text(available);
    $("#promptPayment").css('display', 'flex');
}



function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
