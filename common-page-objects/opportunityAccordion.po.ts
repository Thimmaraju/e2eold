import { ElementFinder, browser, by } from 'protractor';

export class OpportunityAccordionComponent {
         baseElem: ElementFinder;

         constructor(elem: ElementFinder) {
           this.baseElem = elem;
         }
         expand = () => {
           this.baseElem.click();
           browser.sleep(3000);
         }
         viewButton = () => this.baseElem.element(by.css('#ViewButtonC001-I68462029201C001-F01-S11'));
  addNoteButton = () => this.baseElem.element(by.css('#AddNoteButtonC001-I68462029201C001-F01-S11'));
         clickAddNoteButton = () => {
           this.addNoteButton().click();
           browser.sleep(2000);
         }
         clickViewButton = () => this.viewButton().click();

         getNote = () =>
           this.baseElem
             .element(by.css('mat-expansion-panel > div > div > mat-card > mat-card-content > div > p'))
             .getText()
       }
