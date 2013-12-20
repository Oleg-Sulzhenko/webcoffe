<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
get_header();
?>
<section id="content-block">
    <div class="wrap">
        <?php edit_post_link( __( 'Edit', 'twentytwelve' ), '<span class="edit-link">', '</span>' ); ?>
        <?php
        if (have_posts()) : while (have_posts()) : the_post();
                the_content();
            endwhile;
        else:
            ?>
            <p>Sorry, no posts matched your criteria.</p>
        <?php endif; ?>

    </div>
</section>
<?php get_footer(); ?>
