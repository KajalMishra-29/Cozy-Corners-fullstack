document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: "bootstrap",
        initialView: 'dayGridMonth',
        // showNonCurrentDates: false,
        validRange: function () {
            return {
                start: new Date(),
                end: new Date().setMonth(new Date().getMonth() + 3)
            };
        },
    });
    calendar.render();
});