const ss_url = 'https://docs.google.com/spreadsheets/d/1L63VeejbxCk8BGwx9BX5D_4EfRLwKUmlKLD9jhzJvOI/edit#gid=0';
let sc_url = '';

function doGet(e) {
  let page = e.parameter.page;
  if (!page) {
    page = 'index';
  }
  return HtmlService.createTemplateFromFile(page).evaluate(); 
}

// ログイン
function login(value, value2) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  const lr = sh.getLastRow();

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
        sh.getRange(i, 4).setValue(1);
        return getScriptUrl();
      }
    } 
  }
  throw new Error(); 
}

// URLの取得
function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}

// タスクリスト取得
function getTaskList(){
  return SpreadsheetApp.getActive().getSheetByName('タスク').getDataRange().getDisplayValues();
}

// タスクリスト編集
function taskListEdit(num){
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[1];
  const lr = sh.getLastRow();

  let arr = [];
  for (let i = 2; i < lr; i++){
    arr.push([0]);
  }
  sh.getRange(2, 5, arr.length, arr[0].length).setValues(arr);



  for(let i = 1 ; i <= lr ; i++){
    let value = sh.getRange(i, 1).getValue();
    if(num === value){
      sh.getRange(i, 5).setValue(1);
    } 
  }
  return getScriptUrl();
}

// タスクリスト完了
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

// タスクリスト追加
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

// タスクリスト保存
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

// 名前取得
function getName() {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  const lr = sh.getLastRow();
  for(let i=2 ; i <= lr ; i++){
    let login = sh.getRange(i, 4).getValue();
    if(Number(login) === 1){
      let name = sh.getRange(i, 3).getValue();
      return name;  
    } 
  } 
}

// 新規登録
function register(id, pw, name) {
  const ss = SpreadsheetApp.openByUrl(ss_url);
  const sh = ss.getSheets()[0];
  let lr = sh.getLastRow();

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