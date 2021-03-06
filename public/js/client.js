$(document).ready((function () {
    var city_list = $('.city_list'),
        form = $('form'),
        validationMsg =$('.validationMsg'),

        appendCity = function (name) {
            city_list.append('<div class="bg-primary cityItem"><span class="cityName">' + name +
                '</span><span class="pull-right removeLink">Remove</span></div>');
        },

        getCities = function () {
            $.get('/cities', function (cities) {
                $(cities).each(function (index, val) {
                    appendCity(val);
                });
            });
        },

        handleFormSubmit = function () {
            form.on('submit', function (event) {
                event.preventDefault();

                var form = $(this);
                var cityData = form.serialize();

                $.ajax({
                    type: "POST",
                    url: '/cities',
                    data: cityData
                })
                    .error(function (err) {
                        if(err.status=400){
                            validationMsg.show();
                        }
                    })
                    .success(function (cityName) {
                        validationMsg.hide();
                        appendCity(cityName);
                        form[0].reset();
                    });
            });
        },

        handleRemoveCities = function () {
            city_list.on('click', '.removeLink', function(){
                var clickedCity = $(this).parent();
                $.ajax({
                    url:'/cities/' + clickedCity.find('.cityName').text(),
                    type:'DELETE',
                    success: function(){
                        clickedCity.remove();
                    }
                });
            });
        },

        handleShowCityInfo = function(){
            city_list.on('click', '.cityName', function(){
                window.location = '/cities/' + $(this).parent().find('.cityName').text();
            });
        };


    // init
    (function () {
        getCities();
        handleFormSubmit();
        handleRemoveCities();
        handleShowCityInfo();
    })();
}));

