import { AngularRemindersPage } from './app.po';

describe('angular-reminders App', () => {
  let page: AngularRemindersPage;

  beforeEach(() => {
    page = new AngularRemindersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
