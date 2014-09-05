var jspro = jspro || {}

jspro.onload = {

    loader: function() {
        var path = window.location.pathname;
        if (path.search('/login') != -1 || path.search('/signup') != -1) {
            $('.header--menu__loginButton').hide();
        }

        if (path.search('/account') != -1) {
            $('.header--menu__menuButton').hide();
        }
    }


}.loader();
