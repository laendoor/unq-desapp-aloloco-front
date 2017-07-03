var Login = function () {
    return {
        init: function () {
            $('.login-bg').backstretch([
                    "http://lorempixel.com/1200/1080/food?v=1",
                    "http://lorempixel.com/1200/1080/food?v=2",
                    "http://lorempixel.com/1200/1080/food?v=3"
                ], {
                    fade: 1000,
                    duration: 3000
                }
            );
        }
    };
}();

jQuery(document).ready(function () {
    Login.init();
});