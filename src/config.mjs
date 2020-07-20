// @flow

let cssRootFolder: string = '/public/styles/'

export default class Config {
  static get cssRootFolder() {
    return cssRootFolder
  }

  static set cssRootFolder(dir: string) {
    cssRootFolder = dir
  }
}