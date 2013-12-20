<?php get_header(); ?>

<body <?php body_class(); ?>>
    <nav>
        <div class="wrap">
            <?php wp_nav_menu(); ?>
        </div>
    </nav>


    <?php
    $args = array(
        'post_type' => 'page',
        'page_id' => 4
    );
    $the_query = new WP_Query($args);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-1" class="light-brown">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-1.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" id="start-box">
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>


    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 7
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-2" class="dark-grey">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-2.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>
        
        
    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 9
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-3" class="light-brown">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-3.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>



    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 11
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-4" class="dark-grey">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-4.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>
        
        
    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 13
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-5" class="light-brown">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-5.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>


    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 21
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-6" class="dark-grey">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-6.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>
        
        
    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 15
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-7" class="light-brown">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-7.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
                <div class="toggle-btn"></div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>


    <?php
    $args2 = array(
        'post_type' => 'page',
        'page_id' => 17
    );
    $the_query = new WP_Query($args2);
    ?>
    <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>

            <section id="container-8" class="dark-grey">
                <div class="paralax-cont">
                    <div class="wrap">
                        <img src="<?php bloginfo('template_directory'); ?>/img/paralax-img-8.jpg" data-stellar-ratio="0.4" data-stellar-vertical-offset="86"/>
                        <a href="#start-box" id="start-arrow"></a>
                    </div>
                </div>
                <div class="wrap" >
                    <?php edit_post_link(__('Edit', 'twentytwelve'), '<span class="edit-link">', '</span>'); ?>
                    <?php the_content(); ?>
                </div>
            </section>

        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

    <?php else: ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
    <?php endif; ?>
        

</body>

<?php get_footer(); ?>