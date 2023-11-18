# Swanky Suite Reserve

Welcome to Swanky Suite Reserve, the stylish and efficient solution for managing room reservations in your business or organization. This web app is designed to streamline the process of booking and tracking room reservations, providing a swanky experience for both administrators and users.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Setting up the project repository on local machine

1. Make sure you have `node`@20 and [pnpm](https://pnpm.io/installation) installed in your local machine

2. Run this command to install them using volta as the package manager
```
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node@20

# install pnpm
volta install pnpm
```

3. Ensure you have a [supabase](https://supabase.com/) project created and retrieve the API url and key under `project settings > API > Project URL / Project API keys`

4. Create the following tables in Supabase using their SQL Editor
```SQL
create table
  public.rooms (
    id uuid not null default gen_random_uuid (),
    name character varying not null default ''::character varying,
    start_hour smallint not null default '0'::smallint,
    end_hour smallint not null default '23'::smallint,
    price_per_hour bigint not null default '1'::bigint,
    constraint rooms_pkey primary key (id),
    constraint rooms_name_key unique (name)
  ) tablespace pg_default;

create table
  public.reservations (
    user_id uuid not null,
    room_id uuid not null,
    booking_date date not null,
    hours smallint[] not null,
    constraint reservations_pkey primary key (user_id, room_id, booking_date),
    constraint reservations_room_id_fkey foreign key (room_id) references rooms (id) on update cascade on delete cascade,
    constraint reservations_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```

### Make sure to populate the `.env` file based on the `.env.example` provided in the repository

```
VITE_SUPABASE_URL=<your-supabase-api-url>
VITE_SUPABASE_KEY=<your-supabase-public-api-key>
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Setting up the project repository on Cloudflare Pages
1. Ensure that you have a Cloudflare account and login to https://dash.cloudflare.com/

2. Navigate to `Workers & Pages` > `Create application` > Connect to git repository with frontend code

3. Once connected, input a project name and select `Vue` for the framework preset

4. Change the build command to `pnpm build`

5. Add all the environment variables from your .env file into the `Environment variables (advanced)` section

6. Click `Save and Deploy`
