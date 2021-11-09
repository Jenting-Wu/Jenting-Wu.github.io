console.log('width', $(window).width());
// width: 1536
console.log('height', $(window).height());
// height: 459
$(window).resize(function () {

    var vwidth = $(window).width()
    var vheight = $(window).height();

    let arrowR = $('#switch-arrow-right').css('display');
    let arrowL = $('#switch-arrow-left').css('display');

    if ((arrowR == 'block' && arrowL == 'none')) {
        $('.background-wrap').css({
            'height': vheight,
            'width': vwidth * 2,
            'left': '0px',
        });

        $('.ShowArea').css('margin-left', '494px')
    } if (arrowL == 'block' && arrowR == 'none') {
        $('.background-wrap').css({
            'height': vheight,
            'width': vwidth * 2,
            'left': -vwidth
        });

        $('.ShowArea').css('margin-left', vheight * 1.12 - 314 + 'px')

    }

    $('.bg-1').css({
        'height': vheight,
        'width': vwidth,
        'background': 'url(https://jenting-wu.github.io/about/My-movie-theater/backgroundD.png) 600px center no-repeat, #222222',
        'background-size': 'contain'
    });
    $('.bg-2').css({
        'height': vheight,
        'width': vwidth,
        'background': 'url(https://jenting-wu.github.io/about/My-movie-theater/backgroundL.png) 120px center no-repeat, rgba(255, 242, 232, 0.788)',
        'background-size': 'contain',

    });
    $('#switch-arrow-right').css({
        'top': '80%',
        'left': '94%'
    });
    $('#switch-arrow-left').css({
        'top': '80%',
        'left': '4%'
    });
    $('#switch-arrow-right').click(function () {
        $('.background-wrap').css({
            'height': vheight,
            'width': vwidth * 2,
            'left': -vwidth
        });
        $('.ShowArea').css('margin-left', vheight * 1.12 - 314 + 'px')
    });

    $('#switch-arrow-left').click(function () {
        $('.background-wrap').css({
            'height': vheight,
            'width': vwidth * 2,
            'left': 0
        });
        $('.ShowArea').css('margin-left', '494px')
    });
});

$('.wrap').on('click', '#switch-arrow-right', function () {
    $(window).resize(function () {
        var vwidth = $(window).width()
        var vheight = $(window).height();
        $('.background-wrap').css({
            'height': vheight,
            'width': vwidth * 2,
            'left': -vwidth,
        });
    })

});

$('.logo').click(function () {
    // $('.background-wrap').css('left', '0')
})

// function scrollUp() {
//     $('.background-wrap').css('left', '-1536px')
// }

// function scrollDown() {
//     $('.background-wrap').css('left', '0')
// }

// $(window).bind('mousewheel', function (event) {
//     console.log('wheelDelta', event.originalEvent.wheelDelta)
//     if (event.originalEvent.wheelDelta <= 0) {
//         scrollUp();
//     }
//     else {
//         scrollDown();
//     }
//     event.preventDefault;
// });


$.ajax({
    method: "GET",
    url: "./movie.json",
    dataType: "json"
})

    .done(function (data) {
        console.log("Data Saved: ", data);
        $('#genrese li').click(function () {
            // const myStage = '-1536px';
            $('.genreseArea ul li').removeClass('act2');
            $('.genreseArea ul li p').removeClass('act2');
            $('.genreseArea ul li .circle').removeClass('act2');
            $('.genreseArea ul li').removeClass('active');
            $('.genreseArea ul li p').removeClass('active');
            $('.genreseArea ul li .circle').removeClass('active');

            if ($('.background-wrap').css('left') < '0px') {
                // 點擊的物件加上 .act2
                $(this).addClass('act2');
                $(this).find('p').addClass('act2');
                $(this).find('.circle').addClass('act2');

            }
            else {
                // 點擊的物件加上 .active
                $(this).addClass('active');
                $(this).find('p').addClass('active');
                $(this).find('.circle').addClass('active');
            };




            // 1.將 item 先全部清空
            $('#movieData').empty();
            console.log('li text:', $(this).find('p').text());
            // 2.列出 該 genre 的 item
            let myGenrese = $(this).find('p').text();
            console.log('try', myGenrese);

            data.forEach(function (item) {
                console.log('myGenrese:', myGenrese);
                // 判斷是否屬於 所點擊 的 genre
                if (myGenrese.indexOf(item.genrese) >= 0) {

                    // if (item.genrese == myGenrese) { 因為無法排除 span 內容 : 失敗
                    console.log('item.genrese:', item.genrese);
                    $('#movieData').prepend(`
            <div class="movie col-5 pointer">
            <div class="img-hidden">
                <img src="${item.image}" alt="">
            </div>
            <h6>${item.name}</h6>
        </div>
            `)
                };
            });
        });

        // 統計該分類有幾部
        // 新增 item;

    });

