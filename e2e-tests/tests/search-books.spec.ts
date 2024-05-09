import {test, expect} from "@playwright/test";


const UI_URL = "http://localhost:5173/";

test.beforeEach(async({page}) =>{
  await page.goto(UI_URL);
  //GET THE SIGNIN BUTTON
  await page.getByRole("link",{name: "Sign In"}).click();
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  await page.locator("[name=email]").fill("maimai@gmail.com");
  await page.locator("[name=password]").fill("qazxsw");
  await page.getByRole("button",{name: "Login"}).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});


test("Should show book search results", async({page}) =>{
  await page.goto(UI_URL);

  await page.getByPlaceholder("type a city to search").fill("Laval");
  await page.getByRole("button", {name: "Search"}).click();

  await expect(page.getByText("Books found in Laval")).toBeVisible();
  await expect(page.getByText("Pragmatic Programmer, The: Your journey to mastery, 20th Anniversary Edition")).toBeVisible();
});

test("Should show hotel detail", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("type a city to search").fill("Laval");
  await page.getByRole("button", {name: "Search"}).click();

  await page.getByText("Pragmatic Programmer, The: Your journey to mastery, 20th Anniversary Edition").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", {name: "Book now"})).toBeVisible();
})