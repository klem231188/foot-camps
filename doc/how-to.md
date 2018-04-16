## Deploy website dev
```
ng build --aot
firebase use footcamps-development
firebase deploy
```

## Deploy website prod
```
ng build --prod --aot
firebase use footcamps-production
firebase deploy
```
After each production deployment: Update sitemap.xml and upload it again on Google Search Console. 

## Rename all files in a directory 1.jpg, 2.jpg, ..., n.jpg
```
ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done
```

## Create a gallery from a directory containing the images
```
cd ~/workspace/foot-camps/
node node_modules/angular2-image-gallery/convert.js src/assets/img/**club**/gallery --outputDir=src/assets/img/**club**/gallery --remoteBaseUrl=assets/img/**club**/gallery

# Example: node node_modules/angular2-image-gallery/convert.js src/assets/img/lorient/gallery --outputDir=src/assets/img/lorient/gallery --remoteBaseUrl=assets/img/lorient/gallery
```

## Create a new component
```
cd ~/workspace-github/foot-camps/src/app/components
ng g component football-camp-subscribe --module app
```
