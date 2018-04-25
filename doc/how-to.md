## Deploy website dev
```
./deploy-dev.sh
```

## Deploy website prod
```
./deploy-prod.sh
```
After each production deployment: Update sitemap.xml and upload it again on Google Search Console. 

## Rename all files in a directory 1.jpg, 2.jpg, ..., n.jpg
```
ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done
```

## Create a gallery from a directory containing the images

```
# Installation of graphicsmagick
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:rwky/graphicsmagick
sudo apt-get update
sudo apt-get install graphicsmagick

# Installation of angular2-image-gallery
npm install -g angular2-image-gallery
npm install -g mkdirp

# Launch the command to create a gallery
cd ~/workspace/foot-camps/
node /home/Clement.Treguer/.nvm/versions/node/v7.5.0/lib/node_modules/angular2-image-gallery/convert.js src/assets/img/**club**/gallery --outputDir=src/assets/img/**club**/gallery --remoteBaseUrl=assets/img/**club**/gallery

# Example: node node_modules/angular2-image-gallery/convert.js src/assets/img/lorient/gallery --outputDir=src/assets/img/lorient/gallery --remoteBaseUrl=assets/img/lorient/gallery
```

## Create a new component
```
cd ~/workspace-github/foot-camps/src/app/components
ng g component football-camp-subscribe --module app
```
