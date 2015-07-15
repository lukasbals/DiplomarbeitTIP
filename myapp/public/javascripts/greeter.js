var Student = (function () {
    function Student(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = firstname + " " + lastname;
    }
    return Student;
})();
function greeter(person) {
    return "Hallo " + person.firstname + " " + person.lastname + "!";
}
var button = document.getElementById("submit");
button.onclick = function () {
    //alert("hallo");
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var user = new Student(firstname, lastname);
    document.getElementById('content').innerHTML = greeter(user);
};
