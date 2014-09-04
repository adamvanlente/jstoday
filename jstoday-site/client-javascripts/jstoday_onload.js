var jspro = jspro || {}

jspro.onload = {

    loader: function() {
        if (window.location.pathname == '/login') {
            $('.header--menu__loginButton').hide();
        }
    }


}.loader();
