if( $(window).width() >= 1000 ){
    new WOW().init({mobile: false});
}

$("document").ready(function($) {

    $('body,html').scrollTop($(window).scrollTop() - 1);
    //Скрол
    $(window).scroll(function(){
        var position = $(this).scrollTop();
        var main = $("#main").innerHeight()-80;
        showheader(position, main);
        if ($(window).width() >= 1000) {
            navactive(position);
        }
    });

    //Размер и цвет хедера
    function showheader(position, main) {
        if (position > 10) {
            if (!$("header").hasClass('headermin')) {
                $("header").addClass('headermin');
            }
        } else {
            if ($("header").hasClass('headermin')) {
                $("header").removeClass('headermin');
            }
        }
        if (position > main) {
            if (!$("header").hasClass('black')) {
                $("header").addClass('black');
            }
        } else {
            if ($("header").hasClass('black')) {
                $("header").removeClass('black');
            }
        }
    };

    //Подсветка пунктов меню
    function navactive(position) {
        $('section').each(function() {
            var target = $(this).offset().top - 20;
            var id = $(this).attr('id');

            if  (position == $(document).height() - $(window).height()) {
                var id = 'contacts';
            }

            if (position+$(window).height()/2 >= target) {
                if ($('#navigation > ul > li > a[href="#' + id + '"]').hasClass('active') === false) {
                    $('#navigation').children('ul').children('li').children('a').removeClass('active');
                    $('#navigation').children('ul').children('li').children('a').blur();
                    $('#navigation > ul > li > a[href="#' + id + '"]').addClass('active');
                }
            }
        });
    };

    //Кнопки смены таблицы
    $("button.table-menu").on("click", function () {
        if ($(this).hasClass('active') === false) {
            var table_id = "#table-" + $(this).attr("id");
            var old_table = '#' + $(".table:visible").attr("id");
            $('.table').removeClass('fadeInUp fadeOutDown');
            $(old_table).addClass('fadeOutDown');
            setTimeout(function () {
                $(old_table).hide();
                $(old_table).removeClass('fadeOutDown');
                $(table_id).addClass('fadeInUp');
                $(table_id).show();
            }, 200);
            $('.table-menu').removeClass('active');
            $(this).addClass('active');
        }
    });

    //Плавный скрол
    $("#navigation, #go-down").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
        $('#mobile_menu').addClass('hide');
        $("#mobile_nav_button").removeClass('active');
    });

    //Модалка с формой
    $("#popup_close, #popup__toggle").on("click", function () {
        $("#popup").toggle(100);
    });

    //Кнопка мобильного меню
    $('#mobile_nav_button').click(function(){
        $(this).toggleClass('active');
        $('#mobile_menu').toggleClass('hide');
    });

    //Forms Ajax
    $('form').submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        $form.children('button').attr("disabled", true);
        $('form').each(function() {
            $(this).children('button').attr("disabled", true);
            $(this).children('button').addClass('disabled');
        });
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function(data) {
            if (data != 'Заявка принята, мы вам перезвоним!') {
                $('form').each(function() {
                    $(this).children('button').attr("disabled", false);
                    $(this).children('button').removeClass('disabled');
                });
            }
            $form.children('.form_massage').text(data);
            $form.children('.form_massage').show(200);
        }).fail(function(data) {
            $form.children('.form_massage').text('Ошибка отправки запроса, попробуйте позже!');
            $form.children('.form_massage').show(200);
            $('form').each(function() {
                $(this).children('button').attr("disabled", false);
                $(this).children('button').removeClass('disabled');
            });
        });
    });

    //Маска на телефон
    $(".form_phone").mask("+7 (999) 999-99-99");
});