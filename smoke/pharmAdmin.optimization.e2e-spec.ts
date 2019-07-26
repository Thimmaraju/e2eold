import { UtilityPage } from '../utility.po';
import { NavPage } from '../common-page-objects/nav.po';
import { LoginPage } from '../common-page-objects/login.po';
import { browser, element, by, ExpectedConditions } from 'protractor';
import { OptimizationPage } from '../common-page-objects/optimization.po';

describe('When a Pharm Admin is on the optimizations page and there are opportunities', () => {
  let page: OptimizationPage;
  let util: UtilityPage;
  let nav: NavPage;
  let login: LoginPage;

  beforeEach(() => {
    page = new OptimizationPage();
    util = new UtilityPage();
    nav = new NavPage();
    login = new LoginPage();
    util.navigateTo('auth/login');
    browser.waitForAngularEnabled(false);
    login.loginWithCredential(util.getPharmAdminLogin());
    util.sleep(5000);
  });

  afterEach(() => {
    nav.logout();
  });

  it('Should be able to get useful information on an IR opportunity', async () => {
    const opp = page.getFirstIR();
    opp.expand();
    expect(opp.baseElem.$('div').isDisplayed()).toBe(true, 'Opportunity did not expand');
    opp.getNote().then(function(note) {
      expect(note.length).not.toEqual(0, 'Note is empty or missing.');
    });
  });
  it('Should be able to add a note to an opportunity', async () => {
    const opp = page.getFirstIR();
    opp.expand();
    expect(opp.addNoteButton().isDisplayed()).toBe(true, 'Expected Add Note Button Not Visible');
    opp.clickAddNoteButton();
    expect(page.addNoteForm().isDisplayed()).toBe(true, 'Add note form did not pop up');
    expect(page.addNoteCancelButton().isDisplayed()).toBe(true, 'Add note cancel button missing');
    expect(page.addNoteConfirmButtom().isDisplayed()).toBe(true, 'Add note confirm button missing');
    expect(page.addNoteConfirmButtom().isEnabled()).toBe(false, 'Add note confirm button should be disabled');
    page.closeAddNote();
    expect(page.addNoteForm().isPresent()).toBe(false, 'Add note form did not pop up');
  });
  it('Should be able to view more details of an opportunity', async () => {
    const opp = page.getFirstIR();
    opp.expand();
    expect(opp.viewButton().isDisplayed()).toBe(true, 'Expected Add Note Button Not Visible');
    opp.clickViewButton();
    expect(browser.getCurrentUrl()).toContain('inventory-iq');
  });
});
