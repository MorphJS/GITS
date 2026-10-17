import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const URL = process.env.URL || 'http://localhost:4173/'
const VIEWPORTS = [
  ['1440x900', 1440, 900],
  ['1920x1080', 1920, 1080],
  ['1024x768', 1024, 768],
  ['390x844', 390, 844],
]
const SECTIONS = ['#top', '#historia', '#arte', '#fondos', '#concept', '#boxset']
await mkdir('shots', { recursive: true })
const browser = await chromium.launch()
let problems = 0

for (const [name, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: width < 600 })
  const page = await ctx.newPage()
  const issues = []
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) issues.push(`console.${m.type()}: ${m.text()}`) })
  page.on('pageerror', (e) => issues.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => issues.push(`requestfailed: ${r.url()}`))
  page.on('response', (r) => { if (r.status() >= 400) issues.push(`http ${r.status()}: ${r.url()}`) })

  await page.goto(URL, { waitUntil: 'load' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `shots/${name}-00-preloader.png` })
  await page.waitForTimeout(3600)
  for (const [i, sel] of SECTIONS.entries()) {
    await page.evaluate((s) => {
      const el = document.querySelector(s)
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY)
    }, sel)
    await page.waitForTimeout(1400)
    await page.screenshot({ path: `shots/${name}-${String(i + 1).padStart(2, '0')}-${sel.slice(1)}.png` })
    if (sel === '#historia') {
      for (const f of [0.35, 0.65, 0.95]) {
        await page.evaluate((f) => {
          const t = document.querySelector('.story__track')
          window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY + (t.offsetHeight - innerHeight) * f)
        }, f)
        await page.waitForTimeout(1800)
        await page.screenshot({ path: `shots/${name}-02-historia-${f}.png` })
      }
    }
    if (sel === '#arte') {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2))
      await page.waitForTimeout(1400)
      await page.screenshot({ path: `shots/${name}-03-arte-b.png` })
    }
    if (sel === '#concept') {
      const v = await page.locator('.dossier__view').boundingBox()
      if (v && width >= 900) {
        await page.mouse.move(v.x + v.width * 0.5, v.y + v.height * 0.4, { steps: 8 })
        await page.waitForTimeout(1200)
        await page.screenshot({ path: `shots/${name}-05-concept-zoom.png` })
        await page.mouse.move(5, 5)
      }
      await page.locator('.dossier__index button').nth(3).click()
      await page.waitForTimeout(1200)
      await page.screenshot({ path: `shots/${name}-05-concept-b.png` })
    }
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `shots/${name}-99-footer.png` })

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (overflow > 0) issues.push(`desborde horizontal: ${overflow}px`)
  console.log(`\n== ${name}: ${issues.length ? issues.length + ' problema(s)' : 'sin problemas'}`)
  issues.forEach((i) => console.log('  -', i))
  problems += issues.length
  await ctx.close()
}
await browser.close()
process.exit(problems ? 1 : 0)
