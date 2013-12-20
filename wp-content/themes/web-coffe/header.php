<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
    <!--<![endif]-->
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link href="<?php bloginfo('template_directory'); ?>/css/style.css" rel="stylesheet" type="text/css" />
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
        <link href='http://fonts.googleapis.com/css?family=Oswald:400,700,300' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

        <?php wp_head(); ?>
        <script language="javascript">
            if (typeof(window.parent.parent.resizeFrame) == 'function')
            {
                var l = location.href;
                var p = l.indexOf('?height=');
                if (p == -1)
                    p = l.indexOf('&height=');
                if (p != -1)
                {
                    p += 8;
                    var p2 = l.indexOf('&', p);
                    if (p2 == -1)
                        p2 = l.length;
                    window.parent.parent.resizeFrame((l.substring(p, p2) - 0) + 'px', l.indexOf('scroll=0') == -1);
                }
            }
        </script>


        <script type="text/javascript">

            var l = location.href;

            var args = '';

            var k = '';

            var iStart = l.indexOf('?jvk=');

            if (iStart == -1)
                iStart = l.indexOf('&jvk=');

            if (iStart != -1)

            {

                iStart += 5;

                var iEnd = l.indexOf('&', iStart);

                if (iEnd == -1)
                    iEnd = l.length;

                k = l.substring(iStart, iEnd);

            }

            iStart = l.indexOf('?jvi=');

            if (iStart == -1)
                iStart = l.indexOf('&jvi=');

            if (iStart != -1) {

                iStart += 5;

                var iEnd = l.indexOf('&', iStart);

                if (iEnd == -1)
                    iEnd = l.length;

                args += '&j=' + l.substring(iStart, iEnd);

                if (!k.length)
                    args += '&k=Job';

                var iStart = l.indexOf('?jvs=');

                if (iStart == -1)
                    iStart = l.indexOf('&jvs=');

                if (iStart != -1)

                {

                    iStart += 5;

                    var iEnd = l.indexOf('&', iStart);

                    if (iEnd == -1)
                        iEnd = l.length;

                    args += '&s=' + l.substring(iStart, iEnd);

                }

            }

            if (k.length)
                args += '&k=' + k;

            if (args.length)
                document.getElementById('jobviteframe').src += args;



            function resizeFrame(height, scrollToTop)

            {

                if (scrollToTop)
                    window.scrollTo(0, 0);

                var oFrame = document.getElementById('jobviteframe');

                if (oFrame)
                    oFrame.height = height;

            }

        </script>
    </head>








