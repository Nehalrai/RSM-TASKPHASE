let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = []; 
function generateCalendar(month, year) {
    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = ''; 

    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    
    for (let row = 0; row < 6; row++) {
        let tr = document.createElement('tr');

        for (let col = 0; col < 7; col++) {
            let cell = document.createElement('td');

            if (row === 0 && col < firstDay) {
                cell.textContent = "";
            } else if (date <= daysInMonth) {
                cell.textContent = date;
                const eventForDay = events.find(event =>
                    new Date(event.date).getDate() === date &&
                    new Date(event.date).getMonth() === month &&
                    new Date(event.date).getFullYear() === year
                );

                if (eventForDay) {
                    cell.style.backgroundColor =
                        eventForDay.type === 'work' ? '#ffcccb' :
                        eventForDay.type === 'personal' ? '#add8e6' : '#90ee90'; 
                    cell.title = eventForDay.title;
                }
                cell.onclick = function () {
                    document.getElementById('event-title').value = eventForDay ? eventForDay.title : '';
                    document.getElementById('event-date').value = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    document.getElementById('event-type').value = eventForDay ? eventForDay.type : 'work';
                    openModal();
                };

                date++;
            }
            tr.appendChild(cell);
        }

        calendarBody.appendChild(tr);
        
        if (date > daysInMonth) break;
    }
}
function openModal() {
    document.getElementById('event-modal').style.display = 'block';
}
function closeModal() {
    document.getElementById('event-modal').style.display = 'none';
}
document.querySelector('.close').onclick = closeModal;
document.getElementById('open-modal').onclick = openModal;

document.getElementById('event-form').onsubmit = function (event) {
    event.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const type = document.getElementById('event-type').value;

    const existingEventIndex = events.findIndex(e => e.date === date);
    if (existingEventIndex !== -1) {
        events[existingEventIndex] = { title, date, type };
    } else {
        events.push({ title, date, type });
    }
    closeModal();
    generateCalendar(currentMonth, currentYear);
};
document.getElementById('prev-month').onclick = function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
};

document.getElementById('next-month').onclick = function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
};

const monthSelector = document.getElementById('month-selector');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthNames.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index; 
    option.textContent = month;
    monthSelector.appendChild(option);
});
monthSelector.onchange = function () {
    currentMonth = parseInt(this.value);
    generateCalendar(currentMonth, currentYear);
};
generateCalendar(currentMonth, currentYear);
