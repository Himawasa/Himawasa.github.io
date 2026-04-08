/**
 * HiMaWaSa Sync
 * ソフトウェアで仕事と生活をつなぐ
 * Google Apps Script Webアプリ版
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('HiMaWaSa Sync | ソフトウェアで仕事と生活をつなぐ')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
