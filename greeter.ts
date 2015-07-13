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

var user = new Student(document.getElementById('content').firstname.value, document.getElementById('content').middleinitial.value, document.getElementById('content').lastname.value);

document.getElementById('content').innerHTML = greeter(user);
