let counterId = 0;
const counts = {};

function addCounter() {
    counterId++;
    const container = document.getElementById('countersContainer');

    const card = document.createElement('div');
    card.className = 'card shadow-lg p-3 text-center counter-card';

    const countId = `count-${counterId}`;
    const messageId = `message-${counterId}`;
    const contentDivId = `content-${counterId}`; // Changed from collapseId for clarity

    card.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <button type="button" class="btn-close" aria-label="Close" onclick="this.closest('.card').remove()" style="transform: scale(2);"></button>
            <button class="icon-button" type="button" onclick="toggleCounterCollapse(this, '${contentDivId}')">
                <i class="fas fa-minus"></i>
            </button>
        </div>
        <div id="${contentDivId}" class="counter-content show-content">
            <input type="text" class="title-input" placeholder="Enter title..." />
            <div id="${countId}" class="count-display mt-2">0</div>
            <div class="mt-3 d-grid gap-2 col-8 mx-auto">
                <button class="btn btn-success btn-sm" onclick="increment('${countId}')">
                    <i class="bi bi-plus-circle-fill"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="decrement('${countId}')">
                    <i class="bi bi-dash-circle-fill"></i>
                </button>
                <button class="btn btn-secondary btn-sm" onclick="reset('${countId}', '${messageId}')">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </button>
            </div>
            <div id="${messageId}" class="text-success mt-2 reset-message">Counter has been reset</div>
        </div>
    `;

    container.insertBefore(card, container.firstChild);
}

// New function to handle both icon and card collapse
function toggleCounterCollapse(button, contentDivId) {
    const icon = button.querySelector('i');
    const card = button.closest('.card');
    const contentDiv = document.getElementById(contentDivId);

    // Toggle the icon
    icon.classList.toggle('fa-minus');
    icon.classList.toggle('fa-plus');

    // Toggle the 'is-collapsed' class on the card for height transition
    card.classList.toggle('is-collapsed');

    // Toggle the 'show-content' class on the content div for visibility
    contentDiv.classList.toggle('show-content');
}


function increment(id) {
    if (!counts[id]) counts[id] = 0;
    counts[id]++;
    document.getElementById(id).innerText = counts[id];
}

function decrement(id) {
    if (!counts[id]) counts[id] = 0;
    if (counts[id] > 0) counts[id]--;
    document.getElementById(id).innerText = counts[id];
}

function reset(countId, messageId) {
    counts[countId] = 0;
    document.getElementById(countId).innerText = 0;
    const message = document.getElementById(messageId);
    message.classList.add("show");
    setTimeout(() => {
        message.classList.remove("show");
    }, 2500);
}

// Automatically add the first counter on page load
window.onload = addCounter;