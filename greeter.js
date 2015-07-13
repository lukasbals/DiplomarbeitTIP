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
var user = new Student("Samuel", "T.", "Mennel");
document.getElementById('content').innerHTML = greeter(user);
