var G_id;
var ss_url = "https://docs.google.com/spreadsheets/d/1L63VeejbxCk8BGwx9BX5D_4EfRLwKUmlKLD9jhzJvOI/edit#gid=0";
var sc_url = "";

function doGet(e) {
  let page = e.parameter.page;
  if (!page) {
    page = 'index';
  }
  return HtmlService.createTemplateFromFile(page).evaluate(); 
}

// ログイン
function login(value, value2) {
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[0];
  var lr = sh.getLastRow();
  
  for(var i = 2 ; i <= lr ; i++){
    sh.getRange(i, 4).setValue(0);
  } 

  for(var i = 2 ; i <= lr ; i++){
    var id = sh.getRange(i, 1).getValue();
    if(id == value){
      var pw = sh.getRange(i, 2).getValue();
      if(pw == value2){
        sh.getRange(i, 4).setValue(1);
        return;
      }
    } 
  }
  throw new Error('IDまたはPASSが異なります。'); 
}

// URLの取得
function getScriptUrl() {
  if(sc_url === ''){
    sc_url = ScriptApp.getService().getUrl();
  }
  return sc_url;
}

// タスクリスト取得
function getTaskList(){
  return SpreadsheetApp.getActive().getSheetByName('タスク').getDataRange().getDisplayValues();
}

// タスクリスト編集
function taskListEdit(num){
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[1];
  var lr = sh.getLastRow();

  for(var i = 2 ; i <= lr ; i++){
    sh.getRange(i, 5).setValue(0);
  }

  for(var i = 1 ; i <= lr ; i++){
    var value = sh.getRange(i, 1).getValue();
    if(num === value){
      sh.getRange(i, 5).setValue(1);
    } 
  }
}

// タスクリスト完了
function taskListCompletion(num){
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[1];
  var lr = sh.getLastRow();

  for(var i = 1 ; i <= lr ; i++){
    var value = sh.getRange(i, 1).getValue();
    if(num === value){
      sh.getRange(i, 4).setValue(1);
    } 
  }
}

// タスクリスト追加
function taskListAdd(content, date) {
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[1];
  var lr = sh.getLastRow();
  var addLr = lr + 1;
    
  sh.getRange(addLr, 1).setValue(addLr);
  sh.getRange(addLr, 2).setValue(content);
  sh.getRange(addLr, 3).setValue(date);
  sh.getRange(addLr, 4).setValue(0);
  sh.getRange(addLr, 5).setValue(0); 
}

// タスクリスト保存
function taskListSave(content, date) {
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[1];
  var lr = sh.getLastRow();

  for(var i = 1 ; i <= lr ; i++){
    var value = sh.getRange(i, 5).getValue();
    if(value === 1){
      sh.getRange(i, 2).setValue(content);
      sh.getRange(i, 3).setValue(date);
    } 
  }
  for(var i = 2 ; i <= lr ; i++){
    sh.getRange(i, 5).setValue(0);
  }
}

// 名前取得
function getName() {
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[0];
  var lr = sh.getLastRow();
  for(var i=2 ; i <= lr ; i++){
    var login = sh.getRange(i, 4).getValue();
    if(Number(login) === 1){
      var name = sh.getRange(i, 3).getValue();
      return name;  
    } 
  } 
}

// 新規登録
function register(id, pw, name) {6
  var ss = SpreadsheetApp.openByUrl(ss_url);
  var sh = ss.getSheets()[0];
  var lr = sh.getLastRow();

  for(var i = 2 ; i <= lr ; i++){
    sh.getRange(i, 4).setValue(0);
  }  

  lr = lr + 1;
  
  sh.getRange(lr, 1).setValue(id);
  sh.getRange(lr, 2).setValue(pw);
  sh.getRange(lr, 3).setValue(name);
  sh.getRange(lr, 4).setValue(1);
}










