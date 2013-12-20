<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
get_header();
?>

<section id="content-block">
    <div class="wrap">
        <div id="primary" class="site-content">
            <div id="content" role="main">

                 <?php while (have_posts()): the_post(); ?>
                <div id="post-<?php get_the_ID(); ?>" class="blog-page-container dotted-line cf">
                    <div class="blog-entry">
                        <?php the_post_thumbnail(); ?> 
                        <div class="entry-body">
                            <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                            <div class="meta">
                                <span><?php the_author_link(); ?></span>
                                <span><?php the_time('F jS, Y'); ?></span>
                            </div>
                            <?php the_excerpt(__('Continue reading »', 'example')); ?>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>

            </div><!-- #content -->
        </div><!-- #primary -->
    </div>
</section>


<?php get_footer(); ?>