// 動態綁定
// 點擊 movie 小格子，觸發 function
$('#movieData').on('click', '.movie', function () {
    // 1.取值: movie 小格子的 img
    console.log('$(this)', $(this));
    console.log(".find('img')", $(this).find('img').attr('src'));
    const myImage = $(this).find('img').attr('src');

    // 2.賦值到: .movieImage 的背景
    $('.movieImage').css('background-image', `url(${myImage})`);


    // 1.取值: movie 小格子的 movieName
    console.log(".find('name')", $(this).find('h6').text());
    const myMovieName = $(this).find('h6').text();
    // 2.進資料庫查找該筆item資料
    $.ajax({
        method: "GET",
        url: "./movie.json",
        dataType: "json"
    })
        .done(function (data) {
            console.log("Data Saved: ", data);
            // 3.修改大屏幕左側資訊
            data.forEach(function (item) {
                console.log('myMovieName:', myMovieName);
                if (myMovieName == item.name) {
                    $('#movName').text(item.name);
                    $('#movDirected').text('Directed by :' + '　' + item.directed);
                    $('#movRuntime').text('Runtime :' + '　' + item.runtime + ' Min');
                    $('#movRelease').text(item.year + ',　' + item.language);
                    $('#moreInfor').text(item.moreinformation);
                };
            });


            // 統計該分類有幾部
            // 新增 item;

        });
    // 點擊出現大屏幕
    $('.movieImage').css('visibility', 'visible');
    $('.movieImage').css('opacity', '1');

    $('.card-function div i').css('opacity', '1');
    $('.card-function i').css('opacity', '1');
    $('#arrowdown').css('visibility', 'visible');

    // 切換鍵消失
    $('#switch-arrow-right').css('visibility', 'hidden');
    $('#switch-arrow-left').css('visibility', 'hidden');

    // const myStage = '-1536px';
    var openvh = $(window).height();
    if ($('.background-wrap').css('left') < '0px') {
        // 明亮場景
        $('.movieImage').css('transform', 'scale(2) rotateY(30deg) translateY(4px) translateZ(-270px) skewY(8deg) translateX(162px)');

        $('.movieInfo').css('background-color', '#733d29bb');
        $('.movieInfo').css('transform', 'scale(2) rotateY(-30deg) translateX(142px) translateY(38px) translateZ(-446px) skewY(-8deg)');
        // exit出現
        $('#exit').css('opacity', '1');
        $('#exit2').css('opacity', '1');

        $('#movName').css('color', '#fff');
        $('#movDirected').css('color', '#fff');
        $('#movRuntime').css('color', '#fff');
        $('#movRelease').css('color', '#fff');
        $('#moreInfor').css('color', '#fff');

        $('.ShowArea').css('margin-left', openvh * 1.12 - 314 + 'px')

    }
    else {
        // 暗色場景
        $('.movieImage').css('transform', 'scale(2) rotateY(-30deg) translateY(-8px) translateZ(-265px) skewY(-8deg)');

        $('.movieInfo').css('background-color', 'rgba(77, 77, 77, 0.7)');
        $('.movieInfo').css('transform', 'scale(2) rotateY(30deg) translateY(4px) translateZ(-270px) skewY(8deg) translateX(4px)');

    };
});


