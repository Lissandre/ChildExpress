# ChildExpress

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# create forms store & forms translations from data/forms.json
$ npm run forms

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Technologies

### `Three.js`

We use Three.js a graphic 


### `GLSL`

This is for the customization and deformation of babies


### `Nuxt`

Our UI, and internationalisation system


### `Pinia`

Finally, our store to put in an box every datas that we create and modify


## Global Architecture


![Architecture](https://i.imgur.com/2LOpG8T.png)



## Technical schemes

### Automation

In order to save time and never do a work that is repetitive, we optimize intelligence through scripts.

Based on a simple forms.json that contains everything about our inputs, we fullfill our Store (values of those inputs), and the translations files.
We have create Nuxt components for each Input types, and adapt every datas that goes through each of them.

In other words, we now just have to describe our inputs in a file, then press a button, and everything build itself correctly !

It's also future-change-friendly ! If something change during conception, it's easy to write it without filling 8 different files.


<img src="https://i.imgur.com/hGk8jKY.png" alt="Forms"/>



<img src="https://i.imgur.com/GnwPIf0.png" alt="Forms" width="500"/>



## Datas stock

In our MVP : 

We create and update every datas in our Store `Pinia`

Out of MVP :

Database/API


## Nomenclature

### Forms.json



<img src="https://i.imgur.com/NJhBRWq.png" alt="Components" width="200"/>
 
<img src="https://i.imgur.com/Gc9bds6.png" alt="Locales" width="200"/>

<img src="https://i.imgur.com/p9BAvrY.png" alt="Store" width="200"/>

<img src="https://i.imgur.com/LVmFhQn.png" alt="Three scene" width="200"/>








## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static)..

