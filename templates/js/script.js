function displaySearchForm (){
    var searchBar = document.querySelector('.hide_search-overlay');
    searchBar.className="search-overlay";
    }
    function hideSearchForm (){
        var searchBar = document.querySelector('.search-overlay');
        searchBar.className="hide_search-overlay";
    }
function toggleBar(menuIcon) {
    let toggleNavigation= document.querySelector('.topnav')
    menuIcon.classList.toggle("change");
    toggleNavigation.classList.toggle("show-topnav")
}
function login() {
    var signIn = document.querySelector('.signin-form');
    var signUp = document.querySelector(".signup-form")
    if (signIn.style.display === "block") {
      signIn.style.display = "none";
      signUp.style.display = "none";
    } else {
      signUp.style.display = "none";
      signIn.style.display = "block";
    }
  }

  function signUp() {
    var signIn = document.querySelector('.signin-form');
    var signUp = document.querySelector(".signup-form")
    if (signUp.style.display === "block") {
      signUp.style.display = "none";
      signIn.style.display = "none";
    } else {
      signIn.style.display = "none";
      signUp.style.display = "block";
    }
  }
  function openNav() {
    document.getElementById("profileSidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("profileSidenav").style.width = "0";
  }