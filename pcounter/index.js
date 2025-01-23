let count = 0;

// Increment function
function increment() {
    count++;
    document.getElementById("counter").innerText = count;
}

// Decrement function
function decrement() {
    if (count > 0) {
        count--;
    } else {
        alert("Count cannot go below zero!");
    }
    document.getElementById("counter").innerText = count;
}

// Save function
function save() {
    const prev = document.getElementById("preventry");
    prev.innerText += ` ${count} - `;
    count = 0; // Reset count
    document.getElementById("counter").innerText = count;
}
