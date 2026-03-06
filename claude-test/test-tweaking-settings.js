const { chromium } = require('playwright');

const TW_URL = 'http://127.0.0.1:8099/';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(TW_URL);
  await page.waitForSelector('.tc-site-title', { timeout: 15000 });

  // 1. Check initial state
  const title = await page.textContent('.tc-site-title');
  const subtitle = await page.textContent('.tc-site-subtitle');
  console.log('=== INITIAL STATE ===');
  console.log('Site title:', JSON.stringify(title.trim()));
  console.log('Site subtitle:', JSON.stringify(subtitle.trim()));

  const openTiddlers = await page.$$eval('.tc-tiddler-frame',
    els => els.map(e => e.getAttribute('data-tiddler-title'))
  );
  console.log('Open tiddlers:', openTiddlers);

  // The book says: "you should be looking at a GettingStarted tiddler"
  const hasGettingStarted = openTiddlers.includes('GettingStarted');
  console.log('GettingStarted tiddler is open:', hasGettingStarted);

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/01-initial.png', fullPage: true });

  // 2. Set title and subtitle in GettingStarted
  // The book says: "Start by setting the title and subtitle to something interesting in the GettingStarted tiddler"
  // Look for input fields in the GettingStarted tiddler
  console.log('\n=== SETTING TITLE AND SUBTITLE ===');

  // Find inputs in the GettingStarted tiddler
  const gettingStartedFrame = page.locator('.tc-tiddler-frame[data-tiddler-title="GettingStarted"]');
  const inputs = gettingStartedFrame.locator('input[type="text"]');
  const inputCount = await inputs.count();
  console.log('Number of text inputs in GettingStarted:', inputCount);

  for (let i = 0; i < inputCount; i++) {
    const placeholder = await inputs.nth(i).getAttribute('placeholder');
    const value = await inputs.nth(i).inputValue();
    console.log(`  Input ${i}: placeholder=${JSON.stringify(placeholder)}, value=${JSON.stringify(value)}`);
  }

  // Set title
  if (inputCount >= 1) {
    await inputs.nth(0).fill('Claude Test Wiki');
    console.log('Set title to "Claude Test Wiki"');
  }
  if (inputCount >= 2) {
    await inputs.nth(1).fill('Testing Grok TiddlyWiki exercises');
    console.log('Set subtitle to "Testing Grok TiddlyWiki exercises"');
  }

  // Verify the sidebar updated
  await page.waitForTimeout(500);
  const newTitle = await page.textContent('.tc-site-title');
  const newSubtitle = await page.textContent('.tc-site-subtitle');
  console.log('Sidebar title now:', JSON.stringify(newTitle.trim()));
  console.log('Sidebar subtitle now:', JSON.stringify(newSubtitle.trim()));

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/02-title-set.png', fullPage: true });

  // 3. "retain story ordering" button
  console.log('\n=== RETAIN STORY ORDERING ===');
  // Look for this button in GettingStarted
  const retainButton = gettingStartedFrame.locator('text=retain story ordering');
  const retainExists = await retainButton.count();
  console.log('Retain story ordering button found:', retainExists > 0);
  if (retainExists > 0) {
    // Check if it's a checkbox or button
    const tagName = await retainButton.first().evaluate(el => el.tagName);
    console.log('Element type:', tagName);
    await retainButton.first().click();
    console.log('Clicked retain story ordering');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/03-retain-story.png', fullPage: true });

  // 4. Close GettingStarted and open Control Panel
  console.log('\n=== OPENING CONTROL PANEL ===');
  // The book says: "Close out of GettingStarted and click the gear icon"

  // Close GettingStarted - find close/cancel button
  const closeBtn = gettingStartedFrame.locator('button[aria-label="close"]');
  const closeBtnCount = await closeBtn.count();
  console.log('Close button found:', closeBtnCount > 0);

  // Actually, for GettingStarted, it may not have a standard close. Let's look for the cancel button
  const cancelBtn = gettingStartedFrame.locator('button').filter({ hasText: /cancel|close|delete/i });
  const cancelCount = await cancelBtn.count();
  console.log('Cancel/close buttons:', cancelCount);

  // List all buttons in the tiddler frame
  const allButtons = await gettingStartedFrame.locator('button').all();
  console.log('All buttons in GettingStarted:');
  for (const btn of allButtons) {
    const ariaLabel = await btn.getAttribute('aria-label');
    const text = await btn.textContent();
    console.log(`  aria-label=${JSON.stringify(ariaLabel)}, text=${JSON.stringify(text.trim().substring(0, 50))}`);
  }

  // Try closing via the close button in the toolbar
  const closeButton = gettingStartedFrame.locator('button[aria-label="close"]');
  if (await closeButton.count() > 0) {
    await closeButton.click();
    console.log('Closed GettingStarted via close button');
  } else {
    // Navigate away - just open control panel
    console.log('No close button found, proceeding to open control panel');
  }

  await page.waitForTimeout(500);

  // Click the gear icon to open control panel
  // The gear icon is in the sidebar/page toolbar
  const gearButton = page.locator('button[aria-label="control panel"]');
  const gearCount = await gearButton.count();
  console.log('Gear/control panel button found:', gearCount > 0);

  if (gearCount === 0) {
    // Try other selectors
    const sidebarButtons = await page.locator('.tc-sidebar-header button, .tc-page-controls button').all();
    console.log('Sidebar/page toolbar buttons:');
    for (const btn of sidebarButtons) {
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      console.log(`  aria-label=${JSON.stringify(ariaLabel)}, title=${JSON.stringify(title)}`);
    }
  }

  // Open control panel
  const cpButton = page.locator('.tc-page-controls button').filter({ has: page.locator('.tc-image-options-button') });
  if (await cpButton.count() > 0) {
    await cpButton.click();
    console.log('Clicked control panel button');
  } else {
    // Try by navigating directly
    await page.goto(TW_URL + '#%24%3A%2FControlPanel');
    console.log('Navigated to ControlPanel directly');
  }

  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/04-control-panel.png', fullPage: true });

  // 5. Info tab - Animation duration
  console.log('\n=== INFO TAB - ANIMATION DURATION ===');

  // Check what tabs exist in control panel
  const cpFrame = page.locator('.tc-tiddler-frame[data-tiddler-title="$:/ControlPanel"]');
  const tabs = await cpFrame.locator('.tc-tab-buttons button').all();
  console.log('Control panel tabs:');
  for (const tab of tabs) {
    const text = await tab.textContent();
    const selected = await tab.getAttribute('aria-selected');
    console.log(`  ${text.trim()} (selected: ${selected})`);
  }

  // Click Info tab
  const infoTab = cpFrame.locator('.tc-tab-buttons button').filter({ hasText: 'Info' });
  if (await infoTab.count() > 0) {
    await infoTab.click();
    console.log('Clicked Info tab');
    await page.waitForTimeout(500);
  }

  // Find animation duration input
  const animInput = cpFrame.locator('input').filter({ has: page.locator('..') });
  // Let's search for animation-related text
  const animSection = cpFrame.locator('text=Animation duration');
  const animExists = await animSection.count();
  console.log('Animation duration text found:', animExists > 0);

  // Find the input near "Animation duration"
  // Look for input fields in the info tab content
  const allCpInputs = await cpFrame.locator('input').all();
  console.log('All inputs in control panel:');
  for (const input of allCpInputs) {
    const type = await input.getAttribute('type');
    const value = await input.inputValue().catch(() => 'N/A');
    const placeholder = await input.getAttribute('placeholder');
    console.log(`  type=${type}, value=${JSON.stringify(value)}, placeholder=${JSON.stringify(placeholder)}`);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/05-info-tab.png', fullPage: true });

  // Set animation duration to 200
  // The animation duration field stores value in $:/config/AnimationDuration
  // Let's try setting it via the UI
  const animDurationInput = cpFrame.locator('input[type="text"]').first();
  // Actually, let's be more precise - search by nearby label
  const animLabel = cpFrame.locator(':has-text("Animation duration")');
  console.log('Animation duration label elements:', await animLabel.count());

  // Try setting via TiddlyWiki API
  await page.evaluate(() => {
    // Set animation duration
    $tw.wiki.setText('$:/config/AnimationDuration', 'text', undefined, '200');
  });
  console.log('Set animation duration to 200 via API');

  // 6. Appearance tab
  console.log('\n=== APPEARANCE TAB ===');
  const appearanceTab = cpFrame.locator('.tc-tab-buttons button').filter({ hasText: 'Appearance' });
  if (await appearanceTab.count() > 0) {
    await appearanceTab.click();
    console.log('Clicked Appearance tab');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/06-appearance-tab.png', fullPage: true });

  // Check subtabs
  const subTabs = await cpFrame.locator('.tc-tab-content .tc-tab-buttons button').all();
  console.log('Appearance subtabs:');
  for (const tab of subTabs) {
    const text = await tab.textContent();
    console.log(`  ${text.trim()}`);
  }

  // 6a. Palette - pick a color scheme
  const paletteTab = cpFrame.locator('.tc-tab-content .tc-tab-buttons button').filter({ hasText: 'Palette' });
  if (await paletteTab.count() > 0) {
    await paletteTab.click();
    console.log('Clicked Palette subtab');
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/07-palette.png', fullPage: true });

  // 6b. Toolbars - enable info button on View Toolbar
  console.log('\n=== TOOLBARS - ENABLE INFO BUTTON ===');
  const toolbarsTab = cpFrame.locator('.tc-tab-content .tc-tab-buttons button').filter({ hasText: 'Toolbars' });
  if (await toolbarsTab.count() > 0) {
    await toolbarsTab.click();
    console.log('Clicked Toolbars subtab');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/08-toolbars.png', fullPage: true });

  // Find "View Toolbar" sub-subtab
  const viewToolbarTab = cpFrame.locator('button').filter({ hasText: 'View Toolbar' });
  if (await viewToolbarTab.count() > 0) {
    await viewToolbarTab.click();
    console.log('Clicked View Toolbar');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/09-view-toolbar.png', fullPage: true });

  // Find the info checkbox and enable it
  // The info button tiddler is $:/core/ui/Buttons/info
  const infoCheckbox = cpFrame.locator('input[type="checkbox"]').filter({ has: page.locator('..', { hasText: 'info' }) });
  console.log('Info checkbox candidates:', await infoCheckbox.count());

  // Let's enable it via the API
  await page.evaluate(() => {
    // Enable the info button in view toolbar
    $tw.wiki.setText('$:/config/ViewToolbarButtons/Visibility/$:/core/ui/Buttons/info', 'text', undefined, 'show');
  });
  console.log('Enabled info button via API');

  // 6c. Theme Tweaks
  console.log('\n=== THEME TWEAKS ===');
  const themeTweaksTab = cpFrame.locator('.tc-tab-content .tc-tab-buttons button').filter({ hasText: 'Theme Tweaks' });
  if (await themeTweaksTab.count() > 0) {
    await themeTweaksTab.click();
    console.log('Clicked Theme Tweaks subtab');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/10-theme-tweaks.png', fullPage: true });

  // The book mentions:
  // - Change "Sidebar layout" to "Fluid story, fixed sidebar"
  // - Increase "Sidebar width"
  // Check what options exist
  const themeTweaksContent = await cpFrame.locator('.tc-tab-content').last().textContent();
  console.log('Theme Tweaks content preview:', themeTweaksContent.substring(0, 500));

  // Set sidebar layout via API
  await page.evaluate(() => {
    $tw.wiki.setText('$:/themes/tiddlywiki/vanilla/options/sidebarlayout', 'text', undefined, 'fluid-fixed');
  });
  console.log('Set sidebar layout to fluid-fixed');

  // 7. Settings tab - CamelCase
  console.log('\n=== SETTINGS TAB - CAMELCASE ===');
  const settingsTab = cpFrame.locator('.tc-tab-buttons').first().locator('button').filter({ hasText: 'Settings' });
  if (await settingsTab.count() > 0) {
    await settingsTab.click();
    console.log('Clicked Settings tab');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/11-settings-tab.png', fullPage: true });

  // Find CamelCase option
  const camelCaseText = cpFrame.locator(':has-text("Camel Case")');
  console.log('CamelCase text elements:', await camelCaseText.count());

  // Enable CamelCase via API
  await page.evaluate(() => {
    $tw.wiki.setText('$:/config/WikiParserRules/Inline/wikilink', 'text', undefined, 'enable');
  });
  console.log('Enabled CamelCase wiki links via API');

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/12-camelcase-enabled.png', fullPage: true });

  // 8. Save the wiki
  console.log('\n=== SAVING ===');
  // For Node.js TiddlyWiki, changes auto-save to the tiddlers directory
  // But let's verify by checking the tiddler files
  await page.waitForTimeout(1000);

  // Final verification - reload and check settings persisted
  await page.reload();
  await page.waitForSelector('.tc-site-title', { timeout: 15000 });

  const finalTitle = await page.textContent('.tc-site-title');
  const finalSubtitle = await page.textContent('.tc-site-subtitle');
  console.log('\n=== FINAL VERIFICATION (after reload) ===');
  console.log('Title:', JSON.stringify(finalTitle.trim()));
  console.log('Subtitle:', JSON.stringify(finalSubtitle.trim()));

  // Check animation duration
  const animDuration = await page.evaluate(() => {
    return $tw.wiki.getTiddlerText('$:/config/AnimationDuration');
  });
  console.log('Animation duration:', animDuration);

  // Check CamelCase setting
  const camelCase = await page.evaluate(() => {
    return $tw.wiki.getTiddlerText('$:/config/WikiParserRules/Inline/wikilink');
  });
  console.log('CamelCase setting:', camelCase);

  // Check info button visibility
  const infoVis = await page.evaluate(() => {
    return $tw.wiki.getTiddlerText('$:/config/ViewToolbarButtons/Visibility/$:/core/ui/Buttons/info');
  });
  console.log('Info button visibility:', infoVis);

  // Check sidebar layout
  const sidebarLayout = await page.evaluate(() => {
    return $tw.wiki.getTiddlerText('$:/themes/tiddlywiki/vanilla/options/sidebarlayout');
  });
  console.log('Sidebar layout:', sidebarLayout);

  await page.screenshot({ path: '/home/user/grok-tiddlywiki/claude-test/screenshots/13-final.png', fullPage: true });

  console.log('\n=== DONE ===');
  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
