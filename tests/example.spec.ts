import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import {configDotenv} from "dotenv"

configDotenv()

test.beforeEach(async ({ page }) => {
  const appUrl = process.env.APP_URL
  if (!appUrl) {
    throw new Error('APP_URL is not defined in environment variables')
  }
  await page.goto(appUrl)
})

test('Check submit enabled', async ({ page }) => {
  const submitButton = page.getByTestId('signIn-button')
  await expect(submitButton).toBeEnabled()
})

test('Check PopUp visible', async ({ page }) => {
  const fakeUsername = faker.internet.username()
  const fakePassword = faker.internet.password()
  const userNameField = page.getByTestId('username-input')
  const userEmailField = page.getByTestId('password-input')


  await userNameField.fill(fakeUsername)
  await userEmailField.fill(fakePassword)
  const submitButton = page.getByTestId('signIn-button')
  await submitButton.click({ force: true })
  const authPopUp = page.getByTestId('authorizationError-popup')
  await expect(authPopUp).toBeVisible()
  console.log(`Generated Username: ${fakeUsername}, Password: ${fakePassword}`)
})
