/**   UPDATED 1/1/19 18:37
      UNIVERSAL
    
    hhMenu()
        

*/

function hhMenu(){
// Add a custom menu to the active spreadsheet, including a separator and a sub-menu.
  SpreadsheetApp.getUi()
      .createMenu('H&H')
      .addItem('Cleanup', 'cleanup')
      .addItem('Send to Office',    'sendToOffice')
      .addItem('Send to Client',     'sendToClient')
      .addSeparator()
//      .addItem('TEST',     'popUp')
      .addItem('Create Invoice from Estimate', 'createInvoice')
      // .addSubMenu(SpreadsheetApp.getUi().createMenu('My Submenu')
      //     .addItem('One Submenu Item', 'mySecondFunction')
      //     .addItem('Another Submenu Item', 'myThirdFunction'))
      .addToUi();
}