/**
 * Daily Hummingbird: publish approved collaborator profiles from the private
 * Contributors sheet to the public GitHub Pages repository.
 *
 * ONE-TIME SETUP
 * 1. Paste this into the Google Apps Script project for the editorial sheet.
 * 2. In Project Settings > Script properties, set GITHUB_TOKEN to a fine-grained
 *    GitHub personal access token with Contents: read/write for
 *    lizmstephens/inspiration ONLY. Do not place the token in a spreadsheet.
 * 3. Run syncApprovedCollaborators manually once and authorise it.
 * 4. Call syncApprovedCollaborators() from the existing daily publishing job,
 *    OR run installCollaboratorDailyTrigger() once (around 09:00 UK).
 *
 * No emails, Active/Welcome state or editorial workflow fields are published.
 * Only rows explicitly marked Card Approved = Yes are exported.
 */
const COLLAB_SYNC_SHEET_ID = '15ti5QEJhIUWpAQJusc5p8dRDhhEZcAqvAul6fz3W8G4';
const COLLAB_SYNC_REPO = 'lizmstephens/inspiration';
const COLLAB_SYNC_PATH = 'collaborators.json';

function syncApprovedCollaborators() {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('Set the GITHUB_TOKEN script property first.');

  const sheet = SpreadsheetApp.openById(COLLAB_SYNC_SHEET_ID).getSheetByName('Contributors');
  if (!sheet) throw new Error('Contributors tab was not found.');
  const rows = sheet.getDataRange().getDisplayValues();
  if (!rows.length) throw new Error('Contributors sheet has no header row.');

  const header = rows.shift().map(s => String(s).trim().toLowerCase());
  const column = (name) => {
    const i = header.indexOf(name.toLowerCase());
    if (i < 0) throw new Error('Missing Contributors column: ' + name);
    return i;
  };
  const iName = column('Name');
  const iBackground = column('Background');
  const iCountry = column('Nationality');
  const iLinkedIn = column('LinkedIn');
  const iApproved = column('Card Approved');
  const iImage = column('Image Link');

  const permittedUrl = (value) => /^https:\/\//i.test(String(value).trim())
    ? String(value).trim() : '';

  const collaborators = rows
    .filter(r => String(r[iApproved]).trim().toLowerCase() === 'yes'
      && String(r[iName]).trim())
    .map(r => ({
      name: String(r[iName]).trim(),
      country: String(r[iCountry]).trim(),
      background: String(r[iBackground]).trim(),
      linkedin: permittedUrl(r[iLinkedIn]),
      image: permittedUrl(r[iImage]),
      curator: String(r[iName]).trim().toLowerCase() === 'liz stephens'
    }));

  const contents = JSON.stringify(collaborators, null, 2) + '\n';
  const api = 'https://api.github.com/repos/' + COLLAB_SYNC_REPO
    + '/contents/' + COLLAB_SYNC_PATH;
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  const before = UrlFetchApp.fetch(api, {
    method: 'get', headers: headers, muteHttpExceptions: true
  });
  if (before.getResponseCode() !== 200) {
    throw new Error('GitHub read failed (' + before.getResponseCode()
      + '): ' + before.getContentText().slice(0, 300));
  }
  const oldFile = JSON.parse(before.getContentText());
  const current = Utilities.newBlob(
    Utilities.base64Decode(oldFile.content.replace(/\s/g, ''))
  ).getDataAsString('UTF-8');
  if (current === contents) {
    console.log('Collaborators are already up to date (' + collaborators.length + ').');
    return;
  }

  const blob = Utilities.newBlob(contents, 'application/json');
  const payload = {
    message: 'Sync approved collaborators from editorial spreadsheet',
    sha: oldFile.sha,
    content: Utilities.base64Encode(blob.getBytes()),
    branch: 'main'
  };
  const response = UrlFetchApp.fetch(api, {
    method: 'put',
    headers: headers,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) {
    throw new Error('GitHub update failed (' + response.getResponseCode()
      + '): ' + response.getContentText().slice(0, 300));
  }
  console.log('Published ' + collaborators.length + ' approved collaborators.');
}

function installCollaboratorDailyTrigger() {
  const functionName = 'syncApprovedCollaborators';
  const existing = ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === functionName);
  if (existing.length) return;
  ScriptApp.newTrigger(functionName)
    .timeBased()
    .atHour(9)
    .everyDays(1)
    .inTimezone('Europe/London')
    .create();
}
