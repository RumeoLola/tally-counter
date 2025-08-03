let counterId = 0;
    const counts = {};

    function addCounter() {
        counterId++;
        const container = document.getElementById('countersContainer');

        const card = document.createElement('div');
        card.className = 'card shadow-lg p-3 text-center counter-card';

        const countId = `count-${counterId}`;
        const messageId = `message-${counterId}`;

        card.innerHTML = `
            <button type="button" class="btn-close" aria-label="Close" onclick="this.closest('.card').remove()" style="transform: scale(2);"></button>
            <input type="text" class="title-input" placeholder="Enter title..." />
            <div id="${countId}" class="count-display">0</div>
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
        `;

        container.appendChild(card);
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

    // Automatically add the first counter when the page loads
    window.onload = addCounter;