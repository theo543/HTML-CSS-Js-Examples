sass src/style.scss src/style.css
postcss .\src\style.css -o .\src\style.css --use "autoprefixer" "cssnano" --no-map
node pug-build.js
Copy-Item -Path src -Destination docs -Recurse -Force
$files = Get-ChildItem docs -Recurse -File
$files = $files -match "\.(scss|pug|map)$"
$files | ForEach-Object {Remove-Item $_.FullName}
