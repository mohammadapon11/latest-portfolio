#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio 3D - Performance Testing Script\n');

// Check if Next.js is running
function checkNextJsRunning() {
  try {
    execSync('lsof -ti:3000', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Run Lighthouse performance test
function runLighthouse() {
  console.log('📊 Running Lighthouse performance test...');
  try {
    execSync('npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --only-categories=performance', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Lighthouse test completed! Check lighthouse-report.html');
  } catch (error) {
    console.log('❌ Lighthouse test failed:', error.message);
  }
}

// Analyze bundle size
function analyzeBundle() {
  console.log('📦 Analyzing bundle size...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ Build completed!');
    
    // Check bundle sizes
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      const staticDir = path.join(nextDir, 'static');
      if (fs.existsSync(staticDir)) {
        const jsDir = path.join(staticDir, 'chunks');
        if (fs.existsSync(jsDir)) {
          const files = fs.readdirSync(jsDir);
          let totalSize = 0;
          
          files.forEach(file => {
            if (file.endsWith('.js')) {
              const filePath = path.join(jsDir, file);
              const stats = fs.statSync(filePath);
              const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
              totalSize += stats.size;
              console.log(`📄 ${file}: ${sizeInMB} MB`);
            }
          });
          
          const totalSizeInMB = (totalSize / 1024 / 1024).toFixed(2);
          console.log(`\n📊 Total JS bundle size: ${totalSizeInMB} MB`);
          
          if (totalSizeInMB < 2) {
            console.log('✅ Bundle size is optimized!');
          } else {
            console.log('⚠️  Bundle size could be optimized further');
          }
        }
      }
    }
  } catch (error) {
    console.log('❌ Bundle analysis failed:', error.message);
  }
}

// Check file sizes
function checkFileSizes() {
  console.log('\n📁 Checking file sizes...');
  
  const filesToCheck = [
    'src/components/Hero.tsx',
    'src/components/ThreeScene.tsx',
    'src/app/page.tsx',
    'next.config.ts'
  ];
  
  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      const sizeInKB = (stats.size / 1024).toFixed(2);
      console.log(`📄 ${file}: ${sizeInKB} KB`);
    }
  });
}

// Main execution
async function main() {
  console.log('🔍 Starting performance analysis...\n');
  
  // Check if Next.js is running
  if (!checkNextJsRunning()) {
    console.log('❌ Next.js is not running on port 3000');
    console.log('💡 Please start the development server with: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Next.js is running on port 3000\n');
  
  // Run tests
  await runLighthouse();
  console.log('');
  
  await analyzeBundle();
  console.log('');
  
  checkFileSizes();
  
  console.log('\n🎉 Performance testing completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Review lighthouse-report.html for detailed metrics');
  console.log('2. Check bundle sizes in .next/static/chunks/');
  console.log('3. Use PerformanceMonitor component in development');
  console.log('4. Run npm run optimize for full optimization');
}

// Run the script
main().catch(console.error);
