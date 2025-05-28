
function updateCountdown() {
    const currentDate = new Date();
    const nextAnniversary = new Date(Date.UTC(2025, 5, 2, 0, 0, 0));
    
    const isDST = isDaylightSavingTime(nextAnniversary);
    const denmarkOffset = isDST ? 2 : 1; 
    
    nextAnniversary.setUTCHours(nextAnniversary.getUTCHours() + denmarkOffset);
    
    const currentTime = currentDate.getTime();
    const anniversaryTime = nextAnniversary.getTime();
    const timeRemaining = anniversaryTime - currentTime;
    
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

function isDaylightSavingTime(date) {
    const year = date.getUTCFullYear();
    
    const marchDate = new Date(Date.UTC(year, 2, 31));
    marchDate.setUTCDate(31 - marchDate.getUTCDay()); 
    const octoberDate = new Date(Date.UTC(year, 9, 31)); 
    octoberDate.setUTCDate(31 - octoberDate.getUTCDay());
    
    return date >= marchDate && date < octoberDate;
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