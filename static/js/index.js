jQuery(document).ready(function() {
    jQuery(window).resize(onResize);
    jQuery(window).resize();

    window.currentWidth;
    var mobileDropdownMenu = document.getElementById("mobileDropdownMenuParent");;
    var mobileDropdownMenuElements = document.getElementsByClassName("dynamicallySetWidth");
    function onResize(event) {
        window.currentWidth = jQuery(window).width();

        if (window.currentWidth > 672 && mobileNavOpen(mobileDropdownMenu)) {
            closeMobileMenu(mobileDropdownMenu);
        } else if (window.currentWidth <= 672 && mobileNavOpen(mobileDropdownMenu)) {
            mobileDropdownMenuElements.forEach(function(ce) {
                log(ce);
                log(ce.style.width)
            });
        }

        if (window.currentWidth <= 1300) {
            jQuery(".fa-3x").removeClass("fa-3x").addClass('fa-2x');
        } else if (window.currentWidth > 1300) {
            jQuery(".fa-2x").removeClass("fa-2x").addClass('fa-3x');
            jQuery("#dropdownMenuButton i").removeClass("fa-3x").addClass("fa-2x");
        }
    }

    angular.bootstrap(document, ['dylansProfileApp']);
});

function mobileNavOpen(mobileMenu) {
    return mobileMenu.className.indexOf("open") != -1;
}

function closeMobileMenu(mobileMenu) {
    mobileMenu.className = "dropdown closed";
}

