<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
<footer>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/jquery.smooth-scroll.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/waypoints.min.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/js/jquery.stellar.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#container-1').waypoint(function() {
                $('nav li a[href="#container-1"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-2').waypoint(function() {
                $('nav li a[href="#container-1"]').parent().toggleClass('active');
            }, {offset: 115});

            $('#container-2').waypoint(function() {
                $('nav li a[href="#container-2"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-2').waypoint(function() {
                $('nav li a[href="#container-2"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});

            $('#container-3').waypoint(function() {
                $('nav li a[href="#container-3"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-3').waypoint(function() {
                $('nav li a[href="#container-3"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});

            $('#container-4').waypoint(function() {
                $('nav li a[href="#container-4"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-4').waypoint(function() {
                $('nav li a[href="#container-4"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});

            $('#container-6').waypoint(function() {
                $('nav li a[href="#container-6"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-6').waypoint(function() {
                $('nav li a[href="#container-6"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});

            $('#container-7').waypoint(function() {
                $('nav li a[href="#container-7"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-7').waypoint(function() {
                $('nav li a[href="#container-7"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});

            $('#container-8').waypoint(function() {
                $('nav li a[href="#container-8"]').parent().toggleClass('active');
            }, {offset: 87});
            $('#container-8').waypoint(function() {
                $('nav li a[href="#container-8"]').parent().toggleClass('active');
            }, {offset: function() {
                    return -$(this).height() + 87;
                }});


            // ------ Start Arrow
            $('#start-arrow').smoothScroll({
                offset: -85,
                speed: 1000,
                afterScroll: function() {
                    $('#container-1 .toggle-btn').waypoint('destroy');
                    $('#container-1 .toggle-btn').toggleClass('plus');
                    $('#start-box .expanded-block').delay(200).slideToggle('2000', "linear", function() {
                        $.stellar('refresh');
                        $.waypoints('refresh');
                    });
                    $('#container-1 .toggle-btn').waypoint('disable');
                }
            });
            //end ------ Start Arrow
//
//
//            $('#container-1 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-2 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-3 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-4 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-5 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-7 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//            $('#container-6 .toggle-btn').waypoint(function(direction) {
//                if (direction === 'down') {
//                    $(this).toggleClass('plus');
//                    $(this).parent().find('.expanded-block').slideDown('2000', "linear", function() {
//                        $.stellar('refresh');
//                        $.waypoints('refresh');
//                    });
//                }
//            }, {offset: 600, triggerOnce: true});
//
//
//
//
//




            $('nav li a').smoothScroll({
                offset: -85,
                speed: 1000
            });

            $(".toggle-btn").click(function() {
                $(this).toggleClass('plus');
                $(this).parent().find('.expanded-block').slideToggle('2000', "linear", function() {
                    $.stellar('refresh');
                    $.waypoints('refresh');
                });
            });

            //Parallax
            $.stellar({
                horizontalScrolling: false,
                responsive: true
            });

//                Parallax for Mobile
            (function() {
                var ua = navigator.userAgent,
                        isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
                $(function() {
                    if (isMobileWebkit) {
                        $.stellar().destroy();
                    }
                });

            })();
        });
    </script>
    <script type='text/javascript' src='<?php bloginfo('template_directory'); ?>/js/smart_widget.js'></script>
    <script type='text/javascript' class='job_widget'>
        widget({
            "searchField": "",
            "company_code": "MorningCoffee",
            "bg_color_widget": "#ffffff",
            "bg_color_headers": "#969696",
            "bg_color_links": "#ccaa78",
            "txt_color_headers": "#292929",
            "txt_color_job": "#3d3d3d",
            "bg_color_even_row": "#e0e0e0",
            "bg_color_odd_row": "#f7f7f7",
            "custom_css_url": "https://www.smartrecruiters.com/img/style/smartWidget/smart_widget.css",
            "auto_width": "auto",
            "auto_height": "auto",
            "number": "on",
            "job_title": "true",
            "type_of_employment": "true",
            "location": "true",
            "published_since": "true",
            "filter_departments": "val_all_departments"
        });
    </script>
</footer>

<?php wp_footer(); ?>

</body>
</html>