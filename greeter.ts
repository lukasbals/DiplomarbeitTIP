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
  return "Hello, " + person.firstname + " " + person.middleinitial + " " + person.lastname;
}

var button = document.getElementById("submit");
button.onclick = function(){
  //alert("hallo");

  var user = new Student(document.getElementById('firstname').value, document.getElementById('middleinitial').value, document.getElementById('lastname').value);

  document.getElementById('content').innerHTML = greeter(user);
}
