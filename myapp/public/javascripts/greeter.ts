class Student {
  fullname: string;
  constructor(public firstname, public middleinitial, public lastname) {
    this.fullname = firstname + " " + middleinitial + " " + lastname;
  }
}

interface Person {
  firstname: string;
  lastname: string;
  middleinitial: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstname + " " + person.middleinitial + ". " + person.lastname;
}

var button = document.getElementById("submit");
button.onclick = function(){
  //alert("hallo");

  var firstname = document.getElementById('firstname').value;
  var middleinitial = document.getElementById('middleinitial').value;
  var lastname = document.getElementById('lastname').value;

  var user = new Student(firstname, middleinitial, lastname);

  document.getElementById('content').innerHTML = greeter(user);
}
