import { AloginFormPage } from './app.po';

describe('alogin-form App', function() {
  let page: AloginFormPage;

  beforeEach(() => {
    page = new AloginFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
