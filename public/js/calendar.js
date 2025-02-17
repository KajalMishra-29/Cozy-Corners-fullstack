document.addEventListener('DOMContentLoaded', function () {
    let listingId = window.location.pathname.split("/")[2];
    let SelectedDate = null;
    const calendarEl = document.getElementById('calendar');
    const bookBtn = document.getElementById('bookBtn');
    const bookingNumber = document.getElementById('booking-number');


    // fetch booked dates from backend and mark them
    function fetchAndMarkNookedDates() {
        fetch(`/listings/${listingId}/bookings/bookedDates`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.dates) {
                    let dateArr = data.dates;
                    markBookedDates(dateArr);
                    let todayDate = new Date().toLocaleDateString("en-CA");
                    let upcomingBookings = dateArr.filter(date => date > todayDate);
                    if (upcomingBookings.length > 0) {
                        bookingNumber.innerText = `There are ${upcomingBookings.length} scheduled bookings in the upcoming days.`
                    } else {
                        bookingNumber.innerText = "No upcoming bookings at this moment!";
                    }
                } else {
                    console.log("No booked dates found");
                }
            })
            .catch(err => console.log(err));
    }
    // Function to mark booked dates
    function markBookedDates(bookedDates) {
        bookedDates.forEach(date => {
            let elements = document.querySelectorAll(`[data-date='${date}']`);
            elements.forEach(el => {
                console.log(el)
                el.style.backgroundColor = "#cccccc";
            });
        });
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: "bootstrap",
        initialView: 'dayGridMonth',
        selectable: true,

        validRange: function () {
            let today = new Date();
            return {
                start: new Date(today.getFullYear(), today.getMonth(), 1),
                end: new Date(today.getFullYear(), today.getMonth() + 6, 0)
            };
        },
        dayCellDidMount: function (info) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let cellDate = info.date;
            cellDate.setHours(0, 0, 0, 0);
            if (cellDate < today) {
                info.el.style.backgroundColor = "#eeeeee";;
                info.el.style.opacity = "0.7";
            }
        },
        // listen for calendar view change
        datesSet: function () {
            fetchAndMarkNookedDates(); // Fetch and mark dates when changing months
        },
        dateClick: function (info) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let clickedDate = new Date(info.dateStr);
            clickedDate.setHours(0, 0, 0, 0);
            if (clickedDate < today) {
                alert("you cannot book past dates!");
                return;
            }
            let book = confirm(`Are you sure you want to book for ${info.dateStr}?`);
            if (book) {
                // remove previous selection's style
                if (SelectedDate) {
                    SelectedDate.dayEl.style.backgroundColor = "transparent";
                }
                // Apply styles to the new selection
                info.dayEl.style.backgroundColor = "#ffc107"
                // Update the reference to the newly selected date
                SelectedDate = info;
                fetch(`/listings/${listingId}/bookings/saveDate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(SelectedDate),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log(data.message);
                            bookBtn.style.visibility = "visible";
                            bookBtn.style.opacity = "1";
                        } else {
                            console.log(data.error);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        },
    });
    calendar.render();
});
