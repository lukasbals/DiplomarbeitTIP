var Student = (function () {
    function Student(firstname, middleinitial, lastname) {
        this.firstname = firstname;
        this.middleinitial = middleinitial;
        this.lastname = lastname;
        this.fullname = firstname + " " + middleinitial + " " + lastname;
    }
    return Student;
})();
function greeter(person) {
    return "Hello, " + person.firstname + " " + person.middleinitial + " " + person.lastname;
}
var user = new Student(document.getElementById('content').firstname.value, document.getElementById('content').middleinitial.value, document.getElementById('content').lastname.value);
document.getElementById('content').innerHTML = greeter(user);