// 滑鼠移進 .movie  資訊欄文字浮現
$('#movieData').on('mouseenter', '.movie', function () {
    const myChange = 'matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 330, 32, -290, 1)';
    const myChange2 = 'matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 12, 32, -580, 1)';
    if ($('.movieImage').css('transform') == myChange || $('.movieImage').css('transform') == myChange2) {
        $('#movName').css('opacity', '1');
        $('#movDirected').css('opacity', '1');
        $('#movRuntime').css('opacity', '1');
        $('#movRelease').css('opacity', '1');
        $('#moreInfor').css('opacity', '1');
        const myMovieName = $(this).find('h6').text();
        // 進資料庫查找該筆item資料
        $.ajax({
            method: "GET",
            url: "./movie.json",
            dataType: "json"
        })
            .done(function (data) {
                console.log("Data Saved: ", data);
                // 修改左側未浮起資訊欄
                data.forEach(function (item) {
                    console.log('myMovieName:', myMovieName);
                    if (myMovieName == item.name) {
                        $('#movName').text(item.name);
                        $('#movDirected').text('Directed by :' + '　' + item.directed);
                        $('#movRuntime').text('Runtime :' + '　' + item.runtime + ' Min');
                        $('#movRelease').text(item.year + ',　' + item.language);
                        $('#moreInfor').text(item.moreinformation);
                    };
                });
            });
        // 改資訊欄字體顏色
        if ($('.movieImage').css('transform') == myChange2) {
            $('#movName').css('color', '#733d29');
            $('#movDirected').css('color', '#733d29');

            $('#movRuntime').css('color', '#733d29');

            $('#movRelease').css('color', '#733d29');

            $('#moreInfor').css('color', '#733d29');
        }
        else {
            $('#movName').css('color', '#fff');
            $('#movDirected').css('color', '#fff');

            $('#movRuntime').css('color', '#fff');

            $('#movRelease').css('color', '#fff');

            $('#moreInfor').css('color', '#fff');
        };

    }
});

// 滑鼠移開 .movie  資訊欄文字消失
$('#movieData').on('mouseleave', '.movie', function () {
    console.log('myChange:', $('.movieImage').css('transform'));
    const myChange = 'matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 330, 32, -290, 1)';
    const myChange2 = 'matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 12, 32, -580, 1)';
    if ($('.movieImage').css('transform') == myChange || $('.movieImage').css('transform') == myChange2) {
        $('#movName').css('opacity', '0');
        $('#movDirected').css('opacity', '0');

        $('#movRuntime').css('opacity', '0');

        $('#movRelease').css('opacity', '0');

        $('#moreInfor').css('opacity', '0');

        $('.card-function div i').css('opacity', '0');

        $('.card-function i').css('opacity', '0');
    };
});



$('#exit').click(function () {
    $('.movieImage').css('visibility', 'hidden');
    $('.movieImage').css('opacity', '0');
    $('.movieInfo').css('background-color', 'transparent');
    $('#movName').css('opacity', '0');
    $('#movDirected').css('opacity', '0');
    $('#movRuntime').css('opacity', '0');
    $('#movRelease').css('opacity', '0');
    $('#moreInfor').css('opacity', '0');
    $('.card-function div i').css('opacity', '0');
    $('.card-function i').css('opacity', '0');
    $('.movieImage').css('transform', 'scale(2) translateY(16px) translateZ(-290px) translateX(165px)');
    $('.movieInfo').css('transform', 'scale(2) translateZ(-270px) translateX(-150px) translateY(18px)');
    $('#switch-arrow-right').css('visibility', 'visible');

})

$('#exit2').click(function () {
    // 資訊欄不會消失，所以黏在資訊欄要手動消失
    $(this).css('opacity', '0');

    $('.movieImage').css('visibility', 'hidden');
    $('.movieImage').css('opacity', '0');
    $('.movieInfo').css('background-color', 'transparent');
    $('#movName').css('opacity', '0');
    $('#movDirected').css('opacity', '0');
    $('#movRuntime').css('opacity', '0');
    $('#movRelease').css('opacity', '0');
    $('#moreInfor').css('opacity', '0');
    $('.card-function div i').css('opacity', '0');
    $('.card-function i').css('opacity', '0');
    $('.movieImage').css('transform', 'scale(2) translateY(16px) translateZ(-580px) translateX(6px)');
    $('.movieInfo').css('transform', 'scale(2) translateZ(-560px) translateX(402px) translateY(18px)');
    $('#switch-arrow-left').css('visibility', 'visible');

})

