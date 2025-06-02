function getDenmarkNow() {
    // Get the current time in Denmark as a Date object
    const now = new Date();
    const denmarkTimeString = now.toLocaleString('en-US', { timeZone: 'Europe/Copenhagen' });
    return new Date(denmarkTimeString);
}

function getNextAnniversaryDate() {
    // Always return the next June 2 at 00:00:00 in Denmark time
    const now = getDenmarkNow();
    const currentYear = now.getFullYear();
    // Create June 2 of the current year in Denmark time
    let anniversary = new Date(`${currentYear}-06-02T00:00:00`);
    // Adjust for Denmark time zone
    const anniversaryTimeString = anniversary.toLocaleString('en-US', { timeZone: 'Europe/Copenhagen' });
    anniversary = new Date(anniversaryTimeString);
    // If today is June 2 or later, use next year
    if (now >= anniversary) {
        let nextYearAnniversary = new Date(`${currentYear + 1}-06-02T00:00:00`);
        const nextYearAnniversaryTimeString = nextYearAnniversary.toLocaleString('en-US', { timeZone: 'Europe/Copenhagen' });
        nextYearAnniversary = new Date(nextYearAnniversaryTimeString);
        return nextYearAnniversary;
    }
    return anniversary;
}

function updateCountdown() {
    // Target date: Next anniversary in Denmark time
    const targetDate = getNextAnniversaryDate();
    // Get current time in Denmark
    const now = getDenmarkNow();
    // Calculate the difference in milliseconds
    const timeRemaining = targetDate.getTime() - now.getTime();

    if (timeRemaining < 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    const reasonItems = document.querySelectorAll('.reason');
    
    window.addEventListener('scroll', function() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
        
        reasonItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = 1;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const reasonItems = document.querySelectorAll('.reason');
    
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    reasonItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
    });
});
