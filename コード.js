const ss_url = 'https://docs.google.com/spreadsheets/d/1L63VeejbxCk8BGwx9BX5D_4EfRLwKUmlKLD9jhzJvOI/edit#gid=0';
let sc_url = '';

/**
 * 初期表示の関数です
 */
function doGet(e) {
  let page = e.parameter.page;
  if (!page) {
    page = 'index';
  }
  return HtmlService.createTemplateFromFile(page).evaluate(); 
}

/**
 * ログイン処理の関数です
 * @param  {String} ログインID
 * @param  {String} ログインパスワード
 * @return {String} URL
 */
function login(value, value2) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  const lr = sh.getLastRow();
  // ログインフラグを0にする
  let arr = [];
  for (let i = 2; i < lr; i++){
    arr.push([0]);
  }
  sh.getRange(2, 4, arr.length, arr[0].length).setValues(arr);

  for(let i = 2 ; i <= lr ; i++){
    let id = sh.getRange(i, 1).getValue();
    if(id === value){
      let pw = sh.getRange(i, 2).getValue();
      if(pw === value2){
        // IDとPWが一致したらログインフラグを１にする
        sh.getRange(i, 4).setValue(1);
        return getScriptUrl();
      }
    } 
  }
  // IDとPWが一致するものがなけれなエラーとする
  throw new Error(); 
}

/**
 * URLの取得の関数です
 * @return {String} URL
 */
function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}

/**
 * タスクリスト取得の関数です
 * @return {String} タスクリスト
 */
function getTaskList(){
  return SpreadsheetApp.getActive().getSheetByName('タスク').getDataRange().getDisplayValues();
}

/**
 * タスクリスト編集処理の関数です
 * @param  {Number} タスクリストのID
 * @return {String} URL
 */
function taskListEdit(num){
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[1];
  const lr = sh.getLastRow();
  // 編集フラグを0にする
  let arr = [];
  for (let i = 2; i < lr; i++){
    arr.push([0]);
  }
  sh.getRange(2, 5, arr.length, arr[0].length).setValues(arr);

  for(let i = 1 ; i <= lr ; i++){
    let value = sh.getRange(i, 1).getValue();
    if(num === value){
      // タスクIdが一致したら編集フラグを1にする
      sh.getRange(i, 5).setValue(1);
    } 
  }
  return getScriptUrl();
}

/**
 * タスクリスト完了処理の関数です
 * @param  {Number} タスクリストID
 * @return {String} URL
 */
function taskListCompletion(num){
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[1];
  const lr = sh.getLastRow();

  for(let i = 1 ; i <= lr ; i++){
    let value = sh.getRange(i, 1).getValue();
    if(num === value){
      sh.getRange(i, 4).setValue(1);
    } 
  }
  return getScriptUrl();
}

/**
 * タスクリスト追加処理の関数です
 * @param  {String} タスクリストの内容
 * @param  {String} タスクリストの日付
 * @return {String} URL
 */
function taskListAdd(content, date) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[1];
  const lr = sh.getLastRow();
  const addLr = lr + 1;
    
  sh.getRange(addLr, 1).setValue(addLr);
  sh.getRange(addLr, 2).setValue(content);
  sh.getRange(addLr, 3).setValue(date);
  sh.getRange(addLr, 4).setValue(0);
  sh.getRange(addLr, 5).setValue(0);
  return getScriptUrl();
}

/**
 * タスクリスト保存処理の関数です
 * @param  {String} タスクリストの内容
 * @param  {String} タスクリストの日付
 * @return {String} URL
 */
function taskListSave(content, date) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[1];
  const lr = sh.getLastRow();

  for(let i = 1 ; i <= lr ; i++){
    let value = sh.getRange(i, 5).getValue();
    if(value === 1){
      sh.getRange(i, 2).setValue(content);
      sh.getRange(i, 3).setValue(date);
    } 
  }
  return getScriptUrl();
}

/**
 * ログイン者の名前を取得する関数です
 * @return {String} ログイン者名
 */
function getName() {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  const lr = sh.getLastRow();
  for(let i=2 ; i <= lr ; i++){
    let login = sh.getRange(i, 4).getValue();
    // ログインフラグが１のものを取得
    if(Number(login) === 1){
      let name = sh.getRange(i, 3).getValue();
      return name;  
    } 
  } 
}

/**
 * 新規登録処理の関数です
 * @param  {String} ログインID
 * @param  {String} ログインパスワード
 * @param  {String} 名前
 * @return {String} URL
 */
function register(id, pw, name) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  let lr = sh.getLastRow();
  // ログインフラグを0にする
  for(let i = 2 ; i <= lr ; i++){
    sh.getRange(i, 4).setValue(0);
  }  

  lr = lr + 1;
  
  sh.getRange(lr, 1).setValue(id);
  sh.getRange(lr, 2).setValue(pw);
  sh.getRange(lr, 3).setValue(name);
  sh.getRange(lr, 4).setValue(1);
  return getScriptUrl();
}