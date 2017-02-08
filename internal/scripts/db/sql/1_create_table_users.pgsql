/**
 * To create the bookstore database, run this file through psql like so:
 *
 * > psql -f create_table_users.pgsql listman listman_user
 */

\echo '\n[Creating tables]'
\echo '----------------------------------------'

drop table items;

create table items (
  id bigserial primary key,
  list bigint not null references lists,
  info jsonb not null,
  rating integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop table lists cascade;

create table lists (
  id bigserial primary key,
  name text not null,
  owner bigint not null references users,
  description text,
  items_rank bigint[] not null default array[]::bigint[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop table users cascade;

create table users (
  id bigserial primary key,
  username text not null unique,
  description text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into users (username, description, avatar_url, is_admin)
  values (
    'superuser',
    'Superuser',
    'http://bulma.io/images/placeholders/256x256.png',
    true
  );

