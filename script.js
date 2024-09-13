$(document).ready(function() {
    // Initialize Datepicker
    $('#date').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true,
        startDate: new Date()
    });

    // Set default date and time
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday);
    const defaultDate = `${nextMonday.getMonth() + 1}/${nextMonday.getDate()}/${nextMonday.getFullYear()}`;
    const defaultTime = '08:00';

    $('#date').datepicker('setDate', defaultDate);
    $('#time').val(defaultTime);
    updateCountdown();
    updateNewYearCountdown(); // Initialize New Year countdown

    // Handle theme change from select element
    $('#theme-select').on('change', function() {
        const selectedTheme = $(this).val();
        if (selectedTheme === 'dark') {
            setDarkMode();
        } else if (selectedTheme === 'light') {
            setLightMode();
        } else {
            setSystemMode();
        }
    });

    function setDarkMode() {
        $('body').addClass('dark-mode');
        $('.container').addClass('dark-mode');
        $('h1').addClass('dark-mode');
        $('label').addClass('dark-mode');
        $('input[type="text"]').addClass('dark-mode');
        $('input[type="time"]').addClass('dark-mode');
        $('#formatted-datetime').addClass('dark-mode');
        $('#countdown').addClass('dark-mode');
        $('.time-unit').addClass('dark-mode');
        $('.time-unit span').addClass('dark-mode');
        $('#new-year-countdown').addClass('dark-mode'); // Dark mode for New Year countdown
    }

    function setLightMode() {
        $('body').removeClass('dark-mode');
        $('.container').removeClass('dark-mode');
        $('h1').removeClass('dark-mode');
        $('label').removeClass('dark-mode');
        $('input[type="text"]').removeClass('dark-mode');
        $('input[type="time"]').removeClass('dark-mode');
        $('#formatted-datetime').removeClass('dark-mode');
        $('#countdown').removeClass('dark-mode');
        $('.time-unit').removeClass('dark-mode');
        $('.time-unit span').removeClass('dark-mode');
        $('#new-year-countdown').removeClass('dark-mode'); // Light mode for New Year countdown
    }

    function setSystemMode() {
        // Detect system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    // Initialize based on system theme
    setSystemMode();

    // Update countdown when date or time changes
    $('#date, #time').on('change', function() {
        updateCountdown();
    });
});

// Format the datetime for display
const formatDateTime = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    const hours = String(hours12).padStart(2, '0');

    return `${dayOfWeek}, ${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
};

// Update the countdown display
const updateCountdown = () => {
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    let countdownDate;

    if (dateInput && timeInput) {
        const [month, day, year] = dateInput.split('/').map(Number);
        const [hours, minutes] = timeInput.split(':').map(Number);
        countdownDate = new Date(year, month - 1, day, hours, minutes, 0);
        document.getElementById('datetime-display').innerText = formatDateTime(countdownDate);
    } else {
        // Default to the upcoming Monday at 8:00 AM
        const now = new Date();
        const dayOfWeek = now.getDay();
        const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
        const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday, 8, 0, 0);
        countdownDate = nextMonday;
        document.getElementById('datetime-display').innerText = formatDateTime(nextMonday);
    }

    const now = new Date();
    const distance = countdownDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return; // Stop updating if the countdown is finished
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
};

// Update the New Year countdown display
const updateNewYearCountdown = () => {
    const now = new Date();
    const newYearDate = new Date(now.getFullYear() + 1, 0, 1); // January 1st of the next year
    const distance = newYearDate - now;

    if (distance < 0) {
        document.getElementById("new-year-days").innerText = "00";
        document.getElementById("new-year-hours").innerText = "00";
        document.getElementById("new-year-minutes").innerText = "00";
        document.getElementById("new-year-seconds").innerText = "00";
        return; // Stop updating if the countdown is finished
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("new-year-days").innerText = String(days).padStart(2, '0');
    document.getElementById("new-year-hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("new-year-minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("new-year-seconds").innerText = String(seconds).padStart(2, '0');
};

// Update both countdowns every second
setInterval(() => {
    updateCountdown();
    updateNewYearCountdown();
}, 1000);