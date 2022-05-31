function showSnackBar(props) {
    var x = document.getElementById("snackbar");
    x.innerText = props.text;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
    
export default showSnackBar;