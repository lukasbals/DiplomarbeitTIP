var state = document.readyState;
document.onreadystatechange = function () {
    if (state == "loading") {
        alert("laden");
    }
    else if (state == "interactive") {
        alert("interactive");
    }
    else if (state == "complete") {
        alert("complete");
    }
};