// movie連結
$('#arrowdown').mouseenter(function () {
    $('#watch').css('opacity', '1');
    $('#watch').css('transform', 'translateZ(-270px) translateX(206px) translateY(40px)');

});
$('#arrowdown').mouseleave(function () {
    $('#watch').css('opacity', '0');
    $('#watch').css('transform', 'translateZ(-270px) translateX(198px) translateY(40px)');

});

// 切換至右側
$('#switch-arrow-right').click(function () {
    $(this).css('display', 'none');
    $('#switch-arrow-left').css('display', 'block');
    $('.background-wrap').css('left', '-100vw');
    $('.logo').animate({ margin: "0 -600px", opacity: "0" }, 850);
    $('.logo-2').animate({ margin: "0 870px", opacity: "1" }, 1100);
    $('.area').animate({ margin: "25px 172px" }, 1000);
    $('.genreseArea').addClass('switch02');
    // 下面改circle 背景圖
    $('.genreseArea ul li .circle').css('background-image', 'url(https://jenting-wu.github.io/about/My-movie-theater/icon-2.png)');
    // 以下為了3個 hover 效果加的
    $('.genreseArea ul li').addClass('switch03');

    $('.genreseArea ul li').addClass('act2');
    $('.genreseArea ul li p').addClass('act2');
    $('.genreseArea ul li .circle').addClass('act2');

    $('.genreseArea ul li').removeClass('active');
    $('.genreseArea ul li p').removeClass('active');
    $('.genreseArea ul li .circle').removeClass('active');

    $('.genreseArea ul li p').addClass('switch04');
    $('.genreseArea ul li span').addClass('switch05');
    $('.movieArea').addClass('switch06');
    $('.movie').addClass('switch07');
    $('.movieImage').addClass('switch08');
    $('.movieInfo').addClass('switch09');
    $('#arrowdown').addClass('switch10');
    $('#watch').addClass('switch11');
    $('#arrowdown').addClass('switch12');
    $('#exit').css('display', 'none');

    $('.ShowArea').css('margin-left', '494px')

})

// movie:hover 的動態綁定
// 沒辦法用addClass 因為場景切換時 .movie 還沒產生
$('#movieData').on('mouseenter', '.movie', function () {
    // const myStage = '-1536px';
    if ($('.background-wrap').css('left') < '0px') {
        $(this).css('box-shadow', '0 0 2px rgba(255, 242, 232, 0.788), 2px 3px 3px #733d29');
    }
})
$('#movieData').on('mouseleave', '.movie', function () {
    // const myStage = '-1536px';
    if ($('.background-wrap').css('left') < '0px') {
        $(this).css('box-shadow', 'none');
    }
})

// 切換至 左側
$('#switch-arrow-left').click(function () {
    $(this).css('display', 'none');
    $('#switch-arrow-right').css('display', 'block');
    $('.background-wrap').css('left', '0');
    $('.logo').animate({ margin: "0 65px", opacity: "1" }, 850);
    $('.logo-2').animate({ margin: "0 750px", opacity: "0" }, 850);
    $('.area').animate({ margin: "25px 660px" }, 850);
    $('.genreseArea').removeClass('switch02');
    // 下面改circle 背景圖
    $('.genreseArea ul li .circle').css('background-image', 'url(https://jenting-wu.github.io/about/My-movie-theater/film-3.png)');
    // 以下為了3個 hover 效果加的
    $('.genreseArea ul li').removeClass('switch03');

    $('.genreseArea ul li').removeClass('act2');
    $('.genreseArea ul li p').removeClass('act2');
    $('.genreseArea ul li .circle').removeClass('act2');

    $('.genreseArea ul li').addClass('active');
    $('.genreseArea ul li p').addClass('active');
    $('.genreseArea ul li .circle').addClass('active');

    $('.genreseArea ul li p').removeClass('switch04');
    $('.genreseArea ul li span').removeClass('switch05');
    $('.movieArea').removeClass('switch06');
    $('.movie').removeClass('switch07');
    $('.movieImage').removeClass('switch08');
    $('.movieInfo').removeClass('switch09');
    $('#arrowdown').removeClass('switch10');
    $('#watch').removeClass('switch11');
    $('#arrowdown').removeClass('switch12');
    $('#exit').css('display', 'block');
})

