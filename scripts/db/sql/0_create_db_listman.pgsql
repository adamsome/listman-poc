\echo '\n[Creating listman DB and user]'
\echo '----------------------------------------'

drop database if exists listman;
create database listman;

drop user listman_user;
create user listman_user with password 'listman_user';

