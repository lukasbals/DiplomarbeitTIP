class Student {
    fullname : string;
    constructor(public firstname, public middleinitial, public lastname) {
        this.fullname = firstname + " " + middleinitial + " " + lastname;
    }
}

interface Person {
    firstname: string;
    lastname: string;
    middleinitial: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstname + " " + person.middleinitial + " " + person.lastname;
}

//var user = new Student(document.getElementById('input').firstname.value, document.getElementById('input').middleinitial.value, document.getElementById('input').lastname.value);
var user = new Student("Samuel", "T.","Mennel");


document.getElementById('content').innerHTML = greeter(user);
