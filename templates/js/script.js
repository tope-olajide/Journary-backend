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