import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL)
})

test('Check submit enabled',async ({ page }) => {
  const submitButton = (page.getByTestId('signIn-button'))
  await expect(submitButton).toBeEnabled()
})

test('check PopUp visible', async ({ page }) => {
  const userNameField =  page.getByTestId('username-input')
  const userEmailField = page.getByTestId('password-input')
  await userNameField.fill('test')
  await userEmailField.fill('test@test.com')
  const submitButton = page.getByTestId('signIn-button')
  await submitButton.click({ force: true })
  const authPopUp = page.getByTestId('authorizationError-popup')
  await expect(authPopUp).toBeVisible()
});
