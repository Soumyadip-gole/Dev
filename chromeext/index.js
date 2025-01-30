let myLeads = []; 
const input = document.getElementById("input");
const inputbtn = document.getElementById("inputbtn");
const ullead = document.getElementById("ullead");

inputbtn.addEventListener("click", function() {
        myLeads.push(input.value);
        input.value = ""; 
        renderLeads();
});

function renderLeads() {
    ullead.innerHTML = "";
    for (let i = 0; i < myLeads.length; i++) {
        ullead.innerHTML += "<li>" + myLeads[i] + "</li>";
    }
}

