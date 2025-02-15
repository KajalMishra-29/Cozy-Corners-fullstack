document.addEventListener('DOMContentLoaded', function () {
    let listingId = window.location.pathname.split("/")[2];
    let SelectedDate = null;
    const calendarEl = document.getElementById('calendar');
    const bookBtn = document.getElementById('bookBtn');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: "bootstrap",
        initialView: 'dayGridMonth',
        selectable: true,
        showNonCurrentDates: false,

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
                info.el.classList.add("fc-day-other")
            }
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
        }
    });
    calendar.render();

    // fetch booked dates from backend
    document.getElementById("viewBookedDates").addEventListener("click", (event) => {
        event.preventDefault();
        fetch(`/listings/${listingId}/bookings/bookedDates`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.dates) {
                    markBookedDates(data.dates);
                } else {
                    console.log("No booked dates found");
                }
            })
            .catch(err => console.log(err));
    })
    // Function to mark booked dates
    function markBookedDates(bookedDates) {
        bookedDates.forEach(date => {
            let elements = document.querySelectorAll(`[data-date='${date}']`);
            elements.forEach(el => {
                el.style.backgroundColor = "#c2c2c2";
            });
        });
    }
});

