import {test, expect} from "@playwright/test";
import path from "path";

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

test("should allow user to add a book", async ({page}) =>{
  await page.goto(`${UI_URL}addbook`);
  await page.locator(`[name="name"]`).fill("Test Add Book"); 
  await page.locator(`[name="city"]`).fill("Test City"); 
  await page.locator(`[name="community"]`).fill("Test Community"); 
  await page.locator(`[name="description"]`).fill("Test description for add book!"); 
  await page.locator(`[name="pricePerWeek"]`).fill("20"); 
  await page.selectOption(`select[name="starRating"]`,"5"); 
  await page.getByText("Art").click(); 
  await page.getByLabel("16-17 years").check(); 
  await page.getByLabel("6-7 years").check(); 

  await page.setInputFiles(`[name="imageFiles"]`,[
    path.join(__dirname, "files","testImage1.jpg"),
    path.join(__dirname, "files", "testImage2.jpg")
  ]);

  await page.getByRole('button', {name:"Save"}).click();
  await expect(page.getByText("Book Saved!")).toBeVisible();
});

test("should display books", async({page}) =>{
  await page.goto(`${UI_URL}mybooks`);
  await expect(page.getByText("Designing Data-Intensive Applications")).toBeVisible();
  await expect(page.getByText("Data is at the center of many challenges in system design today.")).toBeVisible();
  await expect(page.getByText("Montréal,NDG")).toBeVisible();
  await expect(page.getByText("Reference")).toBeVisible();
  await expect(page.getByText("CAD2 per week")).toBeVisible();
  await expect(page.getByText("16-17 years18 years and up")).toBeVisible();
  await expect(page.getByText("4 star rating")).toBeVisible();

  await expect(page.getByRole("link", {name: "View Details"}).first()).toBeVisible();
  await expect(page.getByRole("link", {name: "Add Book"})).toBeVisible();

});


test("should edit book", async({page}) =>{
  await page.goto(`${UI_URL}mybooks`);

  await page.getByRole("link", {name: "View Details"}).first().click();
  await page.waitForSelector('[name="name"]', {state: "attached"});

  await expect(page.locator('[name="name"]')).toHaveValue('Test Add Book');
  await page.locator('[name="name"]').fill("Test Add Book UPDATED")
  await page.getByRole("button", {name: "Save"}).click();

  await expect(page.getByText("Book Saved!")).toBeVisible();

  //check if name still remains updated after page reload.
  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue("Test Add Book UPDATED");
  await page.locator('[name="name"]').fill('Test Add Book');
})