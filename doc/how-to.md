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
node ~/.nvm/versions/node/v12.22.7/lib/node_modules/angular2-image-gallery/angular2-image-gallery/convert.js src/assets/img/plouguerneau/gallery --outputDir=src/assets/img/plouguerneau/gallery --remoteBaseUrl=assets/img/plouguerneau/gallery

# Now, remove all the generated folders preview_*/ and raw/
# Rename in data.json. See 2022-07-aber-foot as an example
```

## Create a new component
```
cd ~/workspace-github/foot-camps/src/app/components
ng g component football-camp-subscribe --module app
```


## Set CORS for storage
#### Development  
```
[
  {
    "origin": ["http://localhost", "https://footcamps-development.firebaseapp.com"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

```
gsutil cors set cors.json gs://footcamps-development.appspot.com
```

#### Production  
```
[
  {
    "origin": ["https://www.footcamps.fr"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

```
gsutil cors set cors.json gs://footcamps-production.appspot.com
```

### Backup firestore
```
firebase login
gcloud auth login

firebase projects:list
firebase use footcamps-development

gcloud projects list
gcloud config set project footcamps-development

gcloud firestore export gs://footcamps-development.appspot.com/your-choosen-folder-name

cd functions
gsutil -m cp -r gs://footcamps-development.appspot.com/your-choosen-folder-name .

firebase emulators:start --import ./your-choosen-folder-name
```

### Run emulator
```
firebase emulators:start --import ./2021-02-01
```
