<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

define('WP_HOME', 'http://web-coffe');
define('WP_SITEURL', 'http://web-coffe');

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'web-coffe');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', ''); 

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'H@jZ>EbS:)kA1#ud(0Ii@1rD)s0w#)v>@xEvKL$g%0gQC$w5&02v ;YC(}5}HAy2');
define('SECURE_AUTH_KEY',  'Ul{GPJ)#wxJON)r&NdncCKe[,i7>^r?bm-cWoz^<|Fmzd<V]v{;l8q|N8bLq5`Lb');
define('LOGGED_IN_KEY',    'tjLERzE8f0wRKyUy+PP3Ji>l9>mtcA|-`l6c2H 8r9rGfpsWb=hEkT[fk~p9,%vQ');
define('NONCE_KEY',        'uueI7:w?D{kGpsx)LQ#Z+n_B}ffX0KvArSt,cx_d}X5zyVoIJb8`T6zII7,)T}fq');
define('AUTH_SALT',        'HZyl/HFbF7jME7?`].W-?lGGyvk>HgB)V/_qdZCvC}xG_NvB3sfn,dJ?(=Wcb[9o');
define('SECURE_AUTH_SALT', 'K1xt5b:8vSCbpEcCHjj+q.cW7POk;+6Lcg:9olX0($h;ZN !9/MA<@y}D7?U,F-A');
define('LOGGED_IN_SALT',   'My6[,ya$b`QY^=J-3:lt:/xwO`3*97NM;CS9>PCp=M/a-.Xxz<vvHRRfAT(&Fn6%');
define('NONCE_SALT',       '4K{s*gy{C;E%M%6%(8+I 2ej0*F<Q r+Btar BD%!.NV=!Z.!2j}0$Y>?+[z;b.e');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
