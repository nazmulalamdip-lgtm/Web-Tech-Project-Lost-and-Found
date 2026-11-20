
// Sample delivery requests
let requests = [
    {
        id: 101,
        item: "Lost Laptop",
        finder: "Rahim",
        owner: "Karim",
        pickup: "Dhanmondi",
        destination: "Mirpur",
        payment: "৳150",
        otp: "1234",
        status: "Available"
    },
    {
        id: 102,
        item: "Mobile Phone",
        finder: "Hasan",
        owner: "Sakib",
        pickup: "Uttara",
        destination: "Banani",
        payment: "৳120",
        otp: "5678",
        status: "Available"
    },
    {
        id: 103,
        item: "Student ID Card",
        finder: "Nayeem",
        owner: "Fahim",
        pickup: "Mohammadpur",
        destination: "Bashundhara",
        payment: "৳100",
        otp: "2468",
        status: "Available"
    }
];

let activeDeliveries = [];
let completedDeliveries = [];


// Switch dashboard sections
function showSection(section) {

    document.querySelectorAll("main section").forEach(sec => {
        sec.classList.add("hidden");
    });

    document.getElementById(section).classList.remove("hidden");

    renderAll();
}


// Display available requests
function renderRequests() {

    let list = document.getElementById("requestList");
    list.innerHTML = "";

    requests.forEach((request, index) => {

        if (request.status !== "Available") return;

        list.innerHTML += `
            <div class="delivery-card">

                <h3>${request.item}</h3>

                <p><b>Request ID:</b> ${request.id}</p>
                <p><b>Finder:</b> ${request.finder}</p>
                <p><b>Owner:</b> ${request.owner}</p>
                <p><b>Pickup:</b> ${request.pickup}</p>
                <p><b>Destination:</b> ${request.destination}</p>
                <p><b>Delivery Payment:</b> ${request.payment}</p>

                <button class="action-btn accept"
                    onclick="acceptRequest(${request.id})">
                    Accept
                </button>

                <button class="action-btn reject"
                    onclick="rejectRequest(${request.id})">
                    Reject
                </button>

            </div>
        `;
    });

    if (!list.innerHTML) {
        list.innerHTML = "<p>No available delivery requests.</p>";
    }
}


// Accept request
function acceptRequest(id) {

    let request = requests.find(r => r.id === id);

    if (!request) return;

    request.status = "Accepted";

    activeDeliveries.push(request);

    alert("Delivery request accepted!");

    renderAll();
}


// Reject request
function rejectRequest(id) {

    let request = requests.find(r => r.id === id);

    if (!request) return;

    request.status = "Rejected";

    alert("Delivery request rejected!");

    renderAll();
}


// Update delivery status
function updateStatus(id) {

    let delivery = activeDeliveries.find(d => d.id === id);

    if (!delivery) return;

    if (delivery.status === "Accepted") {
        delivery.status = "Picked Up";
    }

    else if (delivery.status === "Picked Up") {
        delivery.status = "In Transit";
    }

    else if (delivery.status === "In Transit") {
        alert("Enter the Owner's OTP to confirm delivery.");
        return;
    }

    renderAll();
}


// Verify Owner OTP
function verifyOTP(id) {

    let delivery = activeDeliveries.find(d => d.id === id);

    if (!delivery || delivery.status !== "In Transit") return;

    let inputOTP = document.getElementById("otp-" + id).value;

    if (inputOTP === delivery.otp) {

        delivery.status = "Delivered";

        completedDeliveries.push(delivery);

        activeDeliveries = activeDeliveries.filter(
            d => d.id !== id
        );

        alert("OTP verified! Delivery completed successfully.");

        renderAll();

    } else {

        alert("Incorrect OTP! Please try again.");

    }
}


// Display active deliveries
function renderActive() {

    let list = document.getElementById("activeList");
    list.innerHTML = "";

    activeDeliveries.forEach(delivery => {

        let nextAction = "";

        if (delivery.status === "Accepted") {
            nextAction = "Mark as Picked Up";
        }

        else if (delivery.status === "Picked Up") {
            nextAction = "Start Transit";
        }

        list.innerHTML += `
            <div class="delivery-card">

                <h3>${delivery.item}</h3>

                <p><b>Request ID:</b> ${delivery.id}</p>
                <p><b>Pickup:</b> ${delivery.pickup}</p>
                <p><b>Destination:</b> ${delivery.destination}</p>

                <span class="status">${delivery.status}</span>

                ${
                    delivery.status !== "In Transit"
                    ? `
                        <br>
                        <button class="action-btn update"
                            onclick="updateStatus(${delivery.id})">
                            ${nextAction}
                        </button>
                    `
                    : `
                        <br>
                        <p>Enter Owner OTP:</p>

                        <input
                            type="password"
                            id="otp-${delivery.id}"
                            class="otp"
                            maxlength="6"
                            placeholder="Enter OTP"
                        >

                        <button class="action-btn accept"
                            onclick="verifyOTP(${delivery.id})">
                            Verify & Deliver
                        </button>
                    `
                }

            </div>
        `;
    });

    if (!list.innerHTML) {
        list.innerHTML = "<p>No active deliveries.</p>";
    }
}


// Display completed deliveries
function renderCompleted() {

    let list = document.getElementById("completedList");
    list.innerHTML = "";

    completedDeliveries.forEach(delivery => {

        list.innerHTML += `
            <div class="delivery-card">

                <h3>${delivery.item}</h3>

                <p><b>Request ID:</b> ${delivery.id}</p>
                <p><b>Owner:</b> ${delivery.owner}</p>
                <p><b>Destination:</b> ${delivery.destination}</p>

                <span class="status delivered">
                    Delivered Successfully
                </span>

            </div>
        `;
    });

    if (!list.innerHTML) {
        list.innerHTML = "<p>No completed deliveries yet.</p>";
    }
}


// Refresh all dashboard sections
function renderAll() {

    renderRequests();
    renderActive();
    renderCompleted();

}


// Initial dashboard
renderAll();
