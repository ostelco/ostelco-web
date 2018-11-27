# ostelco-web

Frontend web development

## Notes on Development

This project uses Blendid https://github.com/vigetlabs/blendid for front end task running.
Just do the following steps if you need to get started:

If you have yarn installed:

```shell
yarn init
yarn add blendid
yarn run blendid -- init
yarn run blendid
```

One issue that I noticed is that the **src/Fonts** folder aren't copied into the **public** folder in the gulp task for the public folder so you're going to have to do this manually (everything else seems to work).

The production files are in the **public** folder
