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
  await page.goto(`${UI_URL}add-book`);
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
})