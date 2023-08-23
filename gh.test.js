let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {                          
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 10000);
});

describe("Titles other pages", () => {
  
  test("Find the title on /features/packages", async () => {
    await page.goto("https://github.com/features/packages");
    const title = "div.logged-out.env-production.page-responsive div.application-main div.position-relative.width-full div:nth-child(2) h4";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("GitHub Packages");
  }, 10000);

  test("Find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div.position-relative.z-1.container-xl.mx-auto.px-3.pt-6.py-md-12.height-full.d-flex.flex-column.flex-justify-center";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 10000);

  test("Find the title on /enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = " div.col-9-max.position-relative.z-2.ml-lg-4.ml-xl-0 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("Build like the best");
  }, 10000);
});