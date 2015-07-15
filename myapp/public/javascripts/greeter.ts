class Student {
  fullname: string;
  constructor(public firstname, public lastname) {
    this.fullname = firstname + " " + lastname;
  }
}

interface Person {
  firstname: string;
  lastname: string;

}

function greeter(person: Person) {
  return "Hallo " + person.firstname + " " + person.lastname + "!";
}

var button = document.getElementById("submit");

button.onclick = function() {
  //alert("hallo");

  var firstname = (<HTMLInputElement>document.getElementById('firstname')).value;
  var lastname = (<HTMLInputElement>document.getElementById('lastname')).value;

  var user = new Student(firstname, lastname);

  document.getElementById('content').innerHTML = greeter(user);
}
