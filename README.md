# Extension Disabler

### Installation

1) Clone zip to disk. (using green button to the top-right on this page)
2) Extract contents of zip.
3) Open Extensions page in Chrome, and enable developer mode checkbox.
4) Drag the "extension-disabler" folder (_inside_ the extracted folder) onto the extensions page.

### Packing (optional)

In order to pack the extension, follow these steps:
1) When your app is ready, go to Tools > Extensions in Chrome and click Pack extension...
2) Select the folder on your desktop that contains the manifest.json file. Entering a private key is optional.
3) Click Pack Extension. You will receive a confirmation window, telling you to keep the .pem (the private key) file safe
4) Put the .crx file that's saved on your desktop in the same folder where you have the manifest.json file. (crx is a .zip file)
5) Uninstall the unpacked version of the Chrome app so it won't conflict with the packed app.
6) Drag and drop the new .crx file into Chrome browser to install the packed app.
