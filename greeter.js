function greeter(person) {
    return "Hello, " + person.firstname + " " + person.lastname;
}
var user = { firstname: "Luca", lastname: "Dreier" };
document.getElementById('content').innerHTML = greeter(user);
