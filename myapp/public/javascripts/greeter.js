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
    var firstname = document.getElementById('firstname').value;
    var middleinitial = document.getElementById('middleinitial').value;
    var lastname = document.getElementById('lastname').value;
    var user = new Student(firstname, middleinitial, lastname);
    document.getElementById('content').innerHTML = greeter(user);
};
