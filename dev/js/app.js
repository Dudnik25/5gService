if( $(window).width() >= 1000 ){
    new WOW().init({mobile: false});
}

$("document").ready(function($) {

    $(window).scroll(function(){
        var position = $(this).scrollTop();
        var main = $(".container-main").innerHeight()-80;
        showheader(position, main);
        if ($(window).width() >= 1000) {
            navactive(position);
        }
    });

    var position = $(this).scrollTop();
    var main = $(".container-main").innerHeight()-80;
    showheader(position, main);
    if ($(window).width() >= 1000) {
        navactive(position);
    }


    function showheader(position, main) {
        if (position > 10) {
            if (!$("#header").hasClass('headermin')) {
                $("#header").addClass('headermin');
            }
        } else {
            if ($("#header").hasClass('headermin')) {
                $("#header").removeClass('headermin');
            }
        }
        if (position > main) {
            if (!$("#header").hasClass('black')) {
                $("#header").addClass('black');
            }
        } else {
            if ($("#header").hasClass('black')) {
                $("#header").removeClass('black');
            }
        }
    };

    function navactive(position) {
        $('.container').each(function() {
            var target = $(this).offset().top - 20;
            var id = $(this).attr('id');

            if  (position == $(document).height() - $(window).height()) {
                var id = 'contacts';
            }

            if (position+$(window).height()/2 >= target) {
                if ($('#navigation > a[href="#' + id + '"]').hasClass('active') == false) {
                    $('#navigation').children('a').removeClass('active');
                    $('#navigation').children('a').blur();
                    $('#navigation > a[href="#' + id + '"]').addClass('active');
                }
            }

            if (id == 'form_2') {
                var startpos = position + $(window).height();
                target = $(this).offset().top;
                targetend = target + $(this).height();
                calc = startpos - target;
                if (target <= startpos && targetend >= position) {
                    $('#form_2 .paralax').css({"background-position-y" : (120-calc/10) + "px"});
                }
            }
        });
    };

    $("button.table-menu").on("click", function () {
        var table_id = "#table-" + $(this).attr("id");
        $('.table').hide();
        $('.table-menu').removeClass('active');
        $(table_id).show();
        $(this).addClass('active');
    });


    $("#navigation").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
        $('#navigation').addClass('hide');
        $("#mobile_nav_button").removeClass('active');
    });

    $("#go-down").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });

    $("#popup_close, .popup_button").on("click", function () {
        $("#popup").toggle(100);
    });

    // $(".popup_button").on("click", function () {
    //     $("#popup").show(100);
    // });


    $('#mobile_nav_button').click(function(){
        $(this).toggleClass('active');
        $('#navigation').toggleClass('hide');
    });

    //Ajax

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

    $(".form_phone").mask(" +7 (999) 999-99-99");

});