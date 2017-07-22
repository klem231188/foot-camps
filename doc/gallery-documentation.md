# Command to rename all files in a directory 1.jpg, 2.jpg, ..., n.jpg
```bash
ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done
```

# Command to launch in order to create a gallery from a directory containing the images
```bash
cd ~/workspace/foot-camps/
node node_modules/angular2-image-gallery/convert.js src/assets/img/**club**/gallery --outputDir=src/assets/img/**club**/gallery --remoteBaseUrl=assets/img/**club**/gallery
# Ex : node node_modules/angular2-image-gallery/convert.js src/assets/img/lorient/gallery --outputDir=src/assets/img/lorient/gallery --remoteBaseUrl=assets/img/lorient/gallery
```



node node_modules/angular2-image-gallery/convert.js src/assets/img/plabennec/gallery --outputDir=src/assets/img/plabennec/gallery --remoteBaseUrl=assets/img/plabennec/gallery
