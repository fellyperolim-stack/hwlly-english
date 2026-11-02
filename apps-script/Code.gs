// HWLLY | ENGLISH: sincronização do progresso via Google Sheets + Apps Script.
// Cada progresso fica numa linha da planilha, identificado por um hash do código pessoal
// escolhido no site. O código em si nunca é salvo.

const SHEET_NAME = "Progresso";
const MAX_CELL = 45000; // limite de caracteres por célula no Google Sheets é 50.000

function doGet() {
  return json_({ ok: true, msg: "HWLLY sync ativo" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const req = JSON.parse(e.postData.contents);
    if (!req.key || !/^[0-9a-f]{64}$/.test(req.key)) return json_({ ok: false, error: "chave inválida" });
    const sh = getSheet_();
    const row = findRow_(sh, req.key);

    if (req.op === "get") {
      if (!row) return json_({ ok: true, exists: false });
      const raw = sh.getRange(row, 3).getValue();
      return json_({ ok: true, exists: true, data: JSON.parse(raw || "{}") });
    }

    if (req.op === "set") {
      const payload = JSON.stringify(req.data || {});
      if (payload.length > MAX_CELL) return json_({ ok: false, error: "progresso grande demais" });
      const r = row || sh.getLastRow() + 1;
      sh.getRange(r, 1, 1, 3).setValues([[req.key, new Date(), payload]]);
      return json_({ ok: true });
    }

    return json_({ ok: false, error: "operação desconhecida" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(["chave", "atualizado_em", "dados"]);
  return sh;
}

// Retorna o número da linha (1-based) ou null.
function findRow_(sh, key) {
  const last = sh.getLastRow();
  if (last < 2) return null;
  const keys = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < keys.length; i++) {
    if (keys[i][0] === key) return i + 2;
  }
  return null;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
