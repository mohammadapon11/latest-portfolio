#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Performance budget thresholds
const PERFORMANCE_BUDGET = {
  fcp: 1800,    // First Contentful Paint: 1.8s
  lcp: 2500,    // Largest Contentful Paint: 2.5s
  fid: 100,     // First Input Delay: 100ms
  cls: 0.1,     // Cumulative Layout Shift: 0.1
  ttfb: 800,    // Time to First Byte: 800ms
  tti: 3800,    // Time to Interactive: 3.8s
  tbt: 300,     // Total Blocking Time: 300ms
  si: 3400      // Speed Index: 3.4s
};

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPerformanceBudget() {
  try {
    // Read Lighthouse report
    const reportPath = path.join(process.cwd(), 'lighthouse-report.json');
    
    if (!fs.existsSync(reportPath)) {
      log('❌ Lighthouse report not found. Run "npm run performance" first.', 'red');
      process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    if (!report.audits) {
      log('❌ Invalid Lighthouse report format.', 'red');
      process.exit(1);
    }

    log('\n🚀 Performance Budget Check Results', 'bright');
    log('=====================================\n', 'cyan');

    let allPassed = true;
    const results = {};

    // Check Core Web Vitals
    const coreWebVitals = [
      { key: 'first-contentful-paint', name: 'FCP', budget: PERFORMANCE_BUDGET.fcp, unit: 'ms' },
      { key: 'largest-contentful-paint', name: 'LCP', budget: PERFORMANCE_BUDGET.lcp, unit: 'ms' },
      { key: 'first-input-delay', name: 'FID', budget: PERFORMANCE_BUDGET.fid, unit: 'ms' },
      { key: 'cumulative-layout-shift', name: 'CLS', budget: PERFORMANCE_BUDGET.cls, unit: '' },
      { key: 'server-response-time', name: 'TTFB', budget: PERFORMANCE_BUDGET.ttfb, unit: 'ms' },
      { key: 'interactive', name: 'TTI', budget: PERFORMANCE_BUDGET.tti, unit: 'ms' },
      { key: 'total-blocking-time', name: 'TBT', budget: PERFORMANCE_BUDGET.tbt, unit: 'ms' },
      { key: 'speed-index', name: 'Speed Index', budget: PERFORMANCE_BUDGET.si, unit: 'ms' }
    ];

    coreWebVitals.forEach(metric => {
      const audit = report.audits[metric.key];
      if (!audit) return;

      let value = audit.numericValue;
      let displayValue = audit.displayValue;
      
      // Handle special cases
      if (metric.key === 'cumulative-layout-shift') {
        value = audit.numericValue * 1000; // Convert to milliseconds for comparison
        displayValue = audit.numericValue.toFixed(3);
      }

      if (value === undefined || value === null) return;

      const passed = value <= metric.budget;
      const percentage = Math.round((value / metric.budget) * 100);
      
      if (!passed) allPassed = false;

      results[metric.name] = {
        value,
        budget: metric.budget,
        passed,
        percentage,
        unit: metric.unit
      };

      const status = passed ? '✅' : '❌';
      const color = passed ? 'green' : 'red';
      const budgetText = `${metric.budget}${metric.unit}`;
      
      log(`${status} ${metric.name}: ${displayValue}${metric.unit} (Budget: ${budgetText}, ${percentage}%)`, color);
    });

    // Check performance score
    const performanceScore = report.categories?.performance?.score;
    if (performanceScore !== undefined) {
      const scorePercentage = Math.round(performanceScore * 100);
      const scorePassed = scorePercentage >= 90;
      const scoreColor = scorePassed ? 'green' : 'yellow';
      
      log(`\n📊 Performance Score: ${scorePercentage}% (Target: ≥90%)`, scoreColor);
      
      if (!scorePassed) allPassed = false;
    }

    // Summary
    log('\n📋 Summary', 'bright');
    log('==========', 'cyan');
    
    const passedCount = Object.values(results).filter(r => r.passed).length;
    const totalCount = Object.keys(results).length;
    
    log(`Metrics Passed: ${passedCount}/${totalCount}`, passedCount === totalCount ? 'green' : 'yellow');
    
    if (allPassed) {
      log('\n🎉 All performance targets met! Your portfolio is optimized.', 'green');
    } else {
      log('\n⚠️  Some performance targets not met. Consider further optimization.', 'yellow');
      
      // Show failed metrics
      const failedMetrics = Object.entries(results)
        .filter(([_, result]) => !result.passed)
        .map(([name, result]) => `${name}: ${result.value}${result.unit} (${result.percentage}% of budget)`);
      
      if (failedMetrics.length > 0) {
        log('\nFailed Metrics:', 'red');
        failedMetrics.forEach(metric => log(`  • ${metric}`, 'red'));
      }
    }

    // Recommendations
    log('\n💡 Recommendations', 'bright');
    log('==================', 'cyan');
    
    if (!allPassed) {
      log('• Optimize images and use WebP/AVIF formats', 'blue');
      log('• Implement lazy loading for non-critical resources', 'blue');
      log('• Minimize JavaScript bundle size', 'blue');
      log('• Use CDN for static assets', 'blue');
      log('• Implement service worker for caching', 'blue');
      log('• Optimize 3D rendering performance', 'blue');
    } else {
      log('• Monitor performance regularly', 'green');
      log('• Set up performance monitoring in production', 'green');
      log('• Continue optimizing based on user feedback', 'green');
    }

    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);

  } catch (error) {
    log(`❌ Error checking performance budget: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the check
checkPerformanceBudget();
