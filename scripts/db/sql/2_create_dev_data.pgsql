/**
 * To create the bookstore database, run this file through psql like so:
 *
 * > psql -f create_table_users.pgsql listman listman_user
 */

\echo '\n[Creating dev data]'
\echo '----------------------------------------'

insert into users (username, description, avatar_url)
values (
  'adamsome',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut eros non quam faucibus mattis quis quis sem. Praesent cursus pretium leo, sit amet dignissim felis vulputate at.',
  'http://bulma.io/images/placeholders/256x256.png'
), (
  'other-user',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut eros non quam faucibus mattis quis quis sem. Praesent cursus pretium leo, sit amet dignissim felis vulputate at.',
  'http://bulma.io/images/placeholders/256x256.png'
), (
  'long-maximum-length-user-name-32',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut eros non quam faucibus mattis quis quis sem. Praesent cursus pretium leo, sit amet dignissim felis vulputate at.',
  'http://bulma.io/images/placeholders/256x256.png'
);

insert into lists (name, owner, items_rank)
values (
  'Favorite Things of 2016',
  (select id from users where username = 'adamsome'),
  array[1, 2]::bigint[]
), (
  'Favorite Things of 2015',
  (select id from users where username = 'adamsome'),
  array[]::bigint[]
), (
  'Sample List No. 1 w/ many items',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  'List Two of Samples',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  'Third List of Samples with a very, very, long name',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  'Sample List IV',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  'Fifth Samples Listing',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  '666',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
), (
  '7th list of samples',
  (select id from users where username = 'other-user'),
  array[]::bigint[]
)
