import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 콘솔 메시지 캡처
  let consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({ level: msg.type(), text: msg.text() });
  });

  // 페이지 로드
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });

  // 1초 대기 (React 렌더링 대기)
  await page.waitForTimeout(1000);

  // 페이지 제목 확인
  const title = await page.title();
  console.log('✅ Page title:', title);

  // 에러 메시지 확인
  const errors = consoleMessages.filter(m => m.level === 'error');
  if (errors.length > 0) {
    console.log('❌ Console errors found:');
    errors.forEach(e => console.log('  -', e.text));
  } else {
    console.log('✅ No console errors');
  }

  // VISA_GUIDE_DATA 객체 확인
  const visaDataExists = await page.evaluate(() => {
    return typeof VISA_GUIDE_DATA !== 'undefined' && 
           typeof VISA_GUIDE_DATA.e9 !== 'undefined';
  });

  if (visaDataExists) {
    console.log('✅ VISA_GUIDE_DATA loaded correctly');
  } else {
    console.log('❌ VISA_GUIDE_DATA not found');
  }

  // 다른 상수들 확인
  const constantsCheck = await page.evaluate(() => {
    const constants = [
      'VISA_GUIDE_DATA',
      'VISA_ROUTES',
      'TARGET_VISA_OPTIONS',
      'DOCS',
      'REQUIRED_DOCS_BY_VISA',
      'ADDITIONAL_DOCS_BY_VISA'
    ];
    const result = {};
    constants.forEach(c => {
      result[c] = typeof window[c] !== 'undefined';
    });
    return result;
  });

  console.log('\n📋 Constants check:');
  Object.entries(constantsCheck).forEach(([name, exists]) => {
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${name}`);
  });

  await browser.close();
})().catch(console.error);
