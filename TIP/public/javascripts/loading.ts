var state: string = document.readyState;

document.onreadystatechange = () => {
  if (state == "loading") {
    alert("laden");
  } else if (state == "interactive") {
    alert("interactive");
  } else if (state == "complete") {
    alert("complete");
  }
}
