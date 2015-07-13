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
var button = document.getElementById("submit");
button.onclick = function () {
    //alert("hallo");
    var user = new Student(document.getElementById('firstname').value, document.getElementById('middleinitial').value, document.getElementById('lastname').value);
    document.getElementById('content').innerHTML = greeter(user);
};
