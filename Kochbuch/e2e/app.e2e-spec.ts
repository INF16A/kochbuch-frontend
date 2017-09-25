import { KochbuchPage } from './app.po';

describe('kochbuch App', () => {
  let page: KochbuchPage;

  beforeEach(() => {
    page = new KochbuchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
